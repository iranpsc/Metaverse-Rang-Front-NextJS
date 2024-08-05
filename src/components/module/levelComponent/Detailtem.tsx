import { CLoseIcon,Check } from '@/components/svgs'

export default function DetailItem({ title, value, isLink ,sizeBox}: { title: string, value: any, isLink?: boolean ,sizeBox:any}){

    const generateValue = () => {

        if (typeof value == 'boolean' && !value)
            return <CLoseIcon width={14} height={14} className='text-red-500' />
        else if (typeof value == 'boolean' && value)
            return <Check width={14} height={14} className='text-green-500' />
        else if (isLink)
            return <a className='text-dark-active-btn' target='_blank' href={value}>لینک</a>
        else
            return <span className='text-dark-tex-gray text-left text-ellipsis line-clamp-1 overflow-hidden' title={value}>{value}</span>


    }
    return (
        <div className={`flex flex-row gap-2 justify-between p-3  border-b-2 border-[#ECECEC] items-center font-bold ${sizeBox}`}>
            <span className=' text-ellipsis text-[#414040] dark:text-white' title={title}>{title}</span>
            <span className='text-[#868B90] dark:text-[#C4C4C4]'>
            {generateValue()}
            </span>
        </div>
    )
}
