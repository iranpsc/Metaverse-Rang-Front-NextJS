
import Profile from "@/components/templates/Profile";
import ProfileAbout from "@/components/module/profile/ProfileAbout";
import ProfileDetails from "@/components/module/profile/ProfileDatails";
import { getTranslation, getMainFile, findByModalName, findByTabName, getLangArray, getUserData } from "@/components/utils/actions";
import SideBar from "@/components/module/sidebar/SideBar";
import { getStaticMenu } from "@/components/utils/constants";


export default async function citizenSinglePage({
  params,
}) {
  const [profileData, langData] = await Promise.all([
    getUserData(params.id),
    getTranslation(params.lang)
  ])
  
  // const profileData = await getUserData();
  // const langData = await getTranslation(params.lang);

  const [mainData, langArray] = await Promise.all([
    getMainFile(langData),
    getLangArray()
  ])

  const modalsProfile = mainData.modals.find(
    (modal) => modal.name === "Citizenship-profile"
  ).tabs;

  const userProperty = modalsProfile.find(
    (tabs) => tabs.name === "home"
  ).fields;


  let titleData = "";
  let nameUser = "";
  let nameSite = "";
  let localSite = "fa_IR";

  if (params.lang === "fa") {
    nameSite = "متاورس رنگ";
    localSite = "fa_IR";
    if (profileData.data?.kyc?.fname) {
      nameUser = `${profileData.data.kyc.fname} ${profileData.data.kyc.lname}`;
      titleData = `${profileData.data.kyc.fname} ${profileData.data.kyc.lname} | ${profileData.data.code}`;
    } else if (profileData.data.name) {
      titleData = `${profileData.data.name} | ${profileData.data.code}`;
      nameUser = `${profileData.data.name} `;
    } else {
      titleData = "متاورس رنگ";
    }
  } else if (params.lang === "en") {
    localSite = "en-US";
    nameSite = "Metaverse Rgb";
    if (profileData.data.name) {
      titleData = `${profileData.data.name} | ${profileData.data.code}`;
      nameUser = `${profileData.data.name} `;
    }else if (profileData.data?.kyc?.fname) {
      nameUser = `${profileData.data.kyc.fname} ${profileData.data.kyc.lname}`;
      titleData = `${profileData.data.kyc.fname} ${profileData.data.kyc.lname} | ${profileData.data.code}`;
    }
     else {
      titleData = "Metaverse Rgb";
    }
  }

  //to make description less than 200 character
  async function makeLessCharacter(){
    let temp;
    if(profileData.data?.customs?.about){
      temp = profileData.data.customs.about
      temp = temp.slice(0,200)
    }else(
      temp = ""
    )
    return temp
  }

  const centralPageModal = await findByModalName(
    mainData,
    "Citizenship-profile"
  );
  const tabsMenu = await findByTabName(centralPageModal, "menu");

  const staticMenuToShow = getStaticMenu(params);

  // add staticMenuToShow values to siblings tabsMenu values
  const updatedTabsMenu = tabsMenu.map((tab) => {
    let findInStatic = staticMenuToShow.find((val) => tab.unique_id === val.unique_id);
    
    if (findInStatic) {
      // Return a new tab object with updated properties
      return {
        ...tab, // Spread the original tab properties
        url: findInStatic.url,
        order: findInStatic.order,
        toShow: true,
      };
    }
  
    // If no match found, return the original tab
    return tab;
  });

  const singleCitizenSchema = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": `${profileData.data.name}`,
    "image": profileData.data?.profilePhotos?.map(item=>{
      return item.url
    }),
    "url": `http://rgb.irpsc.com/fa/citizen/${params.id}`,
    "jobTitle": `${profileData.data?.customs?.occupation}`,
    "description": `${await makeLessCharacter()}`,
    "birthDate": `${profileData.data?.kyc?.birth_date}`,
    "email": `${profileData.data?.kyc?.email}`,
    "alternateName": `${profileData.data.code}`,
  }

  return (
    <>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(singleCitizenSchema) }}
      />
      {/* schema END */}
      <main className="flex h-screen dark:bg-black" dir={langData.direction}>
        <div
          className={`relative overflow-y-scroll lg:overflow-hidden light-scrollbar dark:dark-scrollbar w-full xs:px-1 mt-[60px] lg:mt-0`}
        >
          <div className="flex h-full" dir={langData.direction}>
            <SideBar
              tabsMenu={updatedTabsMenu}
              langData={langData}
              langArray={langArray}
              params={params}
              pageSide="citizen"
            />
            <section className="relative w-full bg-[#e9eef8] dark:bg-black">
              <div
                className={`flex flex-col lg:flex-row h-fit lg:h-full gap-[6px] p-[6px]`}>
                  {/* FIRST */}
                <section
                  className="w-full h-fit lg:h-full gap-[6px] lg:w-[40%] flex flex-col no-scrollbar overflow-auto"
                >
                  <Profile
                    profileData={profileData}
                    titleData={titleData}
                    langData={langData}
                    nameUser={nameUser}
                    // userProperty={userProperty}
                    mainData={mainData}
                    params={params}
                  />
                </section>
                {/* SECOND */}
                <section
                  className="w-full h-fit lg:h-full lg:w-[30%] flex flex-col no-scrollbar overflow-auto sm:h-fit xs:h-fit md:h-fit"
                >
                  <ProfileDetails
                    profileData={profileData}
                    // userProperty={userProperty}
                    mainData={mainData}
                  />
                </section>
                {/* THIRD */}
                <section
                  className="w-full h-fit lg:h-full lg:w-[30%] flex flex-col no-scrollbar overflow-auto"
                >
                  <ProfileAbout
                    profileData={profileData}
                    // userProperty={userProperty}
                    mainData={mainData}
                    titleData={titleData}
                    params={params}
                  />
                </section>
              </div>
            </section>
          </div>
        </div>
      </main>

    </>
  );
}

// SEO**
export async function generateMetadata({ params }) {
  const profileData = await getUserData(params.id);
  
  //to make description less than 200 character
  async function makeLessCharacter(){
    let temp;
    if(profileData.data?.customs?.about){
      temp = profileData.data.customs.about
      temp = temp.slice(0,200)
    }else(
      temp = ""
    )
    return temp
  }

  return {
    title: `${profileData.data.kyc?.fname || ""} ${profileData.data.kyc?.lname || "citizen"}`,
    description: await makeLessCharacter(profileData.data.customs?.about) || "about citizen",
    openGraph: {
      // site_name:'',
      type: 'profile',
      title: `${profileData.data.name}`,
      description: `${await makeLessCharacter()}`,
      locale: params.lang == 'fa'? 'fa_IR' : 'en_US',
      url: `https://rgb.irpsc.com/${params.lang}/citizen/${params.id}`,
      profile: {
        first_name: `${profileData.data.name}`, 
      },
      images: [
        {
          url: `${profileData.data?.profilePhotos[0]?.url}`,
          width: 800,
          height: 600
        },
      ],
        // Adding the google-site-verification meta tag
    },
    other: {
      'google-site-verification': 'lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4',
    },
  };
}
