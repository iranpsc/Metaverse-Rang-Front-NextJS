"use client";

import { useRef } from "react";


type Card = {
    id: number;
    icon: React.ReactNode;
};

type Props = {
    cards: Card[];
    speed?: number;
};

export default function InfiniteTrustedSlider({
    cards,
    // speed = 60,
}: Props) {

    const wrapperRef = useRef<HTMLDivElement>(null);

    const trackRef = useRef<HTMLDivElement>(null);

    // const animation = useRef<gsap.core.Tween | null>(null);

    const itemRefs = useRef<HTMLDivElement[]>([]);

    itemRefs.current = [];

    const addItem = (el: HTMLDivElement | null) => {
        if (!el) return;

        if (!itemRefs.current.includes(el)) {
            itemRefs.current.push(el);
        }
    };
        return (
        <div
            ref={wrapperRef}
            className="relative overflow-hidden w-full"
        >
            <div
                ref={trackRef}
                className="flex gap-5 w-max"
            >
                {cards.map((card) => (
                    <div
                        key={card.id}
                        ref={addItem}
                        className="
                            shrink-0
                            rounded-[40px]
                            bg-white
                            dark:bg-[#1A1A18]
                            w-[200px]
                            h-[210px]
                            lg:w-[400px]
                            lg:h-[300px]
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <div className="w-[64px] h-[64px] md:w-36 md:h-36 flex items-center justify-center">
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}