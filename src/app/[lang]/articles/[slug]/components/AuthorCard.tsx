"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { articles } from "@/components/utils/articles";

interface AuthorCardProps {
    lang: string;
    slug: string; // مقاله‌ی فعلی
}

const AuthorCard = ({ lang, slug }: AuthorCardProps) => {
    const article = articles.find((a) => a.slug === slug);
    if (!article) return null;

    const author = article.author;

    return (
        <section className="w-full flex justify-center my-10">
            <div className="bg-white dark:bg-[#1A1A18] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 w-full  flex flex-col items-center text-center">

                <div className="flex flex-col gap-4 mt-[-85px]">
                    {/* عکس پروفایل */}
                    <div className="relative w-[120px] h-[120px] bg-lightGray rounded-full overflow-hidden border shadow-md ">
                        <Image
                            src={author.avatar || "/articles/author/fallback-avatar.jpg"}
                            alt={author.name}
                            className="object-cover"
                            width={120}
                            height={120}
                        />

                    </div>
                    <div className="flex flex-col text-center">
                        <p className="text-sm text-blue-500 mt-2">{author.citizenId}</p>
                        <h2 className="text-lg font-bold mt-1 dark:text-white">{author.name}</h2>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row  md:flex-row md:justify-between w-full gap-5 items-center mt-5 md:mt-[-34px]">

                    <div>
                        <p className="text-sm text-gray-500 dark:text-dark-gray">
                            نویسنده حوزه {author.field}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 ">
                        {author.socials?.telegram && (
                            <a
                                href={author.socials.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-placeholder transition"
                            >
                                <Image
                                    width={37}
                                    height={37}
                                    src="/social/telegram-circle.png"
                                    alt=""
                                />
                            </a>
                        )}
                        {author.socials?.whatsapp && (
                            <a
                                href={`https://wa.me/${author.socials.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-placeholder transition"
                            >
                                <Image
                                    width={37}
                                    height={37}
                                    src="/social/whatsapp-circle.png"
                                    alt=""
                                />
                            </a>
                        )}
                        {author.socials?.email && (
                            <a
                                href={`mailto:${author.socials.email}`}
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-placeholder transition"
                            >
                                <Image
                                    width={37}
                                    height={37}
                                    src="/social/envelope-circle.png"
                                    alt=""
                                />
                            </a>
                        )}
                    </div>
                </div>


                {/* بیوگرافی */}
                <p className="mt-5 text-sm text-gray-600 dark:text-dark-gray leading-relaxed max-w-2xl ">
                    {author.bio}
                </p>

                {/* دکمه دیدن مقالات */}
                <Link
                    href={`/${lang}/citizens/${author.citizenId}`}
                    className="mt-6 px-5 py-2 rounded-lg bg-light-primary dark:bg-dark-yellow dark:text-black  text-white font-bold text-sm hover:opacity-90 transition"
                >
                    مقالات این نویسنده
                </Link>
            </div>
        </section>
    );
};

export default AuthorCard;
