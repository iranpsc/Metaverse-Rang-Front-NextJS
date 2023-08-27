import { createContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";

interface LanguageSelected {
  id: number;
  name: string;
  code: string;
  dir: string;
  icon: string;
}
interface LangContextType {
  languagesData: any[];
  languageSelected: LanguageSelected;
  menuData: any[];
  profileData: any;
  selectedProfileData: any[];
  setLanguagesSelected: React.Dispatch<React.SetStateAction<LanguageSelected>>;
  setSelectedUrlLang: React.Dispatch<React.SetStateAction<string>>;
}

const initialValue: LangContextType = {
  languagesData: [],
  languageSelected: {
    id: 7,
    code: "EN",
    name: "English",
    dir: "ltr",
    icon: "",
  },
  menuData: [],
  profileData: [],
  selectedProfileData: [],
  setLanguagesSelected: () => {},
  setSelectedUrlLang: () => {},
};

export const LangContext = createContext(initialValue);

interface Props {
  children: ReactNode;
}

const LangProvider = ({ children }: Props) => {
  const [languagesData, setLanguagesData] = useState([]);
  const [languageSelected, setLanguagesSelected] = useState<LanguageSelected>(
    initialValue.languageSelected
  );
  const [menuData, setMenuData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [selectedProfileData, setSelectedProfileData] = useState([]);
  const [selectedUrlLang, setSelectedUrlLang] = useState("");
  const [selectedLang, setSelectedLang] = useState<string>("");

  const router = useRouter();

  const { lang,userId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
     
      const res = await fetch("https://admin.rgb.irpsc.com/api/translations");
      const data = await res.json();
    
      if (lang) {
        const query = data.data.find((item: any) => item.code === lang);

        if (query) {
          setLanguagesSelected({
            id: query.id,
            code: query.code,
            name: query.name,
            dir: query.direction,
            icon: query.icon,
          });
          //setLanguagesData(data.data.filter((item: any) => item.code !== lang));
          setLanguagesData(data.data);
        } else {
          const urlEN = await data.data.find((item: any) => item.code === "EN");
          router.push(`/${urlEN.code}/citizen/profile`);
          setLanguagesData(data.data);

          
        }
      }
    };
    fetchData();
  }, [lang]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.rgb.irpsc.com/api/citizen/${userId}`
      );
      const data = await res.json();
      if (data.message) {
        router.push("/404");
      } else {
        setProfileData(data.data);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://admin.rgb.irpsc.com/api/translations/${languageSelected.id}/modals`
      );
      const data = await res.json();

      const selectModals = data.data.find(
        (item: any) => item.name === "Citizenship-profile"
      );
      //menu
      const resMenu = await fetch(
        `https://admin.rgb.irpsc.com/api/translations/${languageSelected?.id}/modals/${selectModals.id}/tabs`
      );
      const dataItemMenu = await resMenu.json();
      const removeMenuName = "menu";
      const newItem = dataItemMenu.data.filter(
        (item: any) => item.name !== removeMenuName
      );
      const language = {
        id: 9999132,
        modal_id: selectModals,
        name: "language",
      };
      const addLanguage: any = [...newItem, language];
      setMenuData(addLanguage);

      const getTabs = await fetch(
        `https://admin.rgb.irpsc.com/api/translations/${languageSelected.id}/modals/${selectModals.id}/tabs`
      );
      const tabs = await getTabs.json();
      const selectTabs = tabs.data.find((item: any) => item.name === "home");
      const getFields = await fetch(
        `https://admin.rgb.irpsc.com/api/translations/${languageSelected.id}/modals/${selectModals.id}/tabs/${selectTabs.id}/fields`
      );
      const dataFields = await getFields.json();
      setSelectedProfileData(dataFields.data);
    };
    fetchData();
  }, [languageSelected.id]);

  return (
    <LangContext.Provider
      value={{
        languagesData,
        languageSelected,
        menuData,
        profileData,
        selectedProfileData,
        setLanguagesSelected,
        setSelectedUrlLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
