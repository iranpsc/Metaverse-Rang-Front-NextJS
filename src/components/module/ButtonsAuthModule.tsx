import React,{useContext} from "react";
//svgs
import { ProfileIcon, ProfileAddIcon } from "@/svgs/index";
import { LangContext } from "@/context/LangContext";

type ButtonsAuthModuleProps = {
  showModule: string;
  setShowModule: React.Dispatch<React.SetStateAction<string>>;
};

const ButtonsAuthModule: React.FC<ButtonsAuthModuleProps> = ({
  showModule,
  setShowModule,
}) => {
   const {data} = useContext(LangContext);
   console.log(data);
  
const buttons = [
  {
    id: 1,
     name: data.data.loginPageLang.find((item: any) => item.name === "login").translation,
   

    code: "login",
  },
  {
    id: 2,
    name: data.data.registerPageLang.find((item: any) => item.name === "register").translation,
   
  
    code: "register",
  },
];

  return (
    <>
      {buttons.map((button, index): any => (
        <button
          key={index}
          className={`${
            showModule === button.code
              ? "bg-activeButton w-[171px] text-activeTextButton dark:bg-dark-activeButton opacity-[100%] dark:text-black"
              : "bg-defaultButton text-defaultTextButton dark:bg-dark-defaultButton dark:text-dark-yellow"
          } w-[142px] h-[50px] rounded-[10px] flex items-center justify-center font-azarMehr font-medium`}
          onClick={() => setShowModule(button.code)}
        >
          <span className="px-2">
            {button.code === "login" && (
              <ProfileIcon
                className={`${
                  showModule === "login"
                    ? "stroke-activeTextButton dark:stroke-black"
                    : "stroke-defaultTextButton dark:stroke-dark-yellow"
                } w-[14px] h-[21px] stroke-[2px]`}
              />
            )}
            {button.code === "register" && (
              <ProfileAddIcon
                className={`${
                  showModule === "register"
                    ? "stroke-activeTextButton dark:stroke-black"
                    : "stroke-defaultTextButton dark:stroke-dark-yellow"
                } w-[14px] h-[21px] stroke-[2px]`}
              />
            )}
          </span>
          {button.name}
        </button>
      ))}
    </>
  );
};

export default ButtonsAuthModule;
