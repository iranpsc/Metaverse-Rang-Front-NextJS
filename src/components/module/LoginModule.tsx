import { useContext } from "react";
import dynamic from "next/dynamic";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema, selectLanguage } from "../utils/validationAuth";
//svgs
import { EyeShow, EyeHidden } from "../svgs";
import { cssAuth } from "../utils/taiwindAuth";

import ErrorMessageComponent from "./ErrorMessageComponent";
import { useState } from "react";
import Captcha from "../templates/Captcha";
import { LangContext } from "@/components/context/LangContext";
import { selectLanguageAuthModule } from "../utils/textsLanguage";



export default function LoginModule() {
  const DynamicCaptcha = dynamic(() => import("../templates/Captcha"), {
    ssr: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCaptcha,setShowCaptcha] = useState<boolean>(false);
  const [showErrorLoginAccess, seShowErrorLoginAccess] = useState<string>("");
  const [dataLogin,setDataLogin] = useState([]);

   const { languageSelected } = useContext(LangContext);
   const lang = languageSelected.code;

 const [rememberMe, setRememberMe] = useState(false);

 const handleCheckboxChange = (e:any) => {
   setRememberMe(e.target.checked);
 };

  const handleFormSubmit = (values: any) => {
    if(values){
     
      setDataLogin(values)
      setShowCaptcha(true);
    }
  };

  return (
    <>
      <div className=" h-fit flex flex-col justify-start items-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleFormSubmit}
          validationSchema={LoginSchema(lang)}
        >
          {(props) => (
            <Form className="w-[95%]">
              <div className="form-group flex flex-col items-center pb-2 pt-3 ">
                <Field
                  type="text"
                  name="email"
                  placeholder={selectLanguage(lang).placeholderEmail}
                  autoComplete="off"
                  className={cssAuth(props, "email")}
                />
                <ErrorMessageComponent fieldName="email" lang={lang} />
                {showErrorLoginAccess !== "" ? (
                  <span className="text-error font-azarMehr font-medium text-[10px]">
                    {showErrorLoginAccess}
                  </span>
                ) : null}
              </div>

              <div className="form-group">
                <div className=" form-group flex flex-col items-center relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={selectLanguage(lang).placeholderPassword}
                    className={`${cssAuth(props, "password")} ""`}
                  />

                  <span
                    className="absolute end-7 top-1/3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeShow
                        className={` stroke-[2px]
                       ${
                         props.errors.password
                           ? "stroke-[#ff0000] dark:stroke-[#E85300] "
                           : "stroke-[#4360EC] dark:stroke-[#5B5B5B"
                       }
                      `}
                      />
                    ) : (
                      <EyeHidden
                        className={`stroke-[2px]
                       ${
                         props.errors.password
                           ? "stroke-[#ff0000] dark:stroke-[#E85300]"
                           : "stroke-[#4360EC] dark:stroke-[#5B5B5B]"
                       }
                      `}
                      />
                    )}
                  </span>
                </div>

                <ErrorMessageComponent fieldName="password" lang={lang} />
                {showErrorLoginAccess !== "" ? (
                  <span className="text-error font-azarMehr font-medium text-[9px]">
                    {showErrorLoginAccess}
                  </span>
                ) : null}
              </div>

              <button className="bg-[#D7FBF0] text-[#18C08F] border-[#18C08F] dark:bg-[#004531] mt-2 border-[1px] w-full h-[50px] rounded-[5px] font-azarMehr font-normal">
                {selectLanguageAuthModule(lang).loginButton}
              </button>
            </Form>
          )}
        </Formik>
        {showCaptcha && (
          <div
            className="absolute bg-black/60  top-0 w-[100%] h-[100%]"
            onClick={() => setShowCaptcha(false)}
          >
            <DynamicCaptcha
              position="Login"
              data={dataLogin}
              setShowCaptcha={setShowCaptcha}
              seShowErrorLoginAccess={seShowErrorLoginAccess}
            />
          </div>
        )}

        <div className="w-full mt-7 flex flex-col items-center">
          <label className="text-center dark:text-[#E1E1E1] flex items-center justify-center font-azarMehr text-[16px] text-[#00000073] font-medium">
            {selectLanguageAuthModule(lang).loginRemeber}
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleCheckboxChange}
              className="mx-1 w-5 h-5"
            />
          </label>
          <p className="text-center mt-2 font-azarMehr text-[#008BF8] text-[14px] font-bold">
            {selectLanguageAuthModule(lang).loginForget}
          </p>
        </div>
      </div>
    </>
  );
}
