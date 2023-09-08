import { object, string } from "yup";

export const selectLanguage = (language: string) => {
  switch (language) {
    case "fa":
      return {
        username: "نام کاربری دارای محدودیت hm_ می‌باشد",
        email: "ایمیل وارد شده صحیح نمیباشد",
        placeholderUsername: "نام کاربری",
        placeholderEmail: "ایمیل خود را وارد کنید",
        placeholderPassword: "رمز ورود",
        password:
          "گذرواژه میبایست شامل اعداد,سیمبل و حروف کوچک و بزرگ انگلیسی باشد.",
        required: "این فیلد الزامی است",
        minLength: "رمز عبور باید حداقل ۸ کاراکتر باشد",
      };
    case "en":
    default:
      return {
        username: "The user name is limited to _hm.",
        email: "Your Email is not valid",
        placeholderUsername: "User Name",
        placeholderEmail: "Enter your email",
        placeholderPassword: "Password",
        password:
          "The password must contain numbers,symbols,and English lowercase and uppercase ;etters.",
        required: "This field is required",
        minLength: "Password must be at least 8 characters long",
      };
  }
};

export const LoginSchema = (language: string) => {
  const languagePack = selectLanguage(language);

  return object().shape({
    email: string().email(languagePack.email).required(languagePack.required),

    password: string()
      .min(8, languagePack.minLength)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
        languagePack.password
      )
      .required(languagePack.required),
  });
};


export const RegisterSchema = (language: string) => {
  const languagePack = selectLanguage(language);

  return object().shape({
    username: string()
      .matches(/^(?!.*hm-)/, languagePack.username)
      .required(languagePack.required),

    email: string().email(languagePack.email).required(languagePack.required),

    password: string()
      .min(8, languagePack.minLength)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
        languagePack.password
      )
      .required(languagePack.required),
  });
};
