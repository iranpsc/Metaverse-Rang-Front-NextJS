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
import { Success } from "../svgs";





export default function ForgetPasswordModule({ setShowAuthCard,setShowModule }: any) {
const [showSuccess,setShowSuccess] = useState(false);
 const [showErrorLoginAccess, seShowErrorLoginAccess] = useState<string>("");
  const { languageSelected, data } = useContext(LangContext);
  const lang = languageSelected.code;



  
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
            changeShowSuccess()
            
            seShowErrorLoginAccess("");
           
          }
        } catch (err: any) {
          console.error(err.response.data.message);
          seShowErrorLoginAccess(err.response.data.message);
        }
      }
    };


    const changeShowSuccess = () => {
      setShowSuccess(true);
      setTimeout(() => {
       
       setShowAuthCard(false)
        setShowSuccess(false);
      }, 2000);
    };

 

  const getEmailValue = (e: any) => {};
  return (
    <>
      {showSuccess ? (
        <>
          <div className=" h-[200px] pb-7 flex flex-col justify-center items-center gap-6">
            <h3 className="dark:text-[#fff] text-[#000] font-normal ">
              {
                data.data.forgetPasswordPageLang.find(
                  (item: any) => item.name === "an email containing"
                ).translation
              }
            </h3>
            <Success className="w-[50px] h-[50px]"/>
          </div>
        </>
      ) : (
        <div className=" h-fit pt-7 pb-7 flex flex-col justify-start items-center gap-3">
          <h3 className="dark:text-[#fff] text-[#000] font-normal ">
            {
              data.data.forgetPasswordPageLang.find(
                (item: any) => item.name === "forgot password"
              ).translation
            }
          </h3>
          <p className="dark:text-[#969696] text-[12px] mt-[-5px]">
            {
              data.data.forgetPasswordPageLang.find(
                (item: any) =>
                  item.name ===
                  "to retrieve it, please enter your email address in the box below"
              ).translation
            }
          </p>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={handleFormSubmit}
            validationSchema={ForgetPasswordSchema()}
          >
            {(props) => (
              <Form className="w-[95%]">
                <div className="form-group flex flex-col items-center pb-2 pt-3 ">
                  <Field
                    type="text"
                    name="email"
                    placeholder={
                      data.data.forgetPasswordPageLang.find(
                        (item: any) => item.name === "example@example.com"
                      ).translation
                    }
                    autoComplete="off"
                    className={cssAuth(props, "email")}
                    onChange={(e: any) => {
                      getEmailValue(e.target.value);
                      props.handleChange(e);
                    }}
                  />
                  <ErrorMessageComponent fieldName="email" lang={lang}                   data={data.data.registerPageLang} />
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
                  {
                    data.data.forgetPasswordPageLang.find(
                      (item: any) => item.name === "send"
                    ).translation
                  }
                </button>
              </Form>
            )}
          </Formik>

          <span
            className="mt-7 cursor-pointer text-center px-1 w-full text-blueLink dark:text-blueLink font-azarMehr text-[14px] font-normal"
            onClick={() => setShowModule("login")}
          >
            {
              data.data.forgetPasswordPageLang.find(
                (item: any) => item.name === "return to the login page"
              ).translation
            }
          </span>
        </div>
      )}
    </>
  );
}
