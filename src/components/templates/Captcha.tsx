import React, { useState, useRef, useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Captcha({
  position,
  data,
  setShowCaptcha,
  seShowErrorLoginAccess,
}: any) {
  const { theme } = useTheme();
  const {setModalName } = useContext(AuthContext);

  //localStorage.setItem(" ", response.data.token);

  const captchaRef = useRef<ReCAPTCHA>(null);

  function onChange(value: any) {
    if (value) {
      if (position === "Login") {
        loginUser();
      }
      if (position === "Register") {
        RegisterUser();
      }
    }
  }

  const loginUser = async () => {
    try {
      const requestData = {
        email: data.email,
        password: data.password,
      };
      const response = await axios.post(
        "https://api.rgb.irpsc.com/api/login",
        requestData
      );
      if (response.data) {
        seShowErrorLoginAccess("");
        
        setShowCaptcha(false);
      }
    } catch (err: any) {
      setShowCaptcha(false);
      seShowErrorLoginAccess(err.response.data.message);
 
    }
  };

  const RegisterUser = async () => {
    try {
      const requestData = {
        name: data.username,
        email: data.email,
        password: data.password,
      };
      const response = await axios.post(
        "https://api.rgb.irpsc.com/api/register",
        requestData
      );
          setModalName({name:"ActiveEmailPage",data:requestData.email})
      if (response.data) {
  
        setShowCaptcha(false);
      }
    } catch (err: any) {
      setShowCaptcha(false);
     
    }
  };

  return (
    <div className=" h-[100%] w-[100%] flex flex-col justify-center items-center">
      <div className="rounded-[10px] bg-white dark:bg-[#272727]">
        <p className="py-5 text-center font-azarMeh text-[14px] font-bold dark:text-white text-[#00000073]">
          لطفا بررسی کنید که ربات نیستید
        </p>
        <ReCAPTCHA
          sitekey="6LdhteYnAAAAAAyAGd2zI0BZrSNgqWnkbSJVnsxZ"
          ref={captchaRef}
          onChange={onChange}
          theme={`${theme === "dark" ? "dark" : "light"}`}
          className="px-2 pb-3 "
        />
      </div>
    </div>
  );
}
