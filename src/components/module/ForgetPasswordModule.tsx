import { useContext, useState } from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
//ERROR
import ErrorMessageComponent from "./ErrorMessageComponent";
//CONTEXT
import { LangContext } from "@/context/LangContext";
//UTILS
import { ForgetPasswordSchema } from "@/utils/validationAuth";
import { cssAuth } from "../utils/taiwindAuth";
import axios from "axios";




export default function ForgetPasswordModule({ setShowModule }: any) {

  const [dataLogin, setDataLogin] = useState([]);
 const [showErrorLoginAccess, seShowErrorLoginAccess] = useState<string>("");
  const { languageSelected, data } = useContext(LangContext);
  const lang = languageSelected.code;


 console.log(data);

  
    const handleFormSubmit = async (values: any) => {
      if (values) {
        try {
          const requestData = {
            email: values.email,
          };
          const response = await axios.post(
            "https://api.rgb.irpsc.com/api/forgot-password",
            requestData
          );
          if (response.data) {
            seShowErrorLoginAccess("");
            console.log(response.data);
          }
        } catch (err: any) {
          console.log(err.response.data.message);
          seShowErrorLoginAccess(err.response.data.message);
        }
      }
    };

  const getEmailValue = (e: any) => {};
  return (
    <>
      <div className=" h-fit pt-7 pb-7 flex flex-col justify-start items-center gap-3">
        <h3 className="dark:text-[#fff] text-[#000] font-normal ">
          رمز عبور خود را فراموش کرده اید؟
        </h3>
        <p className="dark:text-[#969696] text-[12px] mt-[-5px]">
          برای بازیابی آن, لطفا آدرس ایمیل خود را در کادر زیر وارد نمایید.
        </p>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={handleFormSubmit}
          validationSchema={ForgetPasswordSchema(lang)}
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
                  className={cssAuth(props, "email")}
                  onChange={(e: any) => {
                    getEmailValue(e.target.value);
                    props.handleChange(e);
                  }}
                />
                <ErrorMessageComponent fieldName="email" lang={lang} />
                {showErrorLoginAccess !== "" ? (
                  <span className="text-error font-azarMehr font-medium text-[10px] mt-2">
                    {showErrorLoginAccess}
                  </span>
                ) : null}
              </div>

              <button
                type="submit"
                className="bg-[#D7FBF0] text-[#18C08F] border-[#18C08F] dark:bg-[#004531] mt-2 border-[1px] w-full h-[50px] rounded-[5px] font-azarMehr font-normal"
              >
                {/* {
                  data.data.loginPageLang.find(
                    (item: any) => item.name === "login"
                  ).translation
                } */}
                ارسال
              </button>
            </Form>
          )}
        </Formik>
        
          <span className="mt-7 cursor-pointer text-center px-1 w-full text-blueLink dark:text-blueLink font-azarMehr text-[14px] font-normal"
          onClick={()=>setShowModule("login")}
          >
            بازگشت به صفحه ورود
          </span>
       
      </div>
    </>
  );
}
