"use client"; 

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { targetData } from "@/components/utils/targetDataName";

export default function TabSelector({ params, levelsTranslatePage }) {
    const lang = params.lang;
    const selectedTabRef = useRef(null);

    const ButtonLink = ({ title, link }) => {
        return (
            <Link
                prefetch={false}
                href={`/${lang}/levels/citizen/${params.levelName}/${link}`}
                className={`inline-flex items-center justify-center w-full sm:w-auto ${
                    link === params.tabs ? 'text-blueLink dark:text-dark-yellow border-b-2 border-dark-active-btn p-3 pb-2.5 font-bold' : 'dark:text-white font-[400] border-b-2 border-transparent p-3 pb-2.5'
                }`}
                ref={link === params.tabs ? selectedTabRef : null}
            >
                {title}
            </Link>
        );
    };

    useEffect(() => {
        // This ensures that the code inside the if block only runs if the referenced element is available
        if (selectedTabRef.current) {
            selectedTabRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
    }, [params.tabs]);

    return (
        <div className="overflow-x-scroll no-scrollbar bg-bgLightGrey dark:bg-darkGrey dark:textwhite rounded-[12px] font[700]">
            <ul className="flex justify-between text-sm font-medium list-none">
                <li className="me-2 w-100 sm:w-auto whitespace-nowrap">
                    <ButtonLink title={targetData(levelsTranslatePage, "basic level information")} link="general-info" />
                </li>
                <li className="me-2 w-100 sm:w-auto whitespace-nowrap">
                    <ButtonLink title={targetData(levelsTranslatePage, "permissions and access")} link="licenses" />
                </li>
                <li className="me-2 w-100 sm:w-auto whitespace-nowrap">
                    <ButtonLink title={targetData(levelsTranslatePage, "surface gem")} link="gem" />
                </li>
                <li className="me-2 w-100 sm:w-auto whitespace-nowrap">
                    <ButtonLink title={targetData(levelsTranslatePage, "accompanying gift")} link="gift" />
                </li>
                <li className="me-2 w-100 sm:w-auto whitespace-nowrap">
                    <ButtonLink title={targetData(levelsTranslatePage, "reward for reaching the level")} link="prize" />
                </li>
            </ul>
        </div>
    );
}
