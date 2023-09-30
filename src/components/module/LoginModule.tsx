import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { Formik, Form, Field} from "formik";
//svgs
import { EyeShow, EyeHidden } from "@/svgs/index";
//ERROR
import ErrorMessageComponent from "./ErrorMessageComponent";
//CONTEXT
import { LangContext } from "@/context/LangContext";
//UTILS
import { LoginSchema, selectLanguage } from "@/utils/validationAuth";
import { cssAuth } from "../utils/taiwindAuth";
import { selectLanguageAuthModule } from "@/utils/textsLanguage";



export default function LoginModule() {
  const DynamicCaptcha = dynamic(() => import("../templates/Captcha"), {
    ssr: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCaptcha,setShowCaptcha] = useState<boolean>(false);
  const [showErrorLoginAccess, seShowErrorLoginAccess] = useState<string>("");
  const [dataLogin,setDataLogin] = useState([]);

   const { languageSelected ,data} = useContext(LangContext);
   const lang = languageSelected.code;

 const [rememberMe, setRememberMe] = useState(false);

  const footerText = data.data.loginPageLang.find(
    (item: any) =>
      item.name ===
      "by clicking the login button, you agree to the terms of the service contract"
  ).translation;
  

    const modifiedFooterTextEn = footerText.replace(
      "terms of the service contract",
      `<span class="mx-1 text-[14px] font-azarMehr text-[#008BF8] cursor-pointer font-medium"> terms of the service contract</span>`
    );
    const modifiedFooterTextFa = footerText.replace(
      "شرایط قرارداد خدمات",
      `<span class="mx-1 text-[14px] font-azarMehr text-[#008BF8] cursor-pointer font-medium">شرایط خدمات قرارداد</span>`
    );


 const handleCheckboxChange = (e:any) => {
   setRememberMe(e.target.checked);
 };

  const handleFormSubmit = (values: any) => {
    if(values){
     
      setDataLogin(values)
      setShowCaptcha(true);
    }
  };

  const getEmailValue =(e:any)=>{
  
  }

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
                  placeholder={
                    data.data.loginPageLang.find(
                      (item: any) => item.name === "enter username or email"
                    ).translation
                  }
                  autoComplete="off"
                  className={cssAuth(props, "email  ")}
                  onChange={(e: any) => {
                    getEmailValue(e.target.value);
                    props.handleChange(e);
                  }}
                />
                <ErrorMessageComponent fieldName="email" lang={lang} />
                {showErrorLoginAccess !== "" ? (
                  <span className="text-error font-azarMehr font-medium text-[10px] bg-error mt-2">
                    {showErrorLoginAccess}
                  </span>
                ) : null}
              </div>

              <div className="form-group">
                <div className=" form-group flex flex-col items-center relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={
                      data.data.loginPageLang.find(
                        (item: any) => item.name === "enter your password"
                      ).translation
                    }
                    className={`${cssAuth(props, "password")}`}
                  />

                  <span
                    className={`absolute  end-3  ${
                      props.errors.password ? "top-[25%]" : "top-1/3"
                    }  cursor-pointer`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeShow
                        className={` stroke-[2px] 
                       ${
                         props.errors.password
                           ? "stroke-[#5B5B5B] dark:stroke-[#5B5B5B] "
                           : "stroke-[#4360EC] dark:stroke-[#5B5B5B]"
                       }
                      `}
                      />
                    ) : (
                      <EyeHidden
                        className={`stroke-[2px] h-5 w-5
                       ${
                         props.errors.password
                           ? "stroke-[#5B5B5B] dark:stroke-[#5B5B5B]"
                           : "stroke-[#4360EC] dark:stroke-[#5B5B5B]"
                       }
                      `}
                      />
                    )}
                  </span>
                  <ErrorMessageComponent fieldName="password" lang={lang} />
                </div>

                {showErrorLoginAccess !== "" ? (
                  <span className="text-error font-azarMehr font-medium text-[9px] mt-10">
                    {showErrorLoginAccess}
                  </span>
                ) : null}
              </div>

              <button className="bg-[#D7FBF0] text-[#18C08F] border-[#18C08F] dark:bg-[#004531] mt-2 border-[1px] w-full h-[50px] rounded-[5px] font-azarMehr font-normal">
                {
                  data.data.loginPageLang.find(
                    (item: any) => item.name === "login"
                  ).translation
                }
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
          <p className="text-center mt-2 font-azarMehr text-[#008BF8] text-[14px] font-bold">
            {
              data.data.loginPageLang.find(
                (item: any) => item.name === "forget password"
              ).translation
            }
          </p>
        </div>

        {lang === "en" ? (
          <p className="text-center px-1 pb-6 mt-6 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal">
            <span
              className="text-center px-1 mt-4 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal"
              dangerouslySetInnerHTML={{ __html: modifiedFooterTextEn }}
            ></span>
          </p>
        ) : (
          <>
            <p className="text-center px-1 pb-6 mt-6 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal">
              <span
                className="text-center px-1 mt-4 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal"
                dangerouslySetInnerHTML={{ __html: modifiedFooterTextFa }}
              ></span>
            </p>
          </>
        )}
      </div>
    </>
  );
}
