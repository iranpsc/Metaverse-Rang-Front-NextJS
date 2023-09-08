import React from "react";
import { ErrorMessage } from "formik";
import { selectLanguage } from "../utils/validationAuth";




const ErrorMessageComponent = ({ fieldName,lang }: { fieldName: string,lang:string }) => (
  
  <ErrorMessage name={fieldName}>

    
    {(msg: string) => {
      let errorMessage = null;

      console.log(msg)
   
      if (msg === selectLanguage(lang).required && fieldName==="username") {
        errorMessage = (
          <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
            {selectLanguage(lang).required}
          </span>
        );
      } else if (msg === selectLanguage(lang).required && fieldName==="email") {
        errorMessage = (
          <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
            {selectLanguage(lang).required}
          </span>
        );
      }else if (msg === selectLanguage(lang).required && fieldName === "password") {
         errorMessage = (
           <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
             {selectLanguage(lang).required}
           </span>
         );
      } else if (msg === selectLanguage(lang).email && fieldName === "email") {
        errorMessage = (
          <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
            {selectLanguage(lang).email}
          </span>
        );
      } else if (
        msg === selectLanguage(lang).password &&
        fieldName === "password"
      ) {
        errorMessage = (
          <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
            {selectLanguage(lang).password}
          </span>
        );
      } else if (
        msg === selectLanguage(lang).minLength &&
        fieldName === "password"
      ) {
        errorMessage = (
          <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
            {selectLanguage(lang).minLength}
          </span>
        );
      } else if (
        msg === selectLanguage(lang).username &&
        fieldName === "username"
      ) {
        errorMessage = (
          <span className="text-error w-full text-start font-azarMehr font-medium text-[10px] mt-1">
            {selectLanguage(lang).username}
          </span>
        );
      }

      return errorMessage;
    }}
  </ErrorMessage>
);

export default ErrorMessageComponent;
