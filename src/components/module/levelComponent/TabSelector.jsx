"use client"; 

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { findByUniqueId } from "@/components/utils/findByUniqueId";


export default function TabSelector({ params, mainData }) {
    const lang = params.lang;
    const selectedTabRef = useRef(null);

    const ButtonLink = ({ title, link }) => {
        return (
            <Link
                prefetch={false}
                href={`/${lang}/levels/citizen/${params.levelName}/${link}`}
                className={`inline-flex items-center justify-center w-full sm:w-auto ${
                    link === params.tabs ? 'text-blueLink dark:text-dark-yellow border-b-2 border-solid border-t-0 border-x-0  border-dark-active-btn p-3 pb-2.5 font-bold' : 'dark:text-white font-[400] border-b-2 border-transparent p-3 pb-2.5'
                }`}
                ref={link === params.tabs ? selectedTabRef : null}
            >
                {title}
            </Link>
        );
    };

    useEffect(() => {
        if (selectedTabRef.current) {
            selectedTabRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    }, [params.tabs]);

    return (
        <div className="overflow-x-scroll no-scrollbar bg-bgLightGrey dark:bg-darkGray dark:textwhite rounded-[12px] font-[700]">
            <ul className="flex justify-between text-sm font-medium list-none px-5 2xl:px-[40px] 2xl:text-base">
                <li className="me-2 w-100 sm:w-auto whitespace-nowrap">
                    {/* <ButtonLink title={targetData(levelsTranslatePage, "basic level information")} link="general-info" /> */}                    
                    <ButtonLink title={findByUniqueId(mainData,387)} link="general-info" />
                </li>
                <li className="me-2 w-100 sm:w-auto whitespace-nowrap">
                    {/* <ButtonLink title={targetData(levelsTranslatePage, "permissions and access")} link="licenses" /> */}                    
                    <ButtonLink title={findByUniqueId(mainData,388)} link="licenses" />
                </li>
                <li className="me-2 w-100 sm:w-auto whitespace-nowrap">
                    {/* <ButtonLink title={targetData(levelsTranslatePage, "surface gem")} link="gem" /> */}                    
                    <ButtonLink title={findByUniqueId(mainData,389)} link="gem" />
                </li>
                <li className="me-2 w-100 sm:w-auto whitespace-nowrap">
                    {/* <ButtonLink title={targetData(levelsTranslatePage, "accompanying gift")} link="gift" /> */}                    
                    <ButtonLink title={findByUniqueId(mainData,390)} link="gift" />
                </li>
                <li className="me-2 w-100 sm:w-auto whitespace-nowrap">
                    {/* <ButtonLink title={targetData(levelsTranslatePage, "reward for reaching the level")} link="prize" /> */}                    
                    <ButtonLink title={findByUniqueId(mainData,391)} link="prize" />
                </li>
            </ul>
        </div>
    );
}
