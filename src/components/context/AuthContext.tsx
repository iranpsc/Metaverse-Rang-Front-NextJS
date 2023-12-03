import { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";

enum ModalNames {
  ActiveEmailPage = "ActiveEmailPage",
  IpPage = "IpPage",
  CheckIp = "CheckIp",
  AuthPage = "AuthPage",
  none="none"
}

interface AuthContextType {
  modalName: {
    name: string;
    data: string | null;
  };

  codeUser: string;
  token: string;
  setCodeUser: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setModalName: React.Dispatch<
    React.SetStateAction<{ name: string; data: string | null }>
  >;
}

const initialValue: AuthContextType = {
  modalName: {
    name: ModalNames.AuthPage,
    data: "ehsnmkz@outlook.com",
  },

  token: "",
  codeUser: "",
  setToken: () => {},
  setCodeUser: () => {},
  setModalName: () => {},
};
interface Props {
  children: ReactNode;
}
export const AuthContext = createContext(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [modalName, setModalName] = useState<{
    name: string;
    data: string | null;
  }>(initialValue.modalName);

  const [codeUser,setCodeUser]  =useState<string>('');
   const [token, setToken] = useState<string>("");

 

  return (
    <AuthContext.Provider
      value={{ modalName, setModalName, codeUser,token,setToken, setCodeUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
