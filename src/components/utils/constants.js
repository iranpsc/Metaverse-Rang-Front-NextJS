export const getStaticMenu = (params) => {
  return [
    { name: "home", url: "", order: "-2" },
    { name: "citizens", url: "citizens", order: "-2" },
    { name: "list of levels", url: "levels/citizen", order: "-2" },
    // Handle citizen profilee URL dynamically
    { 
      name: "citizen information", 
      url: params?.id ? `citizens/${params.id}` : "", 
      order: "-2" 
    },
    { name: "property" },
    { name: "real estate" },
    { name: "structures" },
    { name: "belongings" },
    { name: "permissions" },
    { name: "invitations", url: "referral" },
    { name: "transaction" },
    { name: "reward" },
    { name: "dynasty" },
    { name: "connections" },
    { name: "crimes" },
    { name: "news", url: "https://metatimes.ir/", order: "-1" },
    { name: "articles", url: "https://uni.irpsc.com/category/blogs/", order: "-1" },
    { name: "trainings", url: "https://video.irpsc.com/videos/category/1036?page_id=1", order: "-1" },
    { name: "about", url: "about", order: "-1" },
    { name: "contact", url: "contact", order: "-1" },
    { name: "version" },
    { name: "calendar" },
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
