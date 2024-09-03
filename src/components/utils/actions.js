'use server'


//return selected language object
  export async function getTransletion(lang) {
    const res = await fetch("https://admin.rgb.irpsc.com/api/translations", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.data.find((item) => item.code === lang);
  }

  //return whole language array
  export async function getLangArray() {
    const res = await fetch("https://admin.rgb.irpsc.com/api/translations", {
      headers: {
        "Content-Type": "application/json",
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
      },
    });
    
    return await res.json();
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

  export async function getAllCitizen(){
    const res = await fetch("https://api.rgbdev.irpsc.com/api/users")
    let temp = await res.json()
    return temp.data
  }
  export async function getFooterData(params) {
    try {
      const langObj =await getTransletion(params.lang)
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
      },
    });
    const temp = await res.json();
    return temp.data
  }
  export async function getLevelTabs(params,levelId) {

    const res = await fetch(`https://api.rgb.irpsc.com/api/levels/${levelId}/${params.tabs}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
 
  }

  export async function getAllVersions(){
    const res = await fetch(`https://api.rgb.irpsc.com/api/calendar/versions`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let temp = await res.json()
    return temp.data;
  }

  // export async function getSingleVersion(_id){
  //   const res = await fetch(`https://api.rgb.irpsc.com/api/calendar/versions/${_id}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   let temp = await res.json()
  //   return temp.data;
  // }