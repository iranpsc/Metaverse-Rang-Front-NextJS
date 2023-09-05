import { useContext } from "react";
import dynamic from "next/dynamic";
import { Formik, Form, Field } from "formik";
import { RegisterSchema, selectLanguage } from "../utils/validationAuth";
//svgs
import { EyeShow, EyeHidden } from "../svgs";
import { cssAuth } from "../utils/taiwindAuth";

import ErrorMessageComponent from "./ErrorMessageComponent";
import { useState } from "react";

import { LangContext } from "@/components/context/LangContext";
import { selectLanguageAuthModule } from "../utils/textsLanguage";


export default function RegisterModule() {
  const DynamicCaptcha = dynamic(() => import("../templates/Captcha"), {
    ssr: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [dataRegister, setDataRegister] = useState([]);

   const [rememberMe, setRememberMe] = useState(false);

   const handleCheckboxChange = (e: any) => {
     setRememberMe(e.target.checked);
   };


  const { languageSelected } = useContext(LangContext);
  const lang = languageSelected.code;

  const handleFormSubmit = (values: any) => {
    if (values) {
    
      setDataRegister(values);
      setShowCaptcha(true);
    }
  };

  return (
    <>
      <div className=" h-fit flex flex-col justify-start items-center">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={handleFormSubmit}
          validationSchema={RegisterSchema(lang)}
        >
          {(props) => (
            <Form className="w-[95%]">
              <div className="form-group flex flex-col items-center pb-2 pt-3 ">
                <Field
                  type="text"
                  name="username"
                  placeholder={selectLanguage(lang).placeholderUsername}
                  autoComplete="off"
                  className={cssAuth(props, "username")}
                />
                <ErrorMessageComponent fieldName="username" lang={lang} />
              </div>

              <div className="form-group flex flex-col items-center  pb-2  ">
                <Field
                  type="text"
                  name="email"
                  placeholder={selectLanguage(lang).placeholderEmail}
                  autoComplete="off"
                  className={cssAuth(props, "email")}
                />
                <ErrorMessageComponent fieldName="email" lang={lang} />
              </div>

              <div className="form-group">
                <div className=" flex flex-col items-center relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={selectLanguage(lang).placeholderPassword}
                    className={`${cssAuth(props, "password")}`}
                  />

                  <span
                    className="absolute end-3 top-1/3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeShow
                        className={` stroke-[2px]
                       ${
                         props.errors.password
                           ? "stroke-[#ff0000] dark:stroke-[#E85300]"
                           : "stroke-[#4360EC] dark:stroke-[#5B5B5B]"
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
              </div>

              <button className="bg-[#D7FBF0] text-[#18C08F] dark:bg-[#004531] border-[#18C08F] border-[1px] w-full h-[50px] mt-1 rounded-[5px] font-azarMehr font-normal">
                {selectLanguageAuthModule(lang).registerButton}
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
              position="Register"
              data={dataRegister}
              setShowCaptcha={setShowCaptcha}
            />
          </div>
        )}

        <div className="w-full mt-4 mb-4 flex flex-col items-center">
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
        {lang === "EN" ? (
          <p className="text-center pb-8 px-1 mt-4 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal">
            {selectLanguageAuthModule(lang).footer}
            <span className="mx-1 text-[14px] font-azarMehr text-[#008BF8] cursor-pointer font-medium">
              website.
            </span>
          </p>
        ) : (
          <>
            <p className="w-ful text-center pb-8 mt-4 text-[14px] font-azarMehr text-[#898989] font-medium">
              {selectLanguageAuthModule(lang).footerBe}
              <span className="mx-1 text-[14px] font-azarMehr  text-[#008BF8] cursor-pointer font-medium">
                وبسایت
              </span>
            </p>
            <p className="w-full text-center text-[14px]  font-azarMehr text-[#898989] font-medium">
              {selectLanguageAuthModule(lang).footerَAf}
            </p>
          </>
        )}
      </div>
    </>
  );
}
