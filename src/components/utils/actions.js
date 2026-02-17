'use server'

// Utility: sanitize a single URL path segment to prevent traversal and malformed values
function sanitizePathSegment(segment) {
  if (typeof segment !== 'string') {
    return null;
  }
  const trimmed = segment.trim();
  // Allow only alphanumerics, underscore, dash and dot; adjust if needed
  const isValid = /^[A-Za-z0-9._-]+$/.test(trimmed);
  if (!isValid || trimmed.length === 0) {
    return null;
  }
  return trimmed;
}

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
  if (!levelId || !params?.tabs) {
    return null;
  }

  const safeLevelId = encodeURIComponent(String(levelId).trim());
  const safeTabs = encodeURIComponent(String(params.tabs).trim());

  const res = await fetch(
    `https://api.rgb.irpsc.com/api/levels/${safeLevelId}/${safeTabs}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
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
  if (!levelId) return null;

  const safeLevelId = encodeURIComponent(String(levelId).trim());

  const res = await fetch(
    `https://api.rgb.irpsc.com/api/levels/${safeLevelId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

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
  // استانداردسازی ID: ابتدا پاک‌سازی، سپس تبدیل به lowercase برای یکنواختی
  const sanitizedId = sanitizePathSegment(_userId);
  if (!sanitizedId) {
    return { props: { error: "خطا در دریافت داده‌ها" } };
  }
  const id = sanitizedId.toLowerCase();
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
    const safeUserId = sanitizePathSegment(_userId);
    if (!safeUserId) {
      return { props: { error: "خطا در دریافت داده‌ها" } };
    }
    const safeSearch = encodeURIComponent(_searchParam ?? "");
    const res = await fetch(`https://api.rgb.irpsc.com/api/citizen/${safeUserId}/referrals?search=${safeSearch}`,{
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=0", 
      },}
    )
    let temp = await res.json()
    return temp
  }

  export async function getChartReferral(_userId, _searchParam = ""){
    const safeUserId = sanitizePathSegment(_userId);
    if (!safeUserId) {
      return { props: { error: "خطا در دریافت داده‌ها" } };
    }
    const safeRange = encodeURIComponent(_searchParam ?? "");
    const res = await fetch(`https://api.rgb.irpsc.com/api/citizen/${safeUserId}/referrals/chart?range=${safeRange}`,{
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
  const sanitizedCategory = sanitizePathSegment(_category);
  if (!sanitizedCategory) {
    // Invalid category input; treat as not found
    return null;
  }

  const res = await fetch(`https://api.rgb.irpsc.com/api/tutorials/categories/${sanitizedCategory}`, {
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
    const safeCategory = sanitizePathSegment(_category);
    const safeSubcategory = sanitizePathSegment(_subcategory);

    if (!safeCategory || !safeSubcategory) {
      throw new Error('Invalid category or subcategory');
    }

    const res = await fetch(
      `https://api.rgb.irpsc.com/api/tutorials/categories/${encodeURIComponent(safeCategory)}/${encodeURIComponent(safeSubcategory)}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=0",
        },
      }
    );
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

  // function sanitizePathSegment(segment) {
  //   if (typeof segment !== 'string') {
  //     return '';
  //   }
  //   // Allow only URL-safe slug characters; strip everything else.
  //   const cleaned = segment.trim().replace(/[^a-zA-Z0-9-_]/g, '');
  //   return cleaned;
  // }

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
  


