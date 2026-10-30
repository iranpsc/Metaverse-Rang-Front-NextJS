import type { ReactNode, SVGProps } from "react";
import type { WorkGroupIconKey } from "./workGroupsData";
import path from "path";

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

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 960" width="24" height="24">
        <path d="M444.49 3.29C446.25 3.16 448 3.04 449.75 2.91C460.11 2.74 470.49 1.91 480.88 1.99C490.42 2.07 499.97 2.77 509.5 2.9C511.5 3.03 513.51 3.16 515.51 3.3C569.58 7.93 622.93 20.22 672.69 42.3C775.27 87.81 860.89 169.4 910.02 270.47C925.43 302.18 938.01 336.07 945.79 370.46C950.35 390.6 953.16 410.91 955.86 431.34C955.98 432.5 956.1 433.66 956.22 434.82C957.18 458.15 959.04 481.33 957.79 504.74C955.66 544.64 948.79 584.56 936.91 622.71C894.39 759.24 797.08 863.32 667.23 921.02C625.19 939.7 580.1 949.63 534.79 955.86C533.67 955.99 532.54 956.12 531.41 956.24C518.97 957.21 506.52 958.41 494.03 958.78C484.27 959.06 474.5 958.57 464.76 958.83C462.68 958.7 460.6 958.56 458.52 958.42C440 956.42 421.36 955.72 402.93 952.73C366.02 946.74 329.49 936 294.99 921.5C158.21 864 50.53 740.2 16.23 595.29C9.51 566.87 5.27 538.09 3.3 508.93C1.54 483.03 2.35 456.85 2.35 430.9C2.35 390.58 2.35 350.25 2.35 309.92C2.35 238.03 2.35 166.14 2.35 94.25C2.35 62.61 -3.37 28.2 28.04 9.2C53.32 -6.09 75.12 5.08 97.13 19.01C119.79 33.36 141.95 48.86 163.42 64.94C170.95 70.58 178.58 76.09 186.08 81.76C190.66 85.23 195.25 89.43 200.33 92.07C208.51 88.68 220.08 79.26 227.95 74.08C241.54 65.14 256.2 57.6 270.73 50.29C324.96 23 384.38 8.88 444.49 3.29ZM416 498.46C411.82 496.22 408.21 491.46 404.93 488.01C399.37 482.19 393.56 476.56 387.85 470.89C375.08 458.23 362.41 445.48 349.69 432.77C339.95 423.02 330.58 412.37 319.09 404.62C302.23 393.27 281.9 388.08 261.7 389.17C253.94 389.59 246.08 390.85 238.71 393.39C227.28 397.34 216.27 402.88 207.09 410.91C196.02 420.59 187.21 432.2 181.35 445.73C168.16 476.14 173.25 511.7 192.53 538.2C202.99 552.59 217.64 564.29 229.99 577.03C258.9 606.84 288.72 635.78 317.98 665.25C341.44 688.88 363.95 716.83 398.59 722.97C406.97 724.45 415.42 724.66 423.89 724.15C455.19 722.3 473.83 705.28 494.59 684.4C503.33 675.6 512.16 666.9 520.9 658.1C575.49 603.11 630.49 548.52 685.25 493.69C702.04 476.87 718.77 460 735.6 443.22C745.89 432.96 757.17 423.01 766.3 411.68C789.48 382.89 792.98 342.37 776.19 309.65C751.2 260.95 685.34 244.74 640.62 276.32C631.57 282.71 624.12 290.72 616.29 298.48C604.54 310.12 592.95 321.9 581.22 333.55C542.5 371.98 504.28 410.92 465.52 449.3C454.21 460.5 443.11 471.9 431.82 483.11C426.8 488.11 421.87 494.51 416 498.46Z" fill="#0aca9b" fill-rule="evenodd" stroke="#0aca9b" stroke-width="0.25" stroke-linejoin="round" />
        <path d="M449.75 2.91C448 3.04 446.25 3.16 444.49 3.29C444.64 3.07 444.79 2.85 444.93 2.63C446.54 2.72 448.14 2.82 449.75 2.91ZM509.5 2.9C511.36 2.81 513.21 2.72 515.07 2.63C515.21 2.85 515.36 3.07 515.51 3.3C513.51 3.16 511.5 3.03 509.5 2.9ZM416 498.46C421.87 494.51 426.8 488.11 431.82 483.11C443.11 471.9 454.21 460.5 465.52 449.3C504.28 410.92 542.5 371.98 581.22 333.55C592.95 321.9 604.54 310.12 616.29 298.48C624.12 290.72 631.57 282.71 640.62 276.32C685.34 244.74 751.2 260.95 776.19 309.65C792.98 342.37 789.48 382.89 766.3 411.68C757.17 423.01 745.89 432.96 735.6 443.22C718.77 460 702.04 476.87 685.25 493.69C630.49 548.52 575.49 603.11 520.9 658.1C512.16 666.9 503.33 675.6 494.59 684.4C473.83 705.28 455.19 722.3 423.89 724.15C415.42 724.66 406.97 724.45 398.59 722.97C363.95 716.83 341.44 688.88 317.98 665.25C288.72 635.78 258.9 606.84 229.99 577.03C217.64 564.29 202.99 552.59 192.53 538.2C173.25 511.7 168.16 476.14 181.35 445.73C187.21 432.2 196.02 420.59 207.09 410.91C216.27 402.88 227.28 397.34 238.71 393.39C246.08 390.85 253.94 389.59 261.7 389.17C281.9 388.08 302.23 393.27 319.09 404.62C330.58 412.37 339.95 423.02 349.69 432.77C362.41 445.48 375.08 458.23 387.85 470.89C393.56 476.56 399.37 482.19 404.93 488.01C408.21 491.46 411.82 496.22 416 498.46ZM955.86 431.34C956.07 431.49 956.28 431.63 956.49 431.78C956.4 432.79 956.31 433.81 956.22 434.82C956.1 433.66 955.98 432.5 955.86 431.34ZM534.79 955.86C534.65 956.07 534.5 956.28 534.36 956.49C533.37 956.41 532.39 956.33 531.41 956.24C532.54 956.12 533.67 955.99 534.79 955.86ZM458.52 958.42C460.6 958.56 462.68 958.7 464.76 958.83C462.83 958.93 460.89 959.03 458.96 959.12C458.81 958.89 458.67 958.66 458.52 958.42Z" fill="#ffffff" fill-rule="evenodd" stroke="#ffffff" stroke-width="0.25" stroke-linejoin="round" />
      </svg>
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