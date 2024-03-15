import { createContext, ReactNode, useState } from "react";

enum ModalNames {
  ActiveEmailPage = "ActiveEmailPage",
  IpPage = "IpPage",
  CheckIp = "CheckIp",
  AuthPage = "AuthPage",
  none = "none",
}

interface AuthContextType {
  modalName: {
    name: string;
    data: string | null;
  };

  codeUser: string;
  token: string;
  showAuthCard: boolean;
  setCodeUser: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setShowAuthCard: React.Dispatch<React.SetStateAction<boolean>>;
  setModalName: React.Dispatch<
    React.SetStateAction<{ name: string; data: string | null }>
  >;
  toggleShowAuthCard: () => void;
}

const initialValue: AuthContextType = {
  modalName: {
    name: ModalNames.AuthPage,
    data: "ehsanmarkazi73@gmail.com.com",
  },

  token: "",
  codeUser: "",
  showAuthCard: false,
  setToken: () => {},
  setCodeUser: () => {},
  setModalName: () => {},
  toggleShowAuthCard: () => null,
  setShowAuthCard: () => null,
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

  const [codeUser, setCodeUser] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [showAuthCard, setShowAuthCard] = useState<boolean>(false);

  const toggleShowAuthCard = () => {
    setShowAuthCard(!showAuthCard);
  };

  return (
    <AuthContext.Provider
      value={{
        modalName,
        setModalName,
        codeUser,
        token,
        setToken,
        setCodeUser,
        showAuthCard,
        setShowAuthCard,
        toggleShowAuthCard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
