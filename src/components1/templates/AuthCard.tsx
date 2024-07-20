import {useState} from 'react'
//Modules
import LoginModule from '@/module/LoginModule';
import RegisterModule from '@/module/RegisterModule';
import ButtonsAuthModule from '@/module/ButtonsAuthModule';
import ForgetPasswordModule from '../module/ForgetPasswordModule';

export default function AuthCard({ setShowAuthCard}:any) {
  const [showModule,setShowModule] = useState<string>("login");
  return (
    <div className="   m-1  ">
      <div className=" mx-2 flex flex-row justify-evenly items-center gap-4 mt-3">
        {showModule != "forgetPassword" ? (
          <ButtonsAuthModule
            showModule={showModule}
            setShowModule={setShowModule}
          />
        ) : null}
      </div>

      {showModule === "login" && (
        <LoginModule
          setShowModule={setShowModule}
          setShowAuthCard={setShowAuthCard}
        />
      )}
      {showModule === "register" && (
        <RegisterModule setShowAuthCard={setShowAuthCard} />
      )}
      {showModule === "forgetPassword" && (
        <ForgetPasswordModule
          setShowAuthCard={setShowAuthCard}
          setShowModule={setShowModule}
        />
      )}
    </div>
  );
}
