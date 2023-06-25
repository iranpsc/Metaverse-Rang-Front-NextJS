import { useState } from 'react'
import Image from "next/image";
import Lock from "../../../../../public/png/citizen/lock.png"

function PhotoGalleryMobile() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const handleImageClick = () => {
    setIsImageExpanded(true)
  };
  return (
    <div className="flex w-[80%] mr-[50px] mt-[15px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${activeSlide === index ? 'active' : ''} flex justify-center mx-auto`}
          onClick={() => setActiveSlide(index)}
        >
          {(index < 2 && slide && slide.imageFromApi)  ? (
            <Image 
              onClick={() => handleImageClick()}
              src={slide.imageFromApi}
              height="50"
              width="50"
              alt="gallery"
              className={`rounded-full ${(isImageExpanded == true && activeSlide == index) ? ' w-[59px] h-[59px] ring ring-[2px] ring-white mb-[15px]' : ' w-[49px] h-[49px]'}`}
              /> 
          ) :
          (
            <Image
              onClick={() => handleImageClick()}
              src={Lock}
              height="50"
              width="50"
              alt="gallery"
              className={`rounded-full ${(isImageExpanded == true && activeSlide == index) ? ' w-[59px] h-[59px] ing ring-[2px] ring-white mb-[15px]' : ' w-[49px] h-[49px]'}`}
            />
          )}  
        </div>
      ))}
    </div>  
  )
}

const slides = [
  {
    imageFromApi: '/png/citizen/lock.png' 
  }, 
  {
    imageFromApi: '/png/citizen/lock.png'   
  },  
  { id: 3 },
  { id: 4 },
  { id: 5 },   
  { id: 6 },     
]

export default PhotoGalleryMobile