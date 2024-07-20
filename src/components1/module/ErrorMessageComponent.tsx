import React from "react";
import { ErrorMessage } from "formik";

const ErrorMessageComponent = ({
  fieldName,
  lang,
  data,
}: {
  fieldName: string;
  lang: string;
  data: any;
}) => (
  <ErrorMessage name={fieldName}>
    {(msg: string) => {
      let errorMessage = null;

      if (msg === "username is a required field" && fieldName === "username") {
        errorMessage = (
          <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
            {
              data.find(
                (item: any) => item.name === "the user name is limited to hm-"
              ).translation
            }
          </span>
        );
      } else if (msg === "email is a required field" && fieldName === "email") {
        errorMessage = (
          <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
            {
              data.find((item: any) => item.name === "your email is not valid")
                .translation
            }
          </span>
        );
      } else if (msg==="password is a required field"&&fieldName === "password") {
        errorMessage = (
          <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
            {
              data.find((item: any) => item.name === "the password must contain")
                .translation
            }
          </span>
        );
      } else if (msg==="email must be a valid email"&&fieldName === "email") {
        errorMessage = (
          <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
            {
              data.find((item: any) => item.name === "your email is not valid")
                .translation
            }
          </span>
        );
      } else if (fieldName === "password") {
        errorMessage = (
          <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
            {
              data.find(
                (item: any) => item.name === "the password must contain"
              ).translation
            }
          </span>
        );
      } else if (fieldName === "password") {
        errorMessage = (
          <span className="text-error w-full text-start  font-azarMehr font-medium text-[10px] mt-1">
            {
              data.find(
                (item: any) => item.name === "the password must contain"
              ).translation
            }
          </span>
        );
      } else if (msg===`username must match the following: "/^(?!.*hm-)/"` && fieldName === "username") {
        errorMessage = (
          <span className="text-error w-full text-start font-azarMehr font-medium text-[10px] mt-1">
            {
              data.find(
                (item: any) => item.name === "the user name is limited to hm-"
              ).translation
            }
          </span>
        );
      }

      return errorMessage;
    }}
  </ErrorMessage>
);

export default ErrorMessageComponent;
