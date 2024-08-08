"use client"
import Image from "next/image";
import { useState } from "react";


export default function ImageBox({item}:any){

    const srcPng = item?.png_file ? item?.png_file :""
    const srcFbx = item?.fbx_file ? item?.fbx_file :""
    const srcGif = item?.gif_file ? item?.gif_file :""
    const [mode, setMode] = useState('png');
    console.log('gif_file',item.gif_file);

  const changeMode=(event:any)=>{
    setMode(event)
    
}
console.log('mode',mode);
    return(
    <>
    <div className="w-full flex flex-col flex-wrap">
    <div className="w-full">
         
         {
             mode =='png' ?
         <Image
                   src={srcPng}
                   alt='png'
                   width={100}
                   height={1000}
                   className=" w-full"
                 />:""
         }
          
          {
              mode =='gif' ?
                   <Image
                   src={srcGif}
                   alt="gif"
                   width={100}
                   height={1000}
                   className=" w-full"
                 />:""
          }
         </div>
         <div className="w-full flex flex-wrap justify-around">
         {
             srcPng  &&
             <button
             className={
                `px-5 py-2 mb-2 rounded font-[700] ${mode =='png' ?
                 'dark:bg-dark-yellow dark:text-darkGray bg-light-primary text-white' 
                 :'dark:bg-darkGray bg-light-newColors-otherColors-themeBtn text-light-newColors-otherColors-themeBtn'}`}
             onClick={() => changeMode('png')}
                >
                 PNG
            </button>
         }
       
       {
             srcFbx &&
             <button
             className={
                `px-5 py-2 mb-2 rounded font-[700] ${mode =='fbx' ?
                'dark:bg-dark-yellow dark:text-darkGray bg-light-primary text-white' 
                :'dark:bg-darkGray bg-light-newColors-otherColors-themeBtn text-light-newColors-otherColors-themeBtn'}`}
             onClick={() => changeMode('fbx')}
                >
                 FBX
            </button>
         }
         {
             srcGif &&
             <button
             className={`  
                px-5 py-2 mb-2 rounded font-[700] ${mode =='gif' ? 
                'dark:bg-dark-yellow dark:text-darkGray bg-light-primary text-white' 
                :'dark:bg-darkGray bg-light-newColors-otherColors-themeBtn text-light-newColors-otherColors-themeBtn'}`}
             onClick={() => changeMode('gif')}
                >
                 GIF
            </button>
         }
         </div>
    </div>
    

    </>)
}