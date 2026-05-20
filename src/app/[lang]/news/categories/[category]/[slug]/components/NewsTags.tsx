// components/shared/ArticleTagsSimple.tsx

import React from "react";

type Tag = {
    label: string;
    slug?: string;
};

interface ArticleTagsSimpleProps {
    tags?: Tag[] | string[] | string | null;
    className?: string;
    showIcon?: boolean;
    limit?: number;
}

export default function ArticleTagsSimple({
    tags,
    className = "",
    showIcon = true,
    limit,
}: ArticleTagsSimpleProps) {
    // تبدیل tags به آرایه استاندارد از string‌ها
    const normalizeTags = (): string[] => {
        if (!tags) return [];

        // اگر already آرایه است
        if (Array.isArray(tags)) {
            return tags
                .map((tag) => {
                    if (typeof tag === "string") {
                        return tag;
                    }
                    if (typeof tag === "object" && tag !== null && "label" in tag) {
                        return tag.label;
                    }
                    return null;
                })
                .filter((tag): tag is string => tag !== null);
        }

        // اگر string JSON است
        if (typeof tags === "string") {
            try {
                const parsed = JSON.parse(tags);
                if (Array.isArray(parsed)) {
                    return parsed
                        .map((tag) => {
                            if (typeof tag === "string") {
                                return tag;
                            }
                            if (typeof tag === "object" && tag !== null) {
                                return tag.label || tag.slug || String(tag);
                            }
                            return null;
                        })
                        .filter((tag): tag is string => tag !== null);
                }
            } catch (e) {
                console.error("Failed to parse tags JSON:", e);
            }
        }

        return [];
    };

    const safeTags = normalizeTags();
    const displayTags = limit ? safeTags.slice(0, limit) : safeTags;

    if (safeTags.length === 0) {
        return null;
    }

    return (
        <div className={`${className}`}>
            <p className="text-xl dark:text-white mt-9 px-1 font-bold">تگ ها</p>
            <div className={`flex flex-wrap gap-2 pt-4 mt-2 `}>
                {displayTags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 rounded-full shadow-md bg-white dark:bg-[#1A1A18] text-sm md:text-base dark:text-[#868B90] flex gap-1 items-center"
                    >
                        {showIcon && (
                            <svg
                                className="size-4 md:size-5"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    className="dark:stroke-[#868B90]stroke-current"
                                    d="M4.17038 15.7998L8.70038 20.3298C10.5604 22.1898 13.5804 22.1898 15.4504 20.3298L19.8404 15.9398C21.7004 14.0798 21.7004 11.0598 19.8404 9.1898L15.3004 4.6698C14.3504 3.7198 13.0404 3.2098 11.7004 3.2798L6.70038 3.5198C4.70038 3.6098 3.11038 5.1998 3.01038 7.1898L2.77038 12.1898C2.71038 13.5398 3.22038 14.8498 4.17038 15.7998Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    className="dark:stroke-[#868B90] stroke-current"
                                    d="M9.5 12.5C10.8807 12.5 12 11.3807 12 10C12 8.61929 10.8807 7.5 9.5 7.5C8.11929 7.5 7 8.61929 7 10C7 11.3807 8.11929 12.5 9.5 12.5Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        )}
                        <span>
                            {tag}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
}