'use server'

//return selected language object
  export async function getTranslation(lang) {
    
    try{
      const res = await fetch("https://admin.rgb.irpsc.com/api/translations", {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600", 
        },
      });
      const data = await res.json();
      let temp = await data.data.find((item) => item.code == lang)


      return temp;
    }catch(err){
      console.error("Error fetching main file: Amir", err);
      // Optionally, return a default response instead of breaking the app
      // return {
      //   success: false,
      //   message: err.message || "An unknown error occurred",
      // };
    }
  }
  

  //return whole language array
  export async function getLangArray() {
    const res = await fetch("https://admin.rgb.irpsc.com/api/translations", {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },
    });
    const data = await res.json();
    return data.data
  }


  export async function getMainFile(langData) {
    try {
      const res = await fetch(langData.file_url, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      });
      
  
      // Parse JSON response
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching mainData file:", error);
  
      // Optionally, return a default response instead of breaking the app
      // return {
      //   success: false,
      //   message: error.message || "An unknown error occurred",
      // };
    }
  }
  // return our main file(.json) according to selected lang
  // export async function getMainFile(langData) {
  //   const res = await fetch(langData.file_url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Cache-Control": "public, max-age=3600", 
  //     },
  //   });
  //   let temp = await res.json()
    
  //   return temp;
  // }
  // return selected modal according to _selectedName from _mainData(.json)
  export async function findByModalName(_mainData, _selectedName){
    const temp = _mainData.modals.find(
        (modal) => modal.name === `${_selectedName}`
      ).tabs;

    return temp
  }
// return selected tab according to _tabs from answer of findByModalName func
  export async function findByTabName(_tabs, _selectedTab){
    const temp = _tabs.find(
      (tab) => tab.name === `${_selectedTab}`
    ).fields;
    return temp
  }

  export async function getAllCitizen(_page){
    
    const res = await fetch(`https://api.rgb.irpsc.com/api/users?page=${_page}`,{
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60", 
      },}
    )
    let temp = await res.json()

  
    return temp
  }
  export async function getFooterData(params) {
    try {
      const langObj =await getTranslation(params.lang)
      const res = await fetch(langObj.file_url);
      const resJson = await res.json();
      const footerData = resJson.modals.find(
        (modal) => modal.name === "footer-menu"
      ).tabs;

      const footerTabs = footerData.find(
        (item) => item.name === "our-systems"
      ).fields;

      return footerTabs;
    } catch (error) {}
  }
  export async function getAllLevels() {
    const res = await fetch("https://api.rgb.irpsc.com/api/levels", {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },
    });
    const temp = await res.json();
    
    return temp.data
  }
export async function getLevelTabs(params, levelId) {
  const res = await fetch(`https://api.rgb.irpsc.com/api/levels/${levelId}/${params.tabs}`, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });

  if (!res.ok) {
    // هندل کردن ارور 404 یا سایر خطاها
    if (res.status === 404) {
      // مثلا یک مقدار خالی یا ارور دلخواه
      return null; 
      // یا
      // throw new Error("Level not found (404)");
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  }

  const temp = await res.json();
  return temp;
}


  // export async function getAllVersions(){
  //   const res = await fetch(`https://api.rgb.irpsc.com/api/calendar?type=version`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Cache-Control": "public, max-age=3600", 
  //     },
  //   });
    
  //   let temp = await res.json()
  //   return temp.data;
  // }

export async function getAllVersions() {
  try {
    const res = await fetch(`https://api.rgb.irpsc.com/api/calendar?type=version`, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    });

    if (!res.ok) {
      console.error("Error fetching versions:", res.statusText);
      return []; // داده‌ای برگشت داده نشد
    }

    const temp = await res.json();
    return temp.data || []; // اگر data خالی یا undefined بود، آرایه خالی برگردان
  } catch (error) {
    console.error("Error fetching versions:", error);
    return []; // در صورت خطا، آرایه خالی برگردان
  }
}

export async function getSingleLevel(levelId) {
  const res = await fetch(`https://api.rgb.irpsc.com/api/levels/${levelId}`, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300", 
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      // مثلا مقدار null برگردون یا خطا پرتاب کن
      return null;
      // یا: throw new Error("Level not found (404)");
    }
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
}


  // export async function getUserData(_userId) {
  //   let id = _userId.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]).toLowerCase()
  //   try {
  //     const res = await fetch(
  //       `https://api.rgb.irpsc.com/api/citizen/${id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Cache-Control": "public, max-age=3600", 
  //         },
  //       }
  //     );
  //     const temp = await res.json();

  //     return temp;
  //   } catch (err) {
  //     // در صورت وجود خطا
  //     return { props: { error: "خطا در دریافت داده‌ها" } };
  //   }
  // }
  
export async function getUserData(_userId) {
  // استانداردسازی ID: تبدیل به lowercase برای یکنواختی
  let id = _userId.toLowerCase(); // استفاده از lowercase
  try {
    const res = await fetch(
      `https://api.rgb.irpsc.com/api/citizen/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
           cache: "no-store", 
        },
      }
    );
    const temp = await res.json();

    return temp;
  } catch (err) {
    // در صورت وجود خطا
    return { props: { error: "خطا در دریافت داده‌ها" } };
  }
}


  export async function getAllReferral(_userId, _searchParam = ""){
    const res = await fetch(`https://api.rgb.irpsc.com/api/citizen/${_userId}/referrals?search=${_searchParam}`,{
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=0", 
      },}
    )
    let temp = await res.json()
    return temp
  }

  export async function getChartReferral(_userId, _searchParam = ""){
    const res = await fetch(`https://api.rgb.irpsc.com/api/citizen/${_userId}/referrals/chart?range=${_searchParam}`,{
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=0", 
      },}
    )
    let temp = await res.json()
    return temp.data
  }

export async function getAllCategories() {
  const res = await fetch(`https://api.rgb.irpsc.com/api/tutorials/categories`, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=0",
    },
  });
  let temp = await res.json();

  return temp.data;
}


  export async function getAllCategoryVideos(_page){
    try{
      const res = await fetch(`https://api.rgb.irpsc.com/api/tutorials?page=${_page}`,{
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=0", 
        },}
      )
      let temp = await res.json()
  
      return temp.data
    }catch(err){
      console.error('error while getting single video data', err)
    }
    
  }

export async function getEducationSingleCategory(_category) {
  const res = await fetch(`https://api.rgb.irpsc.com/api/tutorials/categories/${_category}`, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=0",
    },
  });

  if (res.status === 404) {
    // در صورت 404، مقدار null برگردون
    return null;
  }

  if (!res.ok) {
    // در سایر خطاها ارور پرتاب کن
    throw new Error(`${res.status} - ${res.statusText}`);
  }

  const temp = await res.json();
  return temp.data;
}



  export async function getSubcategoryData(_category,_subcategory){
    const res = await fetch(`https://api.rgb.irpsc.com/api/tutorials/categories/${_category}/${_subcategory}`,{
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=0", 
      },}
    )
    let temp = await res.json()

    return temp.data
  }
  export async function getSingleVideoData(_videoSlug){
    try{
      const safeVideoSlug = sanitizePathSegment(_videoSlug);
      if (!safeVideoSlug) {
        throw new Error('Invalid video slug');
      }
      const res = await fetch(`https://api.rgb.irpsc.com/api/tutorials/${encodeURIComponent(safeVideoSlug)}`,{
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=0", 
        },}
      )
      let temp = await res.json()
  
      return temp.data
    }catch(err){
      console.error('error while getting single video data', err)
    }

  }

  function sanitizePathSegment(segment) {
    if (typeof segment !== 'string') {
      return '';
    }
    // Allow only URL-safe slug characters; strip everything else.
    const cleaned = segment.trim().replace(/[^a-zA-Z0-9-_]/g, '');
    return cleaned;
  }

  export async function getVideoComments(_videoId){
    try{
      const safeVideoId = sanitizePathSegment(_videoId);
      if (!safeVideoId) {
        throw new Error('Invalid video id');
      }
      const res = await fetch(`https://api.rgb.irpsc.com/api/tutorials/${encodeURIComponent(safeVideoId)}/comments?page=1`,{
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json",
          // "Cache-Control": "public, max-age=3600", 
        },}
      )
      let temp = await res.json()
  
      return temp
    }catch(err){
      console.error('error while getting single video data', err)
    }

  }
  


