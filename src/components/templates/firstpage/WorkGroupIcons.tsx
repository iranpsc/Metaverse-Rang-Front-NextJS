import type { ReactNode, SVGProps } from "react";
import type { WorkGroupIconKey } from "./workGroupsData";

/**
 * آیکون‌ها به‌صورت SVG sprite: هر شکل فقط یک‌بار در DOM تعریف می‌شود
 * (WorkGroupIconSprite) و بقیه با <use> به آن ارجاع می‌دهند.
 * نتیجه: HTML کوچک‌تر، DOM سبک‌تر و بدون idهای تکراری.
 */

type IconProps = Omit<SVGProps<SVGSVGElement>, "name">;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const stroke = (children: ReactNode, sw = 1.6) => (
  <g {...S} strokeWidth={sw}>
    {children}
  </g>
);
const solid = (children: ReactNode) => <g fill="currentColor">{children}</g>;

const SYMBOLS = {
  /* ---------- رابط ---------- */
  globe: stroke(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </>
  ),
  broadcast: stroke(
    <>
      <circle cx="12" cy="11" r="1.8" />
      <path d="M12 13v7M8.5 7.5a5 5 0 0 0 0 7M15.5 7.5a5 5 0 0 1 0 7M5.8 5a8.8 8.8 0 0 0 0 12M18.2 5a8.8 8.8 0 0 1 0 12" />
    </>
  ),
  chain: stroke(
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" />
  ),
  chevron: stroke(<path d="m9 6 6 6-6 6" />, 2),
  users: stroke(
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 5.2a3 3 0 0 1 0 5.6M18 14c2 .6 3 2.3 3 5" />
    </>
  ),
  shield: (
    <>
      <path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 9.2 8 11 4.6-1.8 8-6 8-11V5z" />
      <path
        d="m8.5 12 2.5 2.5 4.5-5"
        fill="none"
        stroke="rgb(var(--color-gray-1))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  external: stroke(<path d="M8 16 17 7M9 7h8v8M5 20h14" />),
  doc: (
    <>
      <path fill="currentColor" d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path
        d="M14 2v5h5"
        fill="none"
        stroke="rgb(var(--color-gray-3))"
        strokeOpacity=".35"
        strokeWidth="1.2"
      />
    </>
  ),
  cast: stroke(
    <path d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5M3 12a9 9 0 0 1 9 9M3 16a5 5 0 0 1 5 5M3 20h.01" />
  ),
  grid: stroke(
    <>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </>
  ),
  github: solid(
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5z" />
  ),

  /* ---------- برندها (رنگ رسمی لوگو) ---------- */
  substack: <path fill="#FF6719" d="M4 3h16v2.6H4zM4 7.3h16v2.6H4zM4 11.6h16V22l-8-4.5L4 22z" />,
  medium: (
    <>
      <circle cx="12" cy="12" r="10" fill="#fff" />
      <ellipse cx="8.6" cy="12" rx="3.2" ry="3.4" fill="#000" />
      <ellipse cx="14.3" cy="12" rx="1.4" ry="3.2" fill="#000" />
      <rect x="17" y="8.8" width="1.1" height="6.4" rx=".5" fill="#000" />
    </>
  ),
  linkedin: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M6.5 9.5h2.4V17H6.5zM7.7 5.8a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8zM10.6 9.5h2.3v1c.4-.7 1.2-1.2 2.4-1.2 2.3 0 2.7 1.5 2.7 3.5V17h-2.4v-3.6c0-.9 0-2-1.2-2s-1.4 1-1.4 1.9V17h-2.4z"
      />
    </>
  ),
  youtube: (
    <>
      <rect x="1.5" y="5" width="21" height="14" rx="4.5" fill="#FF0000" />
      <path fill="#fff" d="m10 8.8 5.2 3.2L10 15.2z" />
    </>
  ),
  instagram: (
    <>
      <defs>
        <linearGradient id="wg-ig-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset=".35" stopColor="#FA7E1E" />
          <stop offset=".65" stopColor="#D62976" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#wg-ig-grad)" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="3.5" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.6" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="15.6" cy="8.4" r=".9" fill="#fff" />
    </>
  ),
  figma: (
    <>
      <path fill="#F24E1E" d="M8 2h4v6H8a3 3 0 0 1 0-6z" />
      <path fill="#FF7262" d="M12 2h4a3 3 0 0 1 0 6h-4z" />
      <path fill="#A259FF" d="M8 8h4v6H8a3 3 0 0 1 0-6z" />
      <circle cx="15" cy="11" r="3" fill="#1ABCFE" />
      <path fill="#0ACF83" d="M8 14h4v3a3 3 0 1 1-4-2.8z" />
    </>
  ),
} satisfies Record<string, ReactNode>;

type SymbolName = keyof typeof SYMBOLS;

/** یک‌بار در ابتدای سکشن رندر شود. */
export function WorkGroupIconSprite() {
  return (
    <svg
      width="0"
      height="0"
      className="absolute size-0 overflow-hidden"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {(Object.keys(SYMBOLS) as SymbolName[]).map((name) => (
          <symbol key={name} id={`wg-${name}`} viewBox="0 0 24 24">
            {SYMBOLS[name]}
          </symbol>
        ))}
      </defs>
    </svg>
  );
}

function Icon({ name, ...props }: IconProps & { name: SymbolName }) {
  return (
    <svg aria-hidden="true" focusable="false" {...props}>
      <use href={`#wg-${name}`} />
    </svg>
  );
}

const make = (name: SymbolName) =>
  function WorkGroupIcon(p: IconProps) {
    return <Icon name={name} {...p} />;
  };

export const GlobeIcon = make("globe");
export const BroadcastIcon = make("broadcast");
export const ChainIcon = make("chain");
export const ChevronIcon = make("chevron");
export const UsersIcon = make("users");
export const ShieldCheckIcon = make("shield");
export const ExternalIcon = make("external");
export const DocIcon = make("doc");
export const CastIcon = make("cast");
export const GridIcon = make("grid");
export const GitHubIcon = make("github");

export function WorkGroupLinkIcon({
  name,
  ...props
}: IconProps & { name: WorkGroupIconKey }) {
  return <Icon name={name} {...props} />;
}