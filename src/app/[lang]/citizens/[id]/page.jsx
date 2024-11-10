
import Profile from "@/components/templates/Profile";
import ProfileAbout from "@/components/module/profile/ProfileAbout";
import ProfileDetails from "@/components/module/profile/ProfileDatails";
import { getTranslation, getMainFile, findByModalName, findByTabName, getLangArray } from "@/components/utils/actions";
import SideBar from "@/components/module/sidebar/SideBar";
import useServerDarkMode from "src/hooks/use-server-dark-mode";



export default async function citizenSinglePage({
  params,
}) {
  const userId = params.id;
  const defaultTheme = useServerDarkMode();

  //FETCH::
  async function getUserData() {
    try {
      const res = await fetch(
        `https://api.rgb.irpsc.com/api/citizen/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
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

  const profileData = await getUserData();
  console.log('profileData2222',profileData);
  

  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const langArray = await getLangArray();

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
    if (profileData.data.kyc?.fname) {
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
    } else {
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

  const staticMenuToShow = [
    { name: "home", url: ``, order: "-1" },
    { name: "citizens", url: "citizens", order: "-1" },
    { name: "list of levels", url: "levels/citizen", order: "-1" },
    {
      name: "citizen information",
      url: `citizens${params.id ? "/" + params.id : ""}`,
      order: "-1",
    },
    { name: "property" },
    { name: "real estate" },
    { name: "structures" },
    { name: "belongings" },
    { name: "permissions" },
    { name: "invitations" },
    { name: "transaction" },
    { name: "reward" },
    { name: "dynasty" },
    { name: "connections" },
    { name: "crimes" },
    { name: "news" },
    { name: "articles" },
    { name: "trainings" },
    { name: "about" },
    { name: "contact" },
    { name: "version" },
    { name: "calendar" },
    { name: "overview" },
  ];

  // add staticMenuToShow values to siblings tabsMenu values
  tabsMenu.forEach((tab) => {
    let findInStatic = staticMenuToShow.find((val) => tab.name == val.name);
    if (findInStatic) {
      tab.url = findInStatic.url;
      tab.order = findInStatic.order;
      tab.toShow = true;
    }
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
      <div className="flex h-screen" dir={langData.direction}>
        <SideBar
          tabsMenu={tabsMenu}
          langData={langData}
          langArray={langArray}
          defaultTheme={defaultTheme}
          params={params}
          pageSide="citizen"
        />
        <section className="h-fit lg:h-screen relative w-full bg-[#e9eef8] mt-[60px] lg:mt-0 dark:bg-black">
          {/* <AnimatePresence>
            {showLogOut && (
            <LogoutPage showLogOut={showLogOut} setShowLogOut={setShowLogOut} />
            )}
          </AnimatePresence> */}

          {/* <AnimatePresence>
            {showSharedPage && (
            <ShredPage
                  showSharedPage={showSharedPage}
                  setShowSharedPage={setShowSharedPage}
                  profileData.data={profileData.data}
              />
            )}
          </AnimatePresence> */}

          {/* <AnimatePresence>
            {showModal && (
            <ModalCard
              showModal={showModal}
              setShowModal={setShowModal}
              dataModal={dataModal}
              titleData={titleData}
            />
            )}
          </AnimatePresence> */}

          {/* <div className=" xl:hidden lg:hidden md:visible sm:visible xs:visible w-full h-fit absolute bottom-0 z-40">
            <div className="w-full h-fit dark:bg-black bg-white absolute bottom-0 shadow-3xl">
              <StaticMobileMenu />
            </div>
          </div> */}

          {/* ${showModal || showSharedPage ? "" : ""} DOWNNN  */}
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
                userProperty={userProperty}
                params={params}
              />
            </section>
            {/* SECOND */}
            <section
              className="w-full h-fit lg:h-full lg:w-[30%] flex flex-col no-scrollbar overflow-auto sm:h-fit xs:h-fit md:h-fit"
            >
              <ProfileDetails
                profileData={profileData}
                userProperty={userProperty}
              />
            </section>
            {/* THIRD */}
            <section
              className="w-full h-fit lg:h-full lg:w-[30%] flex flex-col no-scrollbar overflow-auto"
            >
              <ProfileAbout
                profileData={profileData}
                userProperty={userProperty}
                titleData={titleData}
                params={params}
              />
            </section>
          </div>
        </section>
      </div>
    </>
  );
}

// SEO**
export async function generateMetadata({ params }) {
  // const langData = await getTranslation(params.lang);
  // const mainData = await getMainFile(langData);
  // const centralPageModal = await findByModalName(mainData, "central-page");
  // const firstPageArrayContent = await findByTabName(centralPageModal, "first-page");
  
  // ***
  // const headersList = headers();
  // const host = headersList.get('host');
  // const protocol ='https';
  
  // const fullUrl = `${protocol}://${host}/${params.lang}`;

    // to find in an array with key(_name)
    // async function localFind(_name) {
      
    //   return await firstPageArrayContent.find((item) => item.name == _name)
    //     .translation;
    // }

    async function getUserData() {
      try {
        const res = await fetch(
          `https://api.rgb.irpsc.com/api/citizen/${params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
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

  const profileData = await getUserData();
  
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
    // title: localFind('metaverse rang'),
    // description: localFind('metaverse rang is a metaverse world platform'),
    openGraph: {
      // site_name:'',
      type: 'profile',
      title: `${profileData.data.name}`,
      description: `${await makeLessCharacter()}`,
      locale: params.lang == 'fa'? 'fa_IR' : 'en_US',
      url: `https://rgb.irpsc.com/${params.lang}/citizen/${params.id}`,
      profile: {
        first_name: `${profileData.data.name}`, // optional: user's first name
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
