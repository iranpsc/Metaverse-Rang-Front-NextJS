
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TokenContextType {
  token: string | null;
  code: string | null;
  setToken: (token: string) => void;
  setTokenData:(token:string,code:string)=>void
  setCode: (code: string) => void;
  checkToken: () => void;
  removeToken: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const TokenProvider: React.FC<Props> = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);

  const setTokenData = (newToken: string, newCode: string) => {
    setToken(newToken);
    setCode(newCode);

    const expire = Date.now() + 60 * 60 * 1000;
   // const expire = Date.now() + 60 * 1000; 

    const tokenData = { token: newToken, code: newCode, expire };
    localStorage.setItem("authToken", JSON.stringify(tokenData));
  };

  const checkToken = () => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);

    if (storedToken) {
      const tokenData = JSON.parse(storedToken);

     
      if (tokenData.expire && tokenData.expire < Date.now()) {
       
        localStorage.removeItem("authToken");

      
        setToken(null);
        setCode(null);
      } else {
        console.log(tokenData);
        setToken(tokenData.token);
        setCode(tokenData.code);
      }
    }
  };

  
  const removeToken = () => {
    
    localStorage.removeItem("authToken");
    setToken(null);
    setCode(null);
  };

  useEffect(() => {
     console.log("start");
    checkToken();
  }, []);

  return (
    <TokenContext.Provider
      value={{
        token,
        setTokenData,
        code,
        setToken,
        setCode,
        checkToken,
        removeToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);

  if (!context) {
    throw new Error("useToken باید داخل TokenProvider استفاده شود");
  }

  return context;
};
