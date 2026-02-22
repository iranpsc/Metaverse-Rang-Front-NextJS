export const getStaticMenu = (params) => {
  return [
    { name: "home", unique_id: 149, url: "/", order: "-3" },
    {
      name: "citizen information",
      unique_id: 1374,
      url: params?.id ? `citizens/${params.id}` : "",
      order: "-3"
    },
    { name: "invitations", unique_id: 1419, url: "referral", order: "-2" },
    // { name: "citizens", unique_id: 263, url: "citizens", order: "-2" },
    { name: "list of levels", unique_id: 903, url: "levels/citizen", order: "-2" },
    // Handle citizen profilee URL dynamically

    // { name: "trainings", unique_id: 1455, url: "education", order: "-2" },
    { name: "property" },
    { name: "real estate" },
    { name: "structures" },
    { name: "belongings" },
    { name: "permissions" },
    { name: "transaction" },
    { name: "reward" },
    { name: "dynasty" },
    { name: "connections" },
    { name: "crimes" },
    { name: "news", unique_id: 255, url: "news", order: "-1" },
    // { name: "articles", unique_id: 258, url: "articles", order: "-1" },
    // { name: "trainings", url: "https://video.irpsc.com/videos/category/1036?page_id=1", order: "-1" },


    // The 'version' item is commented out here because it is defined statically in AllSideTab.jsx
    // to ensure consistent display and to handle its route (/${params.lang}/version) and subroutes independently.
    // { name: "version", unique_id: 1458, url: "version", order: "-1" },

    { name: "version", unique_id: 1458, url: "version", order: "-1" },
    { name: "calendar", unique_id: 262, url: "calendar", order: "-1" },
    { name: "about", unique_id: 259, url: "about", order: "0" },
    { name: "contact", unique_id: 260, url: "contact", order: "0" },
    { name: "overview" }
  ];
};


// export const staticMenuToShow = [
//     { name: "home", url: ``, order: "-2" },
//     { name: "citizens", url: "citizens", order: "-2" },
//     { name: "list of levels", url: "levels/citizen", order: "-2" },
//     // handle in onclick in AllSideTab
//     { name: "citizen profilee", url: "citizens/", order: "-2" },
//     { name: "property" },
//     { name: "real estate" },
//     { name: "structures" },
//     { name: "belongings" },
//     { name: "permissions" },
//     { name: "invitations",url:"referral" },
//     { name: "transaction" },
//     { name: "reward" },
//     { name: "dynasty" },
//     { name: "connections" },
//     { name: "crimes" },
//     { name: "news", url: "https://metatimes.ir/", order:"-1"},
//     { name: "articles" ,url:"https://uni.irpsc.com/category/blogs/", order:"-1"},
//     { name: "trainings" ,url:"https://video.irpsc.com/videos/category/1036?page_id=1", order:"-1"},
//     { name: "about", url: "about", order: "-1" },
//     { name: "contact", url: "contact", order: "-1" },
//     { name: "version" },
//     { name: "calendar" },
//     { name: "overview" },
//   ];
