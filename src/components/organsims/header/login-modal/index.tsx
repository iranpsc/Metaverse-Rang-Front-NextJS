import React, {useState} from 'react';
import Modal from 'react-modal';
import report from '../../../../../public/png/common/Report.png'
import exit from '../../../../../public/png/common/Exit.png'
import help from '../../../../../public/png/common/Help.png'
import { Video } from "@/types/api/index";
import LoginForm from "./login"
import RegisterForm from "./register"
import ForgotForm from "./forgot"
import TrainModal from "./train"
import Image from 'next/image'

export interface LoginModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function LoginModal({ modalOpen, setModalOpen }: LoginModalProps) {
  const [trainModalOpen, setTrainModalOpen] = useState(false);
  const [step, setStep] = useState<string>('login')
  function closeModal() {
   setModalOpen(false);
  }
  const handleButtonClick = (newState: string) => {
    setStep(newState);
  }
  function openTrainModal() {
    setTrainModalOpen(true);
  }
  return (
    <>
    <TrainModal trainModalOpen={trainModalOpen} setTrainModalOpen={setTrainModalOpen} />    
    <Modal style={{ overlay: {zIndex: 50},}} className={`flex-col p-[10px] shadow-md fixed inset-0 flex items-center justify-center rounded-t-[32px] border border-[1px] border-[#707070] bg-white max-h-[90%] md:max-h-[98%] mt-auto mb-auto w-[80%] mr-auto ml-auto md:w-[600px] ${step=='forgot' ? 'md:h-[525px]' : 'md:h-[620px]'}  rounded-b-md`} isOpen={modalOpen} onRequestClose={closeModal}>
      <div style={{position:'absolute'}} className='flex flex-col top-[15px] z-50 mx-[15px] justify-center grid grid-cols-7 border-[1px] border-gray-light rounded-t-[20px] shadow-md shadow-gray'>
        <div className='col-span-1 p-[10px]'>
            <button>
            <Image
                onClick={() =>{setModalOpen(false); setStep('login')}}
                src={exit}
                alt="exit"
                height={100}
                width={100}
                className='shadow-md shadow-gray rounded-[18px] bg-gray-lighter'
            />
            </button>
        </div>
        <div className='col-span-4 p-[10px]'>
            <div className='flex items-center justify-center text-gray w-full h-full items-center border border-[1px] border-red-400 shadow-red shadow-inner'>
                {step =='login' && <p className='text-[24px]'>ورود</p>}
                {step =='register' && <p className='text-[24px]'>ثبت نام</p>}
                {step =='forgot' && <p className='text-[24px]'>فراموشی کلمه عبور</p>}
            </div>
        </div>
        <div className='col-span-1 p-[10px]'>
            <Image
                src={report}
                alt="report"
                height={100}
                width={100}
                className='shadow-md shadow-gray rounded-[18px] bg-gray-lighter'
            />
        </div>
        <div className='col-span-1 p-[10px]'>
            <Image
                onClick={openTrainModal}
                src={help}
                alt="help"
                height={100}
                width={100}
                className='shadow-md shadow-gray rounded-[18px] bg-gray-lighter'
            />
        </div>
      </div>
      {step=="login" && <LoginForm onClick={handleButtonClick}/>}
      {step=="register" && <RegisterForm onClick={handleButtonClick}/>}
      {step=="forgot" && <ForgotForm onClick={handleButtonClick}/>}
    </Modal>
    </>
  );
}