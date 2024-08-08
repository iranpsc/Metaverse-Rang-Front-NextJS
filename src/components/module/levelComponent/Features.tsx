import Image from 'next/image'
import { targetData } from "@/components/utils/targetDataName";
import { Development, Income, Orders, Update } from '@/components/svgs';


export const Features = ({levelsTranslatePage}:any) => {
    return (
        <div className='flex flex-col lg:flex-row justify-between dark:text-white'>
            <div className='flex flex-col items-center p-3'>
                <div className='mb-[-65px] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]  box-content  p-4 text-center dark:bg-darkGray_1 rounded-full z-[1]'>
                    <Income className="w-full h-full"/>
                </div>
                <div className='pt-[65px] flex flex-col  justify-center items-center bg-[#080807] hover:pb-12 hover:pt-72 border border-black hover:border-yellow-500 hover:shadow-card'>
                    <span className='text-2xl font-bold'>{targetData(levelsTranslatePage,'income')}</span>
                    <p className='text-center text-xl lg:h-20'>{targetData(levelsTranslatePage,'a list of earned income by titles and clients')}</p>
                </div>
            </div>
          
            <div className='flex flex-col items-center p-3'>
                 <div className='mb-[-65px] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]  box-content  p-4 text-center dark:bg-darkGray_1 rounded-full z-[1]'>
                   <Orders className="w-full h-full"/>
                </div>
                <div className='pt-[65px] flex flex-col  justify-center items-center bg-[#080807] hover:pb-12 hover:pt-72 border border-black hover:border-yellow-500 hover:shadow-card'>
                    <span className='text-2xl font-bold'>{targetData(levelsTranslatePage,'orders')}</span>
                    <p className='text-center text-xl lg:h-20'>{targetData(levelsTranslatePage,'a list of registered orders with the ability to be attracted by correspondent level holders')}</p>
                </div>
            </div>
            <div className='flex flex-col items-center p-3'>
                <div className='mb-[-65px] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]  box-content  p-4 text-center dark:bg-darkGray_1 rounded-full z-[1]'>
                    <Development className="w-full h-full"/>
                </div>
                <div className='pt-[65px] flex flex-col  justify-center items-center bg-[#080807] hover:pb-12 hover:pt-72 border border-black hover:border-yellow-500 hover:shadow-card'>
                    <span className='text-2xl font-bold'>{targetData(levelsTranslatePage,'development')}</span>
                    <p className='text-center text-xl lg:h-20'>{targetData(levelsTranslatePage,"recording citizens' criticisms and suggestions regarding performance and capabilities")}</p>
                </div>
            </div>
            <div className='flex flex-col items-center p-3'>
                <div className='mb-[-65px] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]  box-content  p-4 text-center dark:bg-darkGray_1 rounded-full z-[1]'>
                    <Update className="w-full h-full"/>
                </div>
                <div className='pt-[65px] flex flex-col  justify-center items-center bg-[#080807] hover:pb-12  border border-black hover:border-yellow-500 hover:shadow-card'>
                    <span className='text-2xl font-bold'>{targetData(levelsTranslatePage,'update')}</span>
                    <p className='text-center text-xl lg:h-20'>{targetData(levelsTranslatePage,"decisions made to improve reporter level performance")}</p>
                </div>
            </div>
        </div>
    )
}
