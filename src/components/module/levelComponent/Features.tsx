import Image from 'next/image'
import { targetData } from "@/components/utils/targetDataName";
import { Development, Income, Orders, Update } from '@/components/svgs';


export const Features = ({levelsTranslatePage}:any) => {
    return (
        <div className='pt-8 flex flex-col flex-wrap lg:flex-nowrap sm:flex-row justify-between dark:text-white'>
            <div className='flex flex-col items-center py-3 px-2 w-full sm:w-1/2  lg:w-1/4 2xl:w-[340px] 3xl:w-[380px]'>
                <div className='mb-[-65px] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]  box-content  p-4 text-center dark:bg-darkGray_1 rounded-full z-[1]'>
                    <Income className="w-full h-full"/>
                </div>
                <div className='w-full rounded-[20px] p-3 pt-[65px] h-[195px]  flex flex-col  justify-center items-center bg-[#080807] hover:h-[210px] hover:shadow-[2px_2px_20.7px-0_rgba(f,f,f,0.3)] border border-black hover:border-yellow-500 hover:shadow-[2px_2px_20.7px-0_rgba(f,f,f,0.3)]'>
                    <span className='text-xl xl:text-2xl font-bold py-2'>{targetData(levelsTranslatePage,'income')}</span>
                    <p className='text-center text-base 2xl:text-xl font-[400]'>{targetData(levelsTranslatePage,'a list of earned income by titles and clients')}</p>
                </div>
            </div>
          
            <div className='flex flex-col items-center py-3 px-2 w-full sm:w-1/2  lg:w-1/4 xl:w-[300px] 2xl:w-[340px] 3xl:w-[380px]'>
                 <div className='mb-[-65px] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]  box-content  p-4 text-center dark:bg-darkGray_1 rounded-full z-[1]'>
                   <Orders className="w-full h-full"/>
                </div>
                <div className='w-full rounded-[20px] p-3 pt-[65px] h-[195px]  flex flex-col  justify-center items-center bg-[#080807] hover:h-[210px]  hover:shadow-[2px_2px_20.7px-0_rgba(f,f,f,0.3)] border border-black hover:border-yellow-500 hover:shadow-[2px_2px_20.7px-0_rgba(f,f,f,0.3)]'>
                    <span className='text-xl xl:text-2xl font-bold py-2'>{targetData(levelsTranslatePage,'orders')}</span>
                    <p className='text-center text-base 2xl:text-xl font-[400]'>{targetData(levelsTranslatePage,'a list of registered orders with the ability to be attracted by correspondent level holders')}</p>
                </div>
            </div>
            <div className='flex flex-col items-center py-3 px-2 w-full sm:w-1/2  lg:w-1/4 xl:w-[300px] 2xl:w-[340px] 3xl:w-[380px]'>
                <div className='mb-[-65px] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]  box-content  p-4 text-center dark:bg-darkGray_1 rounded-full z-[1]'>
                    <Development className="w-full h-full"/>
                </div>
                <div className='w-full rounded-[20px] p-3 pt-[65px] h-[195px]  flex flex-col  justify-center items-center bg-[#080807] hover:h-[210px]  hover:shadow-[2px_2px_20.7px-0_rgba(f,f,f,0.3)] border border-black hover:border-yellow-500 hover:shadow-[2px_2px_20.7px-0_rgba(f,f,f,0.3)]'>
                    <span className='text-xl xl:text-2xl font-bold py-2'>{targetData(levelsTranslatePage,'development')}</span>
                    <p className='text-center text-base 2xl:text-xl font-[400]'>{targetData(levelsTranslatePage,"recording citizens' criticisms and suggestions regarding performance and capabilities")}</p>
                </div>
            </div>
            <div className='flex flex-col items-center py-3 px-2 w-full sm:w-1/2  lg:w-1/4 xl:w-[300px] 2xl:w-[340px] 3xl:w-[380px]'>
                <div className='mb-[-65px] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]  box-content  p-4 text-center dark:bg-darkGray_1 rounded-full z-[1]'>
                    <Update className="w-full h-full"/>
                </div>
                <div className='w-full rounded-[20px] p-3 pt-[65px] h-[195px]  flex flex-col  justify-center items-center bg-[#080807] hover:h-[210px]  hover:shadow-[2px_2px_20.7px-0_rgba(f,f,f,0.3)]  border border-black hover:border-yellow-500 hover:shadow-[2px_2px_20.7px-0_rgba(f,f,f,0.3)]'>
                    <span className='text-xl xl:text-2xl font-bold py-2'>{targetData(levelsTranslatePage,'update')}</span>
                    <p className='text-center text-base 2xl:text-xl font-[400]'>{targetData(levelsTranslatePage,"decisions made to improve reporter level performance")}</p>
                </div>
            </div>
        </div>
    )
}
