import { object, string } from "yup";



export const LoginSchema = () => {
  
  return object().shape({
    email: string().email().required(),

    password: string()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/
      )
      .required(),
  });
};


export const RegisterSchema = () => {

  return object().shape({
    username: string()
      .matches(/^(?!.*hm-)/)
      .required("xx"),

    email: string().email().required(),

    password: string()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/)
      .required(),
  });
};


export const ForgetPasswordSchema = () => {

  return object().shape({
    email: string().email().required(),

  });
};

