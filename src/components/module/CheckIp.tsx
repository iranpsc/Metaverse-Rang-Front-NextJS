import { useContext,useState } from "react";
import * as Yup from "yup";
//COMPONENTS
import { LangContext } from "@/context/LangContext";
//UTILE
import { selectLanguageAuthModule } from "@/utils/textsLanguage";

export default function CheckIp() {
    const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const { languageSelected,data } = useContext(LangContext);
  const lang = languageSelected.code;


  
  const footerText = data.data.checkIpPageLang.find(
    (item: any) => item.name === "visit our website"
  ).translation;
  const modifiedFooterTextFa = footerText.replace(
    "وبسایت",
    `<span class="mx-1 text-[14px] font-azarMehr text-[#008BF8] cursor-pointer font-medium">وبسایت</span>`
  );
  const modifiedFooterTextEn = footerText.replace(
    "website",
    `<span class="mx-1 text-[14px] font-azarMehr text-[#008BF8] cursor-pointer font-medium">website</span>`
  );

    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email(selectLanguageAuthModule(lang).checkTextErrorInputInvalid)
        .required(selectLanguageAuthModule(lang).checkTextErrorInputRequired),
    });

    const validateEmail = async () => {
      try {
        await validationSchema.validate({ email }, { abortEarly: false });
        setError(null);
      } catch (err:any) {
        setError(err.errors.join(" "));
      }
    };

      const handleEmailChange = (e:any) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
       validateEmail();
      };

    const handleSubmit = async () => {
      await validateEmail();
      
    };

  return (
    <div className=" w-[70%] h-[83%] ">
      <h1 className="text-center font-azarMehr font-extrabold text-[25px] text-[#18C08F]">
        {
          data.data.checkIpPageLang.find(
            (item: any) => item.name === "check ip status"
          ).translation
        }
      </h1>
      <p className="mt-2 text-center font-azarMehr font-medium text-[14px] text-[#0000005C] dark:text-white">
        {
          data.data.checkIpPageLang.find(
            (item: any) => item.name === "time required 24 hours"
          ).translation
        }
      </p>
      <p className="mt-8 text-center px-4 font-azarMehr font-bold text-[14px] text-[#000000A1] dark:text-[#969696]">
        {
          data.data.checkIpPageLang.find(
            (item: any) =>
              item.name ===
              "to provide information about the description of your actions, please enter your email below"
          ).translation
        }
      </p>
      <div>
        <input
          type="email"
          placeholder={selectLanguageAuthModule(lang).checkTextInput}
          className={`mt-5 w-full h-[50px] outline-none border-[1px] ${
            error ? "border-error" : "border-[#DADADA]"
          } border-[#DADADA] px-2`}
          value={email}
          onChange={handleEmailChange}
          onBlur={validateEmail}
        />
        {error && (
          <div className="text-error mt-1  font-azarMehr font-bold text-[10px]">
            {error}
          </div>
        )}
      </div>
      <button
        className=" end-0 mt-7 dark:bg-[#18C08F80] bg-[#D7FBF0] text-[#18C08F] border-[#18C08F] border-[1px] w-full h-[50px]  rounded-[5px] font-azarMehr font-normal"
        onClick={handleSubmit}
      >
        {
          data.data.checkIpPageLang.find(
            (item: any) => item.name === "let me know"
          ).translation
        }
      </button>{" "}
      {lang === "en" ? (
        <p className="text-center px-1 mt-4 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal">
          {
            data.data.checkIpPageLang.find(
              (item:any) =>
                item.name ===
                "do you have any questions or would you like to know more?"
            ).translation
          }{" "}
          <span
            className="text-center px-1 mt-4 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal"
            dangerouslySetInnerHTML={{ __html: modifiedFooterTextEn }}
          ></span>
        </p>
      ) : (
        <p className="text-center px-1 mt-4 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal">
          {
            data.data.checkIpPageLang.find(
              (item: any) =>
                item.name ===
                "do you have any questions or would you like to know more?"
            ).translation
          }{" "}
          <span
            className="text-center px-1 mt-4 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal"
            dangerouslySetInnerHTML={{ __html: modifiedFooterTextFa }}
          ></span>
        </p>
      )}
    </div>
  );
}
