export const sidebarFilteredData = (data: any, page: string) => {
  switch (page) {
    case "citizen":
      const modalsProfile = data.find(
        (modal: any) => modal.name === "Citizenship-profile"
      ).tabs;

      const tabsMenu = modalsProfile.find((item: any) => item.name === "menu");
      
      const namesToDelete = [
        "meta rgb",
        "metaverse rang",
        "log in",
        "logout",
        "light",
        "dark",
        "citizenship page",
        "enter the metaverse",
        "home page",
        "my profile page",
        "are you sure you want to exit",
        "yes",
        "no"
      ];

      const filteredItems = tabsMenu.fields.filter(
        (item: any) => !namesToDelete.includes(item.name)
      );

      const namesToKeep = [
        "log in",
        "logout",
        "enter the metaverse",
        "home page",
        "my profile page",
      ];
      const filteredLogin = tabsMenu.fields.filter((item: any) =>
      namesToKeep.includes(item.name)
      );

      
      const namesToKeepHeader = ["meta rgb", "metaverse rang"];

      const filteredHeader = tabsMenu.fields.filter((item: any) =>
        namesToKeepHeader.includes(item.name)
      );

      const namesToKeepsThemeMode = ["light","dark"];

       const filteredThemeMode = tabsMenu.fields.filter((item: any) =>
        namesToKeepsThemeMode.includes(item.name)
        );
        

      return {
        filteredItems,
        filteredHeader,
        filteredLogin,
        filteredThemeMode,
      };

    case "education":
      const modalsCentralPage = data.find(
        (modal: any) => modal.name === "central-page"
      ).tabs;

      const tabsBeforeLogin = modalsCentralPage.find(
        (item: any) => item.name === "before-login"
      );

      

      const sortOrder = [
        "home",
        "news",
        "articles",
        "competitions",
        "trainings",
        "about",
        "contact",
        "version",
        "calendar",
        "citizens",
        "overview",
        "language",
        "login",
        "light",
        "dark",
        "exit",
      ];

      const namesToDeleteEducation = [
        "meta rgb",
        "metaverse rang",
        "login",
        "exit",
        "light",
        "dark",
        "citizenship page",
        "enter the metaverse",
      ];

      const sortedData = tabsBeforeLogin.fields
        .filter((item: any) => sortOrder.includes(item.name))
        .sort(
          (a: any, b: any) =>
            sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name)
        );

      const filteredItemsEducation = sortedData.filter(
        (item: any) => !namesToDeleteEducation.includes(item.name)
      );

      const namesToKeepEducation = [
        "log in",
        "logout",
        "enter the metaverse",
        "home page",
        "my profile page",
      ];

      const filteredLoginEducation = tabsBeforeLogin.fields.filter(
        (item: any) => namesToKeepEducation.includes(item.name)
      );
      const namesToKeepHeaderEducation = ["metargb", "metaverse rang"];

      const filteredHeaderEducation = tabsBeforeLogin.fields.filter(
        (item: any) => namesToKeepHeaderEducation.includes(item.name)
      );
 
      return {
        filteredItemsEducation,
        filteredHeaderEducation,
        filteredLoginEducation,
      };

    default:"s"
      return {};
  }
};
