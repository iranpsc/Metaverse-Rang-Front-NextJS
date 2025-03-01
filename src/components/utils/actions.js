'use server'

//return selected language object
  export async function getTranslation(lang) {
    const res = await fetch("https://admin.rgb.irpsc.com/api/translations", {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },
    });
    const data = await res.json();
    let temp = await data.data.find((item) => item.code === lang)

    return temp;
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

  // return our main file(.json) according to selected lang
  export async function getMainFile(langData) {
    const res = await fetch(langData.file_url, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },
    });
    let temp = await res.json()
    
    return temp;
  }
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
        "Cache-Control": "public, max-age=3600", 
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
  export async function getLevelTabs(params,levelId) {

    const res = await fetch(`https://api.rgb.irpsc.com/api/levels/${levelId}/${params.tabs}`, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },
    });
    let temp = await res.json()
    
    return temp;

  }

  export async function getAllVersions(){
    const res = await fetch(`https://api.rgb.irpsc.com/api/calendar?type=version`, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },
    });
    console.log('versionRESSS', res);
    
    let temp = await res.json()
    return temp.data;
  }

  export async function getSingleLevel(levelId) {
    const res = await fetch(`https://api.rgb.irpsc.com/api/levels/${levelId}`, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },
    });
    return await res.json();
  }

  export async function getUserData(_userId) {
    let id = _userId.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]).toLowerCase()
    try {
      const res = await fetch(
        `https://api.rgb.irpsc.com/api/citizen/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600", 
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
        "Cache-Control": "public, max-age=3600", 
      },}
    )
    let temp = await res.json()
    return temp
  }

  export async function getChartReferral(_userId, _searchParam = ""){
    const res = await fetch(`https://api.rgb.irpsc.com/api/citizen/${_userId}/referrals/chart?range=${_searchParam}`,{
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },}
    )
    let temp = await res.json()
    return temp.data
  }

  export async function getAllCategories(){
    
    const res = await fetch(`https://api.rgb.irpsc.com/api/tutorials/categories?count=9`,{
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },}
    )
    let temp = await res.json()

    return temp.data
  }

  export async function getAllCategoryVideos(_page){
    
    const res = await fetch(`https://api.rgb.irpsc.com/api/tutorials?page=${_page}`,{
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },}
    )
    let temp = await res.json()
    

    return temp.data
  }

  export async function getEducationSingleCategory(_category){
    
    
    const res = await fetch(`https://api.rgb.irpsc.com/api/tutorials/categories/${_category}`,{
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },}
    )
    let temp = await res.json()

    return temp.data
  }

  export async function getSubcategoryData(_category,_subcategory){
    const res = await fetch(`https://api.rgb.irpsc.com/api/tutorials/categories/${_category}/${_subcategory}`,{
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", 
      },}
    )
    let temp = await res.json()

    return temp.data
  }