import { useContext, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Formik, Form, Field } from "formik";
//svgs
import { EyeShow, EyeHidden } from "@/svgs/SvgAuth";
//ERROR
import ErrorMessageComponent from "./ErrorMessageComponent";
//CONTEXT
import { LangContext } from "@/context/LangContext";
//UTILS
import { LoginSchema } from "@/utils/validationAuth";
import { cssAuth } from "../utils/taiwindAuth";

export default function LoginModule({ setShowModule, setShowAuthCard }: any) {
  const DynamicCaptcha = dynamic(() => import("../templates/Captcha"), {
    ssr: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);
  const [showErrorLoginAccess, seShowErrorLoginAccess] = useState<string>("");
  const [dataLogin, setDataLogin] = useState([]);

  const { languageSelected, data } = useContext(LangContext);
  const lang = languageSelected.code;

  const [rememberMe, setRememberMe] = useState(false);

  const footerText = data.data.loginPageLang.find(
    (item: any) => item.name === "for more information and answers to"
  ).translation;

  const footerText2 = data.data.loginPageLang.find(
    (item: any) => item.name === "visit-the"
  ).translation;
  const footerText3 = data.data.loginPageLang.find(
    (item: any) => item.name === "terms of service contract"
  ).translation;

  const footerText4 = data.data.loginPageLang.find(
    (item: any) => item.name === "you agree"
  ).translation;

  const footerText5 = data.data.loginPageLang.find(
    (item: any) => item.name === "terms of service contract"
  ).translation;

  const handleCheckboxChange = (e: any) => {
    setRememberMe(e.target.checked);
  };

  const handleFormSubmit = (values: any) => {
    if (values) {
      setDataLogin(values);
      setShowCaptcha(true);
    }
  };

  const getEmailValue = (e: any) => {};

  return (
    <>
      <div className=" h-fit flex flex-col justify-start items-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleFormSubmit}
          validationSchema={LoginSchema()}
        >
          {(props) => (
            <Form className="w-[95%]">
              <div className="form-group flex flex-col items-center pb-2 pt-3 ">
                <Field
                  type="text"
                  name="email"
                  placeholder={
                    data.data.loginPageLang.find(
                      (item: any) => item.name === "enter-your-email"
                    ).translation
                  }
                  autoComplete="off"
                  className={`${cssAuth(props, "email")} ${
                    showErrorLoginAccess &&
                    "border-error dark:border-error text-error"
                  }`}
                  onChange={(e: any) => {
                    getEmailValue(e.target.value);
                    props.handleChange(e);
                  }}
                />
                <ErrorMessageComponent
                  fieldName="email"
                  lang={lang}
                  data={data.data.registerPageLang}
                />
                {showErrorLoginAccess !== "" ? (
                  <>
                    <span className="text-error font-azarMehr font-medium text-[10px] mt-2">
                      {showErrorLoginAccess}
                    </span>
                  </>
                ) : null}
              </div>

              <div className="form-group">
                <div className=" form-group flex flex-col items-center relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={
                      data.data.loginPageLang.find(
                        (item: any) => item.name === "password"
                      ).translation
                    }
                    className={`${cssAuth(props, "password")} ${
                      showErrorLoginAccess &&
                      "border-error dark:border-error text-error"
                    }`}
                  />

                  <span
                    className={`absolute  end-3  ${
                      props.errors.password ? "top-[22%]" : "top-1/3"
                    }  cursor-pointer`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeShow
                        className={` stroke-[2px] h-5 w-5
                       ${
                         props.errors.password && props.touched.password
                           ? "stroke-[#ff0000] dark:stroke-[#E85300]"
                           : "stroke-[#DADADA] dark:stroke-[#5B5B5B]"
                       }
                      `}
                      />
                    ) : (
                      <EyeHidden
                        className={`stroke-[2px] h-5 w-5
                       ${
                         props.errors.password && props.touched.password
                           ? "stroke-[#ff0000] dark:stroke-[#E85300]"
                           : "stroke-[#DADADA] dark:stroke-[#5B5B5B]"
                       }
                      `}
                      />
                    )}
                  </span>
                  <ErrorMessageComponent
                    fieldName="password"
                    lang={lang}
                    data={data.data.registerPageLang}
                  />
                </div>

                {/* {showErrorLoginAccess !== "" ? (
                  <span className="text-error font-azarMehr font-medium text-[9px] mt-10">
                    {showErrorLoginAccess}
                  </span>
                ) : null} */}
              </div>

              <button className="bg-[#D7FBF0] text-[#18C08F] border-[#18C08F] dark:bg-[#004531] mt-2 border-[1px] w-full h-[50px] rounded-[5px] font-azarMehr font-normal">
                {(data.data.loginPageLang.find(
                  (item: any) => item.name === "login"
                ) &&
                  data.data.loginPageLang.find(
                    (item: any) => item.name === "login"
                  ).translation) ||
                  "undefine"}
              </button>
            </Form>
          )}
        </Formik>
        {showCaptcha && (
          <div
            className="absolute backdrop-blur-sm   top-0 w-[100%] h-[100%]"
            onClick={() => setShowCaptcha(false)}
          >
            <DynamicCaptcha
              position="Login"
              data={dataLogin}
              setShowCaptcha={setShowCaptcha}
              seShowErrorLoginAccess={seShowErrorLoginAccess}
              setShowAuthCard={setShowAuthCard}
            />
          </div>
        )}

        <div className="w-full mt-7 flex flex-col items-center">
          <label className="text-center dark:text-[#E1E1E1] flex items-center justify-center font-azarMehr text-[16px] text-[#00000073] font-medium">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleCheckboxChange}
              className="mx-1 w-4 h-4"
            />
            {
              data.data.loginPageLang.find(
                (item: any) => item.name === "remember me"
              ).translation
            }
          </label>
          <p
            className="cursor-pointer text-center mt-2 font-azarMehr text-[#008BF8] text-[14px] font-bold"
            onClick={() => setShowModule("forgetPassword")}
          >
            {
              data.data.forgetPasswordPageLang.find(
                (item: any) => item.name === "forgot your password"
              ).translation
            }
          </p>
        </div>

        {languageSelected.code === "fa" && (
          <p className="text-center px-1 pb-6 mt-6 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal">
            {footerText}
            {footerText2}
            <Link
              href="https://rgb.irpsc.com/terms"
              passHref={true}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className=" cursor-pointer text-center px-1 mt-4 w-full text-blueLink dark:text-blueLink font-azarMehr text-[14px] font-normal">
                {" "}
                {footerText3}
              </span>
            </Link>{" "}
            {footerText4}
          </p>
        )}
        {languageSelected.code === "en" && (
          <p className="text-center px-1 pb-6 mt-6 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal">
            {footerText} {footerText2} {footerText4}
            <Link
              href="https://rgb.irpsc.com/terms"
              passHref={true}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className=" cursor-pointer text-center px-1 mt-4 w-full text-blueLink dark:text-blueLink font-azarMehr text-[14px] font-normal">
                {footerText5}{" "}
              </span>
            </Link>
          </p>
        )}
      </div>
    </>
  );
}