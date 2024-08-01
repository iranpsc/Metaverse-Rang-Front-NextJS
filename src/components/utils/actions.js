'use server'
import home from '@/public/menuImages/home.png'
import participation from '@/public/menuImages/participation.png'
import reporter from '@/public/menuImages/reporter.png'
import citizen from '@/public/menuImages/citizen-baguette.png'
import developer from '@/public/menuImages/developer-baguette.png'
import inspector from '@/public/menuImages/citizen-baguette.png'
import bussiness from '@/public/menuImages/businessman-baguette.png'
import lawyer from '@/public/menuImages/lawyer-baguette.png'
import cityCouncil from '@/public/menuImages/city-council-baguette.png'
import mayor from '@/public/menuImages/the-mayor-baguette.png'
import governer from '@/public/menuImages/governor-baguette.png'
import miniester from '@/public/menuImages/minister-baguette.png'
import judge from '@/public/menuImages/judge-baguette.png'
import legister from '@/public/menuImages/legislator-baguette.png'

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
   
    return  [
      {
          faTitle: 'صفحه نخست',
          route:'/',
          img: home,
          id:0
      },
      {
          faTitle: 'شهروند',
          route:'citizen',
          img: citizen,
          id:1
      },
      {
          faTitle: 'خبرنگار',
          img: reporter,
          route:'reporter',
          id:2
      },
      {
          faTitle:'مشارکت کننده',
          img:participation,
          route:'participation',
          id:3
      },
      {
          faTitle:'توسعه دهنده',
          img:developer,
          route:'developer',
          id:4
      }
      ,
      {
          faTitle:'بازرس',
          img:inspector,
          route:'inspector',
          id:5
      },
  
      {
          faTitle:'تاجر',
          img:bussiness,
          route:'bussiness',
          id:6
      },
  
  
      {
          faTitle:'وکیل',
          img:lawyer,
          route:'lawyer',
          id:7
      },
  
      {
          faTitle:'شورای شهر',
          img:cityCouncil,
          route:'citycouncil',
          id:8
      },
  
      {
          faTitle:'شهردار',
          img:mayor,
          route:'mayor',
          id:9
      },
  
  
      {
          faTitle:'استاندار',
          img:governer,
          route:'governer',
          id:10
      },
  
      {
          faTitle:'وزیر',
          img:miniester,
          route:'miniester',
          id:11
      },
  
      {
          faTitle:'قاضی',
          img:judge,
          route:'judge',
          id:12
      },
  
      {
          faTitle:'وزیر',
          img:legister,
          route:'legister',
          id:13
      },
  
  ]
  }