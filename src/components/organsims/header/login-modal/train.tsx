import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import minimize from "../../../../../public/png/common/Minimize.png";
import exit from "../../../../../public/png/common/Exit.png";
import back from "../../../../../public/png/common/Back.png";
import { Video } from "@/types/api/index";
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index";
import Image from "next/image";
import axios from 'axios';
import { AnyCnameRecord } from "dns";
import styles from '@/styles/Home.module.css'


export interface TrainModalProps {
  trainModalOpen: boolean;
  setTrainModalOpen: (open: boolean) => void;
}

export default function TrainModal({
  trainModalOpen,
  setTrainModalOpen,
}: TrainModalProps) {
  const [step, setStep] = useState<string>("login");
  const [response, setResponse] = useState<any>();
  function closeModal() {
    setTrainModalOpen(false);
  }
  const handleButtonClick = (newState: string) => {
    setStep(newState);
  };

  function getVideo() {
    var data = new FormData();
    data.append("url", "tutorials/login");
    var config = {
      method: "post",
      url: "https://api.rgb.irpsc.com/api/video-tutorials",
      headers: {
        Accept: "application/json",
      },
      data: data,
    };

      axios(config)
        .then(function (response: any) {
          setResponse(response.data.data);
        })
        .catch(function (error: any) {
          console.log(error);
        });
  }
  useEffect(() => {
    getVideo()
  }, []);
  return (
    <Modal
      style={{ overlay: { zIndex: 100 } }}
      className="flex-col p-[10px] shadow-md fixed inset-0 flex items-center justify-center rounded-t-[32px] border border-[1px] border-[#707070] bg-white mt-[15%] md:mt-auto md:mb-auto w-[40%] mr-auto ml-auto md:w-[300px] h-[80%] mt-auto mb-auto"
      isOpen={trainModalOpen}
      onRequestClose={closeModal}
    >
            {response && (
              <>
      <div
        style={{ position: "absolute" }}
        className="flex flex-col top-[15px] z-50 mx-[15px] justify-center grid grid-cols-7 border-[1px] border-gray-light rounded-t-[20px] shadow-md shadow-gray"
      >
        <div className="col-span-1 p-[3px] my-auto">
          <button>
            <Image
              onClick={() => {
                setTrainModalOpen(false);
                setStep("login");
              }}
              src={exit}
              alt="exit"
              height={100}
              width={100}
              className="shadow-md shadow-gray rounded-[18px] bg-gray-lighter"
            />
          </button>
        </div>
        <div className="col-span-1 p-[3px] my-[2px]">
          <Image
            src={minimize}
            alt="minimize"
            height={100}
            width={100}
            className="shadow-md shadow-gray rounded-[18px] bg-gray-lighter"
          />
        </div>
        <div className="col-span-4 p-[10px]">
          <div className="flex items-center justify-start text-gray w-full h-full items-center border border-[1px] border-red-400 shadow-red shadow-inner">
            <p className="text-[18px] mr-[5px]">آموزش</p>
          </div>
        </div>
        <div className="col-span-1 p-[3px] my-[2px] mx-atuo">
          <Image
            src={back}
            alt="back"
            height={100}
            width={100}
            className="shadow-md shadow-gray rounded-[18px] bg-gray-lighter"
          />
        </div>
      </div>
      <video src={response?.video} controls className="mt-[65px]"/>
      <h2 className="flex justify-center text-[16px] text-gray">{response?.title}</h2>
      <p
        className={`text-[12px] text-gray-light flex justify-star max-w-[100%] overflow-y-scroll max-h-[220px] ${styles.container}`}
        dangerouslySetInnerHTML={{ __html: `${response.description.replace(/<p>/g, '<br class="${styles.brHeight}">').replace(/<\/p>/g, '')}` }}
      />
      </>
      )}
      </Modal>
  );
}