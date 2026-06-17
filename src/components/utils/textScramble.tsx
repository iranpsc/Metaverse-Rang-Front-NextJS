'use client';

import {
    useEffect,
    useRef,
    memo,
} from 'react';

const EN_CHARS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

const FA_CHARS =
    'اآبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی';

function randomChar(isFa: boolean) {
    const chars = isFa ? FA_CHARS : EN_CHARS;

    return chars[
        Math.floor(Math.random() * chars.length)
    ];
}

interface Props {
    text: string;
    speed?: number;
    scramble?: number;
    className?: string;
    lang?: string;
}

function TextScramble({
    text,
    lang,
    speed = 40,
    scramble = 6,
    className = '',
}: Props) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const reduceMotion =
            window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;

        if (reduceMotion) {
            element.textContent = text;
            return;
        }

        let frameId = 0;
        let current = 0;
        let lastTime = 0;
        let started = false;

        const chars = (text || '').split('');

        const observer =
            new IntersectionObserver(
                ([entry]) => {
                    if (
                        !entry.isIntersecting ||
                        started
                    )
                        return;

                    started = true;

                    observer.disconnect();
                    const isFa = lang === 'fa';
                    const animate = (
                        time: number
                    ) => {
                        if (
                            time - lastTime >=
                            speed
                        ) {
                            let output = '';

                            for (
                                let i = 0;
                                i < chars.length;
                                i++
                            ) {
                                if (i < current) {
                                    output += chars[i];
                                } else if (
                                    i <
                                    current +
                                    scramble
                                ) {
                                    output +=
                                        chars[i] === ' '
                                            ? ' '
                                            : randomChar(isFa);
                                } else {
                                    output += ' ';
                                }
                            }

                            element.textContent =
                                output;

                            current++;

                            lastTime = time;
                        }

                        if (
                            current <=
                            chars.length
                        ) {
                            frameId =
                                requestAnimationFrame(
                                    animate
                                );
                        } else {
                            element.textContent =
                                text;
                        }
                    };

                    frameId =
                        requestAnimationFrame(
                            animate
                        );
                },
                {
                    threshold: 0.2,
                    rootMargin:
                        '0px 0px -10% 0px',
                }
            );

        observer.observe(element);

        return () => {
            observer.disconnect();

            cancelAnimationFrame(frameId);
        };
    }, [text, speed, scramble]);

    return (
        <span
            ref={ref}
            className={className}
        >
            {' '}
        </span>
    );
}

export default memo(TextScramble);