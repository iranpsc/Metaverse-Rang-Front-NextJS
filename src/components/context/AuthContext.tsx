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
  myIp: string;
  codeUser: string;
  setCodeUser: React.Dispatch<
    React.SetStateAction<string>
  >;
  setModalName: React.Dispatch<
    React.SetStateAction<{ name: string; data: string | null }>
  >;
}

const initialValue: AuthContextType = {
  modalName: {
    name: ModalNames.AuthPage,
    data: "ehsnmkz@outlook.com",
  },
  myIp: "",
  codeUser:"",
  setCodeUser:()=>{},
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
  const [myIp,setMyIp]  =useState('');
  const [codeUser,setCodeUser]  =useState<string>('');

    useEffect(()=>{
      const fetch_Api  = async()=>{
             try {
            const ip = await axios.get("https://api.rgb.irpsc.com/api/ip");
            setMyIp(ip.data.ip);
                  
          } catch (error) {
          
          }
        }
  
        fetch_Api();

    },[])


  return (
    <AuthContext.Provider
      value={{ modalName, setModalName, myIp, codeUser, setCodeUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
