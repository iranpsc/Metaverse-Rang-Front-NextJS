import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useReducer,
} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import fs from "fs";
import path from "path";

import { Language } from "@/types/api";
interface Props {
  children: ReactNode;
}

interface LanguageSelected {
  id: number;
  name: string;
  native_name:string;
  code: string;
  dir: string;
  icon: string;
  file_url: any;
}
interface LangContextType {
  languagesData: Language[];
  languageSelected: LanguageSelected;
  profileData: any;
  data: any;
  setLanguagesSelected: React.Dispatch<React.SetStateAction<LanguageSelected>>;
  setSelectedUrlLang: React.Dispatch<React.SetStateAction<string>>;
}

const initialValue: LangContextType = {
  languagesData: [],
  languageSelected: {
    id: 8,
    code: "fa",
    name: "Persian",
    native_name: "فارسی",
    dir: "rtl",
    icon: "https://admin.rgb.irpsc.com/assets/images/flags/FA.svg",
    file_url: "https://rgb.irpsc.com/lang/fa.json",
  },
  profileData: [],

  data: {},
  setLanguagesSelected: () => {},
  setSelectedUrlLang: () => {},
};
const initialState = {
  data: {
    menu: [],
    selectedProfileData: [],
    checkIpLang: [],
    checkIpPageLang: [],
    loginPageLang: [],
    registerPageLang: [],
  },
};

export const LangContext = createContext(initialValue);

const LangProvider = ({ children }: Props) => {
  const router = useRouter();
  const [languagesData, setLanguagesData] = useState<Language[]>([]);
  const [languageSelected, setLanguagesSelected] = useState<LanguageSelected>(
    initialValue.languageSelected
  );
  const [profileData, setProfileData] = useState([]);
  const [selectedUrlLang, setSelectedUrlLang] = useState("");
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "SUCCESS":
        return {
          data: {
            menu: action.payload.menu,
            selectedProfileData: action.payload.selectedProfileData,
            //AUTH
            checkIpLang: action.payload.checkIpLang,
            checkIpPageLang: action.payload.checkIpPageLang,
            loginPageLang: action.payload.loginPageLang,
            registerPageLang: action.payload.registerPageLang,
          },
        };
      case "FAILED":
        return {
          data: {
            menu: [],
            selectedProfileData: [],
          },
        };
      default:
        return state;
    }
  };

  //USEREDUCER
  const [data, dispatch] = useReducer(reducer, initialState);
  const { lang, userId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://admin.rgb.irpsc.com/api/translations", {
          headers: {
            "Content-Type": "application/json",
            
          },
        });
        

        if (lang) {
          const query = res.data.data.find((item: any) => item.code === lang);

          if (query) {
            setLanguagesSelected({
              id: query.id,
              code: query.code,
              name: query.name,
              native_name:query.native_name,
              dir: query.direction,
              icon: query.icon,
              file_url: query.file_url,
            });
            setLanguagesData(res.data.data);
       
          } else {
            const urlEN = await res.data.data.find(
              (item: any) => item.code === "en"
            );
            router.push(`/${urlEN.code}/citizen/${userId}`);
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
          `https://api.rgb.irpsc.com/api/citizen/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            
          },
        });
        

        setProfileData(res.data.data);
      } catch (err) {}
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const res = await axios.get(`${languageSelected.file_url}`, {
          headers: {
            "Content-Type": "application/json",
            
          },
        // const res = await axios.get(
        //   `https://rgb.irpsc.com/citizen-profile/lang/${languageSelected.code}.json`,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },

          }
         );
     

        const modalsProfile = res.data.modals.find(
          (modal: any) => modal.name === "Citizenship-profile"
        ).tabs;

        const tabsMenu = modalsProfile.find(
          (item: any) => item.name === "menu"
        );
       
        const account = modalsProfile.find((tabs: any) => tabs.name === "home");

        const ip_checker = res.data.modals.find(
          (modal: any) => modal.name === "ip-checker"
        );

        const accessErrorTab = ip_checker.tabs.find(
          (tab: any) => tab.name === "access-error"
        );

        const reviewNotificationTabs = ip_checker.tabs.find(
          (tab: any) => tab.name === "review-and-notification"
        );
        const login = res.data.modals.find(
          (modal: any) => modal.name === "login"
        );
        const loginTabs = login.tabs.find((tab: any) => tab.name === "login");

        const register = res.data.modals.find(
          (modal: any) => modal.name === "register"
        );

        const registerTabs = register.tabs.find(
          (tab: any) => tab.name === "register"
        );

        const centralPage = res.data.modals.find(
          (modal: any) => (modal.name === "central-page")
        );
        const centralPageTabs = centralPage.tabs.find(
          (tab: any) => (tab.name === "before-login")
        );

        dispatch({
          type: "SUCCESS",
          payload: {
            menu: tabsMenu.fields,
            selectedProfileData: account.fields,
            checkIpLang: accessErrorTab.fields,
            checkIpPageLang: reviewNotificationTabs.fields,
            loginPageLang: loginTabs.fields,
            registerPageLang: registerTabs.fields,
            centralPageLang:centralPageTabs.fields
          },
        });
      } catch (err) {
        console.log("test",err);
      }
    };
    fetchData();
  }, [languageSelected.id]);

  return (
    <LangContext.Provider
      value={{
        languagesData,
        languageSelected,
        profileData,
        data,
        setLanguagesSelected,
        setSelectedUrlLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
