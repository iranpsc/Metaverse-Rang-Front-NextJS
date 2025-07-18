import SideBar from "@/components/module/sidebar/SideBar";
import BreadCrumb from "@/components/shared/BreadCrumb";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getFooterData,
  getAllReferral,
  getUserData,
  getChartReferral,
} from "@/components/utils/actions";
import { getStaticMenu } from "@/components/utils/constants";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import InviteBox from "./components/invite-box";
import "./style/style.css";
import InviteList from "./components/invite-list";
import InviteChart from "./components/invite-chart.js";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function CitizenReferral({ params }: { params: any }) {
  const langData = await getTranslation(params.lang);

  const [mainData, langArray, initInviteList, footerTabs, chartDataFetch] =
    await Promise.all([
      getMainFile(langData),
      getLangArray(),
      getAllReferral(params.id),
      getFooterData(params),
      getChartReferral(params.id, "yearly"),
    ]);

  // Updated localFind function with error handling and logging
  function localFind(_name: any): string {
    if (!Array.isArray(referralPageArrayContent) || referralPageArrayContent.length === 0) {
      console.warn('referralPageArrayContent is empty or not an array', { _name });
      return '';
    }
    const item = referralPageArrayContent.find((item: any) => item.name === _name);
    if (!item) {
      console.warn(`No item found for name: ${_name}`, { referralPageArrayContent });
      return '';
    }
    return item.translation || '';
  }

  // Convert all digits to Persian digits
  const convertToPersianDigits = (str: any) => {
    return str.replace(/\d/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  let initChartData = { labels: [], data: [[], []] };
  initChartData.labels = await chartDataFetch.chart_data.map((label: any) =>
    convertToPersianDigits(label.year)
  );
  initChartData.data[0] = await chartDataFetch.chart_data.map(
    (label: any) => label.total_referrals_count
  );
  initChartData.data[1] = await chartDataFetch.chart_data.map(
    (label: any) => label.total_referral_orders_amount
  );

  const centralPageModal = await findByModalName(
    mainData,
    "Citizenship-profile"
  );

  const tabsMenu = await findByTabName(centralPageModal, "menu");

  const referralPageArrayContent = await findByTabName(
    centralPageModal,
    "referral"
  );

  const staticMenuToShow = getStaticMenu(params);

  // Add staticMenuToShow values to siblings tabsMenu values
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    let findInStatic = staticMenuToShow.find(
      (val) => tab.unique_id === val.unique_id
    );

    if (findInStatic) {
      return {
        ...tab,
        url: findInStatic.url,
        order: findInStatic.order,
        toShow: true,
      };
    }

    return tab;
  });

  // To make description less than 200 characters
  async function makeLessCharacter() {
    let temp;
    if (profileData.data?.customs?.about) {
      temp = profileData.data.customs.about;
      temp = temp.slice(0, 200);
    } else temp = "";
    return temp;
  }
  const profileData = await getUserData(params.id);

  const citizenReferralSchema = {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: `${
      profileData.data.name ||
      profileData.data?.kyc.fname + " " + profileData.data?.kyc.lname
    }`,
    image: profileData.data?.profilePhotos?.map((item: any) => {
      return item.url;
    }) || [],
    url: `http://rgb.irpsc.com/${params.lang}/citizen/${params.id}`,
    jobTitle: `${profileData.data?.customs?.occupation || ""}`,
    description: `${await makeLessCharacter()}`,
    birthDate: `${profileData.data?.kyc?.birth_date || ""}`,
    email: `${profileData.data?.kyc?.email || ""}`,
    alternateName: `${profileData.data.code || ""}`,
  };

  const itemListSchema = {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    itemListElement: [
      // Static item for Total Invited
      {
        "@type": "ListItem",
        position: 1,
        name: localFind("the total number of invitations"),
        value: initInviteList.data.length || 0,
        url: `https://rgb.irpsc.com/fa/citizens/${params.id}/referral`,
      },
      // Static item for Total Reward
      {
        "@type": "ListItem",
        position: 2,
        name: localFind("-rewards"),
        value: initInviteList.data.reduce((sum: any, person: any) => {
          const personTotal = person.referrerOrders.reduce(
            (orderSum: any, order: any) => orderSum + (order.amount || 0),
            0
          );
          return sum + personTotal;
        }, 0),
        url: `https://rgb.irpsc.com/fa/citizens/${params.id}/referral`,
      },
      // Dynamic items for each invite
      ...(initInviteList.data || []).map((invited: any, index: any) => ({
        "@type": "ListItem",
        position: index + 3,
        name: invited.name || "",
        identifier: `${invited.code || ""}`,
        value: invited.referrerOrders.reduce(
          (acc: any, item: any) => acc + (item.amount || 0),
          0
        ),
        url: `https://rgb.irpsc.com/${params.lang}/citizens/${invited.code || ""}`,
      })),
    ],
  };

  return (
    <>
      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(citizenReferralSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
      {/* schema END */}
      <div className="flex h-screen overflow-hidden" dir={langData.direction}>
        <SideBar
          tabsMenu={updatedTabsMenu}
          langData={langData}
          langArray={langArray}
          params={params}
          pageSide="citizen"
        />
        <section
          className={`overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20 px-2 !w-full`}
        >
          {/* Breadcrumb */}
          <div className="px-12">
            <BreadCrumb params={params} />
          </div>

          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            {referralPageArrayContent && (
              <InviteBox
                referralPageArrayContent={referralPageArrayContent}
                params={params}
                mainData={mainData}
              />
            )}
            {initInviteList && referralPageArrayContent && (
              <InviteList
                initInviteList={initInviteList}
                params={params}
                referralPageArrayContent={referralPageArrayContent}
                mainData={mainData}
              />
            )}
            {referralPageArrayContent && initChartData && (
              <InviteChart
                params={params}
                referralPageArrayContent={referralPageArrayContent}
                initChartData={initChartData}
                mainData={mainData}
              />
            )}
          </div>

          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
          </div>
        </section>
      </div>
    </>
  );
}

// SEO
export async function generateMetadata({ params }: { params: any }) {
  const profileData = await getUserData(params.id);
  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const centralPageModal = await findByModalName(
    mainData,
    "Citizenship-profile"
  );
  const referralPageArrayContent = await findByTabName(
    centralPageModal,
    "referral"
  );

  // Updated localFind function with error handling and logging
  function localFind(_name: any): string {
    if (!Array.isArray(referralPageArrayContent) || referralPageArrayContent.length === 0) {
      // console.warn('referralPageArrayContent is empty or not an array', { _name });
      return '';
    }
    const item = referralPageArrayContent.find((item: any) => item.name === _name);
    if (!item) {
      console.warn(`No item found for name: ${_name}`, { referralPageArrayContent });
      return '';
    }
    return item.translation || '';
  }

  // To make description less than 200 characters
  async function makeLessCharacter() {
    let temp = await localFind("description of invitations");
    temp = temp.slice(0, 200);
    return temp;
  }

  return {
    title: `${
      params.lang.toLowerCase() == "fa" ? "دعوتی های" : "invite list of"
    } ${profileData.data.kyc?.fname || ""} ${profileData.data.kyc?.lname || ""}`,
    description:
      (await localFind("the list of friends who have been")) ||
      "citizen referral page",
    openGraph: {
      type: "profile",
      title: `${
        params.lang.toLowerCase() == "fa" ? "دعوتی های" : "invite list of"
      } ${profileData.data.kyc?.fname || ""} ${profileData.data.kyc?.lname || ""}`,
      description: `${await makeLessCharacter()}`,
      locale: params.lang == "fa" ? "fa_IR" : "en_US",
      url: `https://rgb.irpsc.com/${params.lang}/citizen/${params.id}/referral`,
      profile: {
        first_name: `${profileData.data.name || ""}`,
      },
      images: [
        {
          url: `${profileData.data?.profilePhotos?.[0]?.url || ""}`,
          width: 800,
          height: 600,
        },
      ],
    },
    other: {
      "google-site-verification": "lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4",
    },
  };
}