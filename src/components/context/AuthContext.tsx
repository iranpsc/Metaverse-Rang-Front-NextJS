import { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";

enum ModalNames {
  ActiveEmailPage = "ActiveEmailPage",
  IpPage = "IpPage",
  CheckIp = "CheckIp",
  AuthPage = "AuthPage",
}

interface AuthContextType {
  modalName: {
    name: string;
    data: string | null;
  };
  myIp:string;
  setModalName: React.Dispatch<
    React.SetStateAction<{ name: string; data: string | null }>
  >;
}

const initialValue: AuthContextType = {
  modalName: {
    name: ModalNames.ActiveEmailPage,
    data: "ehsnmkz@gmail.com",
  },
  myIp: "",
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

    useEffect(()=>{
      const fetch_Api  = async()=>{
             try {
            const ip = await axios.get(
              "https://geo.ipify.org/api/v2/country?apiKey=at_ylwpKg0GexN3hVvFvFBKFYBoMgaMa"
            );
            setMyIp(ip.data.ip);
          } catch (error) {
            console.log(error)
          }
        }
  
        fetch_Api();

    },[])


  return (
    <AuthContext.Provider value={{ modalName, setModalName, myIp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
