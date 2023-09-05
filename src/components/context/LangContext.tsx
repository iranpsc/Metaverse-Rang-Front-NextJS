import { createContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import {Language} from './../../types/api'


interface LanguageSelected {
  id: number;
  name: string;
  code: string;
  dir: string;
  icon: string;
}
interface LangContextType {
  languagesData: Language[];
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
  const [languagesData, setLanguagesData] = useState<Language[]>([]);



  const [languageSelected, setLanguagesSelected] = useState<LanguageSelected>(
    initialValue.languageSelected
  );
  const [menuData, setMenuData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [selectedProfileData, setSelectedProfileData] = useState([]);
  const [selectedUrlLang, setSelectedUrlLang] = useState("");
  const [selectedLang, setSelectedLang] = useState<string>("");

  const router = useRouter();

  const { lang, userId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://admin.rgb.irpsc.com/api/translations"
        );
        if (lang) {
          const query = res.data.data.find((item: any) => item.code === lang);
          if (query) {
            setLanguagesSelected({
              id: query.id,
              code: query.code,
              name: query.name,
              dir: query.direction,
              icon: query.icon,
            });
            setLanguagesData(res.data.data);
          } else {
            const urlEN = await res.data.data.find(
              (item: any) => item.code === "EN"
            );
            router.push(`/${urlEN.code}/citizen/profile`);
            setLanguagesData(res.data.data);
          }
        }
      } catch (err) {
        //router.push("/404");
      }
    };
    fetchData();
  }, [lang]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.rgb.irpsc.com/api/citizen/${userId}`
        );
       
          setProfileData(res.data.data);
      } catch (err) {
     
      }  
    };
    if(userId){
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
         const res = await axios.get(
           `https://admin.rgb.irpsc.com/api/translations/${languageSelected.id}/modals`
         );

         const selectModals = res.data.data.find(
           (item: any) => item.name === "Citizenship-profile"
         );
         //menu
         const resModalMenu = await axios.get(
           `https://admin.rgb.irpsc.com/api/translations/${languageSelected?.id}/modals/${selectModals.id}/tabs`
         );
         const selectTabsMenu = resModalMenu.data.data.find(
           (item: any) => item.name === "menu"
         );
       
         const resMenu = await axios.get(
           `https://admin.rgb.irpsc.com/api/translations/${languageSelected?.id}/modals/${selectModals.id}/tabs/${selectTabsMenu.id}/fields`
         );
         const removeMenuName = "menu";
         const newItem = resMenu.data.data.filter(
           (item: any) => item.name !== removeMenuName
         );
   
         setMenuData(newItem);

         const getTabs = await axios.get(
           `https://admin.rgb.irpsc.com/api/translations/${languageSelected.id}/modals/${selectModals.id}/tabs`
         );

         const selectTabs = getTabs.data.data.find(
           (item: any) => item.name === "home"
         );
         const getFields = await axios.get(
           `https://admin.rgb.irpsc.com/api/translations/${languageSelected.id}/modals/${selectModals.id}/tabs/${selectTabs.id}/fields`
         );

         setSelectedProfileData(getFields.data.data);
      } catch (err) {
      
      }
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
