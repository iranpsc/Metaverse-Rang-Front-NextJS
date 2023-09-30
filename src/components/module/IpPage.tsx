import { useContext } from "react";
//COMPONENTS
import { AuthContext } from "@/context/AuthContext";
import { LangContext } from "@/context/LangContext";
//UTILE
import { selectLanguageAuthModule } from "@/utils/textsLanguage";
import Persian from "persianjs";

export default function IpPage() {
  const { myIp, setModalName } = useContext(AuthContext);
  const { languageSelected, data } = useContext(LangContext);
  const lang = languageSelected.code;

console.log("myIp",myIp);
  const footerText = data.data.checkIpLang.find(
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


  return (
    <div className=" w-[95%] h-[100%] mt-14">
      <h1 className="text-center font-azarMehr font-extrabold text-[25px] text-[#FF3E3E]">
        {
          data.data.checkIpLang.find(
            (item: any) => item.name === "unauthorized ip"
          ).translation
        }
      </h1>
      <h2 className=" mt-4 text-center font-azarMehr font-bold text-[25px] text-[#757575] dark:text-white">
        {/* {languageSelected?.code !== "fa"
          ? myIp
          : Persian(myIp).englishNumber().toString()} */}
      </h2>
      <p className="mt-2 text-center font-azarMehr font-medium text-[14px] text-[#0000005C] dark:text-[#5B5B5B] ">
        {
          data.data.checkIpLang
            .find(
              (item: any) =>
                item.name ===
                "your ip appears to be non-Iranian. If you are using a VPN, please turn it off and then reload the page"
            )
            .translation.split(".")[0]
        }
      </p>

      <p className="mt-10 text-center font-azarMehr font-bold text-[15px] px-1 text-[#000000A1] dark:text-[#969696]">
        {data.data.checkIpLang
          .find(
            (item: any) =>
              item.name ===
              "your ip appears to be non-Iranian. If you are using a VPN, please turn it off and then reload the page"
          )
          .translation.substring(
            data.data.checkIpLang
              .find(
                (item: any) =>
                  item.name ===
                  "your ip appears to be non-Iranian. If you are using a VPN, please turn it off and then reload the page"
              )
              .translation.indexOf(".") + 1,

            data.data.checkIpLang
              .find(
                (item: any) =>
                  item.name ===
                  "your ip appears to be non-Iranian. If you are using a VPN, please turn it off and then reload the page"
              )
              .translation.indexOf("VPN") - 1
          )}
        <span className="text-error font-azarMehr font-bold text-[15px] px-1">
          {" "}
          VPN{" "}
        </span>
        {
          data.data.checkIpLang
            .find(
              (item: any) =>
                item.name ===
                "your ip appears to be non-Iranian. If you are using a VPN, please turn it off and then reload the page"
            )
            .translation.split(" VPN")[1]
        }{" "}
        {
          data.data.checkIpLang.find(
            (item: any) =>
              item.name === "otherwise, please click on the button below"
          ).translation
        }
      </p>
      <button
        className="relative mt-7 dark:bg-[#18C08F80] bg-[#D7FBF0] text-[#18C08F] border-[#18C08F] border-[1px] w-full h-[50px]  rounded-[5px] font-azarMehr font-normal"
        onClick={() => setModalName({ name: "CheckIp", data: myIp })}
      >
        {
          data.data.checkIpLang.find(
            (item: any) => item.name === "authorize ip"
          ).translation
        }
      </button>

      {lang === "en" ? (
        <p className="text-center px-1 mt-4 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal">
          {
            data.data.checkIpLang.find(
              (item: any) =>
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
            data.data.checkIpLang.find(
              (item:any) =>
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
