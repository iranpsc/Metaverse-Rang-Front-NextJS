import { useContext } from "react";
import Link from "next/link";    

import dynamic from "next/dynamic";
import { Formik, Form, Field } from "formik";
import { RegisterSchema, selectLanguage } from "../utils/validationAuth";
//svgs
import { EyeShow, EyeHidden } from "../svgs";
import { cssAuth } from "../utils/taiwindAuth";

import ErrorMessageComponent from "./ErrorMessageComponent";
import { useState } from "react";

import { LangContext } from "@/context/LangContext";
import { selectLanguageAuthModule } from "@/utils/textsLanguage";


export default function RegisterModule({ setShowAuthCard }: any) {
  const DynamicCaptcha = dynamic(() => import("../templates/Captcha"), {
    ssr: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [dataRegister, setDataRegister] = useState([]);
    const [showErrorRegisterAccess, setShowErrorRegisterAccess] =
      useState<string>("");

  const [rememberMe, setRememberMe] = useState(false);


  const handleCheckboxChange = (e: any) => {
    setRememberMe(e.target.checked);
  };

  const { languageSelected, data } = useContext(LangContext);
  const lang = languageSelected.code;

  console.log(data.data.registerPageLang);
  const footerText = data.data.registerPageLang.find(
    (item: any) => item.name === "for more information and answers to"
  ).translation;


  const footerText2 = data.data.registerPageLang.find(
    (item: any) => item.name === "website"
  ).translation;

  const footerText3 = data.data.registerPageLang.find(
    (item: any) => item.name === "visit-the"
  ).translation;

  const handleFormSubmit = (values: any) => {
    if (values) {
      setDataRegister(values);
      setShowCaptcha(true);
    }
  };

  return (
    <>
      <div className=" h-fit pb-6 flex flex-col justify-start items-center">
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
                  placeholder={
                    data.data.registerPageLang.find(
                      (item: any) => item.name === "username"
                    ).translation
                  }
                  autoComplete="off"
                  className={cssAuth(props, "username")}
                />
                <ErrorMessageComponent fieldName="username" lang={lang} />
              </div>

              <div className="form-group flex flex-col items-center  pb-2  ">
                <Field
                  type="text"
                  name="email"
                  placeholder={
                    data.data.registerPageLang.find(
                      (item: any) => item.name === "enter your email"
                    ).translation
                  }
                  autoComplete="off"
                  className={cssAuth(props, "email")}
                />
                <ErrorMessageComponent fieldName="email" lang={lang} />
                {showErrorRegisterAccess !== "" ? (
                  <span className="text-error w-full font-azarMehr font-medium text-[10px] mt-1 text-start ">
                    {showErrorRegisterAccess}
                  </span>
                ) : null}
              </div>

              <div className="form-group">
                <div className=" flex flex-col items-center  relative ">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={
                      data.data.registerPageLang.find(
                        (item: any) => item.name === "password"
                      ).translation
                    }
                    className={`${cssAuth(props, "password")}`}
                  />

                  <span
                    className={`absolute  end-3  ${
                      props.errors.password ? "top-[23%]" : "top-[27%]"
                    }  cursor-pointer`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeShow
                        className={` stroke-[2px] h-5 w-5
                       ${
                         props.errors.password
                           ? "stroke-[#ff0000] dark:stroke-[#E85300]"
                           : "stroke-[#DADADA] dark:stroke-[#5B5B5B]"
                       }
                      `}
                      />
                    ) : (
                      <EyeHidden
                        className={`stroke-[2px] h-5 w-5
                       ${
                         props.errors.password
                           ? "stroke-[#ff0000] dark:stroke-[#E85300]"
                           : "stroke-[#DADADA] dark:stroke-[#5B5B5B]"
                       }
                      `}
                      />
                    )}
                  </span>
                  <ErrorMessageComponent fieldName="password" lang={lang} />
                </div>
              </div>

              <button className="bg-[#D7FBF0]  text-[#18C08F] dark:bg-[#004531] border-[#18C08F] border-[1px] w-full h-[50px] mt-2 rounded-[5px] font-azarMehr font-normal">
                {
                  data.data.registerPageLang.find(
                    (item: any) => item.name === "register"
                  ).translation
                }
              </button>
            </Form>
          )}
        </Formik>
        {showCaptcha && (
          <div
            className="absolute backdrop-blur-sm    top-0 w-[100%] h-[100%]"
            onClick={() => setShowCaptcha(false)}
          >
            <DynamicCaptcha
              position="Register"
              data={dataRegister}
              setShowCaptcha={setShowCaptcha}
              setShowErrorRegisterAccess={setShowErrorRegisterAccess}
            />
          </div>
        )}

        <div className="w-full mt-4 mb-4 flex flex-col items-center">
          <label className="text-center dark:text-[#E1E1E1] flex items-center justify-center font-azarMehr text-[16px] text-[#00000073] font-medium">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleCheckboxChange}
              className="mx-1 w-4 h-4"
            />
            {
              data.data.registerPageLang.find(
                (item: any) => item.name === "remember-me"
              ).translation
            }
          </label>
          {/* <p className="text-center mt-2 font-azarMehr text-[#008BF8] text-[14px] font-bold">
            {selectLanguageAuthModule(lang).loginForget}
          </p> */}
        </div>

        {languageSelected.code === "fa" && (
          <p className="text-center px-1 pb-6 mt-6 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal">
            {footerText}
            <Link
              href="https://faq.irpsc.com"
              passHref={true}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className=" cursor-pointer text-center px-1 mt-4 w-full text-blueLink dark:text-blueLink font-azarMehr text-[14px] font-normal">
                {footerText2}{" "}
              </span>{" "}
            </Link>
            {footerText3}
          </p>
        )}
        {languageSelected.code === "en" && (
          <p className="text-center px-1 pb-6 mt-6 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal">
            {footerText} visite The{" "}
            <Link
              href="https://faq.irpsc.com"
              passHref={true}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className=" cursor-pointer text-center px-1 mt-4 w-full text-blueLink dark:text-blueLink font-azarMehr text-[14px] font-normal">
                {footerText2}{" "}
              </span>
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
