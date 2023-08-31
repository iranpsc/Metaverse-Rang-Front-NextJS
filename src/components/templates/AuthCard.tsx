import {useState} from 'react'
//Modules
import LoginModule from '../module/LoginModule';
import RegisterModule from '../module/RegisterModule';
import ButtonsAuthModule from '../module/ButtonsAuthModule';






export default function AuthCard() {

  const [showModule,setShowModule] = useState<string>("login");

 



  return (
    <div className="  w-[100%] m-1 h-full ">
      <div className="  flex flex-row justify-evenly items-center gap-4 mt-3">
        <ButtonsAuthModule
          showModule={showModule}
          setShowModule={setShowModule}
        />
      </div>

      {showModule === "login" && <LoginModule />}
      {showModule === "register" && <RegisterModule />}
    </div>
  );
}
