import { CLoseIcon,Check } from '@/components/svgs'

export default function DetailItem({ title, value, isLink,showCheck=false ,fullBox}: { title: string, value: any, isLink?: boolean,showCheck?:Boolean ,fullBox?:boolean}){

    const generateValue = () => {

        if ( (showCheck== true && value == 0))
            return <CLoseIcon width={14} height={14} className="stroke-red-500" />
        else if (showCheck == true && value == 1 && value)
            return <Check width={14} height={14} className='text-green-500' />
        else if (isLink)
            return <a className='text-dark-active-btn text-[#868B90] dark:text-[#C4C4C4] font-[700]' target='_blank' href={value}>لینک</a>
        else
            return <span className='text-[#868B90] dark:text-[#C4C4C4] font-[700] text-ellipsis line-clamp-1 overflow-hidden' title={value}>{value}</span>


    }
    return (
        <div className={`flex flex-row gap-2 justify-between p-3  border-b-2 border-[#ECECEC] dark:border-[#1A1A18] items-center font-bold w-full text-sm lg:text-lg 2xl:text-xl ${fullBox ? "w-full" : "sm:w-[48%]" }`}>
            <span className=' text-ellipsis text-[#414040] dark:text-white font-[700]' title={title}>{title}</span>
            {generateValue()}
        </div>
    )
}
