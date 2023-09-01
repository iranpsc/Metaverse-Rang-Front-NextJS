
export const textMailBeFa="یک ایمیل به آدرس"
export const textMailAfFa="ارسال شده است."
export const textActiveMailFa ="جهت تایید و فعال سازس حساب خود,بر روی لینک موجود در ایمیل کلیک کنید"
export const textResendFa="ارسال مجدد ایمیل تایید حساب شهروندی"

export const textMailBeEn="An Email Address"
export const textMailAfEn = "Sent.";
export const textActiveMailEn= "To confirm and activate your accound,click on the link in the email";
export const textResendEn="Re-send the citizenship accound confirmation email"

export const textButtonFa="مشاهده ایمیل"
export const textButtonEn="view email"

export const selectLanguageAuthModule = (language: string) => {
  switch (language) {

    case "IR":
      return {
        //login
        loginButton: "ورود",
        loginRemeber: "مرا به خاطر بسپار",
        loginForget: "فراموشی رمز عبور",
        loginFooterBe: " با کلیک بر روی دکمه ورود",
        loginFooterAf: "سامانه موافقت میکنید",
        //Register
        registerButton: "ثبت نام",
        //ActiveMail
        ActiveMailTextTitleBe:"یک ایمیل به آدرس",
        ActiveMailTextTitleAf:"ارسال شده است.",
        ActiveMailTextConfirm:"جهت فعال سازی حساب خودو برروی لینک موجود در ایمیل کلیک کنید",
        ActiveMailTextButton:"مشاهده ایمیل",
        ActiveMailResend:"ارسال مجدد ایمیل تایید حساب شهروندی",

        //ip
        ipTextTitle: " آی پی غیر مجاز",
        ipTextP: "IP شما غیر ایرانی شناخته شده است",
        ipTextDateailsBe: "اگر از",
        ipTextDateailsAf:
          "میکنید آن را خاموش کرده سپس صفحه را مجدد بارگذاری کنید در غیر این صورت روی گزینه زیر کلیک کنید",
        ipTextButton: "مجاز سازی IP",
        //checkIp
        checkTextTitle: "بررسی وضعیت IP",
        checkTextTime: "زمان مورد نیاز 24 ساعت",
        checkTextDetails:
          "جهت اطلاع رسانی از شرح اقدامات ایمیل خود را در کادر زیر وارد کنید",
        checkTextInput: "ایمیل خود را وارد کنید",
        checkTextErrorInputInvalid: "آدرس ایمیل معتبر نیست",
        checkTextErrorInputRequired: "آدرس ایمیل اجباری است",
        checkTextButton: "مراخبر کن",
        //footer
        footerBe: "برای کسب اطلاعات بیشتر و پاسخ به سوالات, از",
        footerَAf: "دیدن نمایید.",
      };
    case "EN":
    default:
      return {
        //login
        loginButton: "Login",
        loginRemeber: "Remember Me",
        loginForget: "Forget Password",
        loginFooter:
          "By clicking the login button, you agree to the terms of the",
        //Register
        registerButton: "Register",
              //ActiveMail
        ActiveMailTextTitleBe:"An Email Address",
        ActiveMailTextTitleAf:"Send.",
        ActiveMailTextConfirm:"To confirm and activate your accound,click on the link in the email",
        ActiveMailTextButton:"View Email",
        ActiveMailResend:"Re-send the citizenship accound confirmation email",
        //ip
        ipTextTitle: "Unauthorized IP",
        ipTextP: "Your IP is Known as non-Iranian",
        ipTextDateailsBe: "If you use a",
        ipTextDateailsAf:
          ",turn it off Then reload the page Otherwise,click on the option below",
        ipTextButton: "IP authorization",
        //checkIp
        checkTextTitle: "Check IP Status",
        checkTextTime: "Time required 24 hours",
        checkTextDetails:
          "To inform about the description of actions Enter your email below",
        checkTextInput: "Enter your email",
        checkTextErrorInputInvalid: "Invalid email address",
        checkTextErrorInputRequired: "Email address is required",
        checkTextButton: "let me Know",
        //footer
        footer: "for more information and answers to questions,visit the",
      };
  }
}