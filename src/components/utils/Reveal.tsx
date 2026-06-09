'use client';

import {
  memo,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

type ElementTag = 'div' | 'span';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementTag;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  distance?: number;
  duration?: number;
  delay?: number;
}

const transformMap = {
  left: (d: number) =>
    `translate3d(-${d}px,0,0)`,
  right: (d: number) =>
    `translate3d(${d}px,0,0)`,
  top: (d: number) =>
    `translate3d(0,-${d}px,0)`,
  bottom: (d: number) =>
    `translate3d(0,${d}px,0)`,
};

function Reveal({
  children,
  className = '',
  as = 'div',
  direction = 'bottom',
  distance = 50,
  duration = 700,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting)
          return;

        el.dataset.visible = 'true';
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as any}
      className={className}
      data-visible="false"
      style={
        {
          '--duration': `${duration}ms`,
          '--delay': `${delay}ms`,
          '--transform': transformMap[
            direction
          ](distance),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

export default memo(Reveal);