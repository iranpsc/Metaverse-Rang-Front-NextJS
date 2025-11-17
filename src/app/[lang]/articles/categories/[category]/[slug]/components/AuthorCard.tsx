"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthorCardProps {
  lang: string;
  article: any; // می‌تونی تایپ دقیق هم بزنی
}

const AuthorCard = ({ lang, article }: AuthorCardProps) => {
  const author = article?.author;
  if (!author) return null;

  return (
    <section className="w-full flex justify-center my-10">
      <div className="bg-white dark:bg-[#1A1A18] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 w-full flex flex-col items-center text-center md:px-12">

        {/* عکس پروفایل */}
        <div className="flex flex-col gap-4 mt-[-85px]">
          <div className="relative w-[120px] h-[120px] bg-lightGray rounded-full overflow-hidden border shadow-md">
            <Image
              src={author.avatar || "/articles/author/fallback-avatar.jpg"}
              alt={author.name || "نویسنده"}
              width={120}
              height={120}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col text-center">
            <p className="text-sm text-blue-500 mt-2">{author.citizenId}</p>
            <h2 className="text-lg font-bold mt-1 dark:text-white">{author.name}</h2>
          </div>
        </div>

        {/* حوزه فعالیت و شبکه‌ها */}
        <div className="flex flex-col lg:flex-row md:flex-row md:justify-between w-full gap-5 items-center mt-5 md:mt-[-34px]">
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-gray">
              نویسنده حوزه {author.field}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {author.socials?.telegram && (
              <a href={author.socials.telegram} target="_blank" rel="noopener noreferrer">
                <Image width={37} height={37} src="/social/telegram-circle.png" alt="Telegram" />
              </a>
            )}
            {author.socials?.whatsapp && (
              <a href={`https://wa.me/${author.socials.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Image width={37} height={37} src="/social/whatsapp-circle.png" alt="WhatsApp" />
              </a>
            )}
            {author.socials?.email && (
              <a href={`mailto:${author.socials.email}`}>
                <Image width={37} height={37} src="/social/envelope-circle.png" alt="Email" />
              </a>
            )}
          </div>
        </div>

        {/* بیوگرافی */}
        <p className="mt-5 text-sm text-gray-600 dark:text-dark-gray leading-relaxed max-w-2xl">
          {author.bio}
        </p>

        {/* دکمه دیدن مقالات نویسنده */}
        <Link
          href={`/${lang}/citizens/${author.citizenId}`}
          className="mt-6 px-5 py-2 rounded-lg bg-light-primary dark:bg-dark-yellow dark:text-black text-white font-bold text-sm hover:opacity-90 transition"
        >
          مقالات این نویسنده
        </Link>
      </div>
    </section>
  );
};

export default AuthorCard;
