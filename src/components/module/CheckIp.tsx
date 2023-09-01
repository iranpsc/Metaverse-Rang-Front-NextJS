import { useContext,useState } from "react";
import * as Yup from "yup";
//COMPONENTS
import { LangContext } from "@/components/context/LangContext";
//UTILE
import { selectLanguageAuthModule } from "@/components/utils/textsLanguage";

export default function CheckIp() {
    const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const { languageSelected } = useContext(LangContext);
  const lang = languageSelected.code;

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
       validateEmail(newEmail);
      };

    const handleSubmit = async () => {
      await validateEmail();
      
    };

  return (
    <div className=" w-[70%] h-[65%] ">
      <h1 className="text-center font-azarMehr font-extrabold text-[25px] text-[#18C08F]">
        {selectLanguageAuthModule(lang).checkTextTitle}
      </h1>
      <p className="mt-2 text-center font-azarMehr font-medium text-[14px] text-[#0000005C] dark:text-white">
        {selectLanguageAuthModule(lang).checkTextTime}
      </p>
      <p className="mt-8 text-center px-4 font-azarMehr font-bold text-[14px] text-[#000000A1] dark:text-[#969696]">
        {selectLanguageAuthModule(lang).checkTextDetails}
      </p>
      <div>
        <input
          type="email"
          placeholder={selectLanguageAuthModule(lang).checkTextInput}
          className={`mt-5 w-full h-[50px] outline-none border-[1px] ${error ? "border-error":"border-[#DADADA]"} border-[#DADADA] px-2`}
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
        {selectLanguageAuthModule(lang).checkTextButton}
      </button>
    </div>
  );
}
