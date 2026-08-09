import { IconKey } from "./buildingsShared";

/* Deliberately simple (stroke-only, no gradients/defs) so each icon is a
   tiny inline SVG — keeps DOM size and paint cost low across many cards,
   which matters for PageSpeed/CLS more than decorative gradients would. */
export default function BuildingIcon({
  iconKey,
  color,
  size = 22,
}: {
  iconKey: IconKey;
  color: string;
  size?: number;
}) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none" };
  switch (iconKey) {
    case "education":
      return (
       
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.2917 16.6676H16.25V8.12597C16.25 6.1093 15.1417 5.00097 13.125 5.00097H9.58333V3.97597C10.0667 4.09264 10.55 4.1593 11.0417 4.1593C11.825 4.1593 12.6083 4.0093 13.3583 3.7093C13.5917 3.61764 13.75 3.3843 13.75 3.12597V0.625971C13.75 0.417638 13.65 0.225971 13.475 0.109304C13.3 -0.00736239 13.0833 -0.0323624 12.8917 0.0426376C11.7 0.517638 10.3833 0.517638 9.19167 0.0426376C9 -0.0323624 8.78333 -0.00736239 8.60833 0.109304C8.43334 0.225971 8.33333 0.417638 8.33333 0.625971V3.12597V5.00097L4.79167 5.00097C2.775 5.00097 1.66667 6.1093 1.66667 8.12597L1.66667 16.6676H0.625C0.283333 16.6676 0 16.951 0 17.2926C0 17.6343 0.283333 17.9176 0.625 17.9176H2.29167H15.625H17.2917C17.6333 17.9176 17.9167 17.6343 17.9167 17.2926C17.9167 16.951 17.6333 16.6676 17.2917 16.6676ZM4.99167 16.6676H2.91667L2.91667 9.5843H4.99167V16.6676ZM8.325 16.6676H6.24167V9.5843H8.325L8.325 16.6676ZM11.6583 16.6676H9.575L9.575 9.5843H11.6583L11.6583 16.6676ZM15 16.6676H12.9083L12.9083 9.5843H15L15 16.6676Z" fill="url(#paint0_linear_3517_5812)"/>
<defs>
<linearGradient id="paint0_linear_3517_5812" x1="0.671875" y1="2.01573" x2="15.23" y2="17.4689" gradientUnits="userSpaceOnUse">
<stop stop-color="#7FC4FB"/>
<stop offset="1" stop-color="#008BF8"/>
</linearGradient>
</defs>
</svg>

      );
    case "residential":
      return (
       
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.5 26.5625H26.25V12.475C26.25 11.7 25.9 10.975 25.2875 10.5L23.75 9.29999L23.725 6.23749C23.725 5.54999 23.1625 4.99999 22.475 4.99999H18.2125L16.5375 3.69999C15.6375 2.98749 14.3625 2.98749 13.4625 3.69999L4.7125 10.5C4.1 10.975 3.75 11.7 3.75 12.4625L3.6875 26.5625H2.5C1.9875 26.5625 1.5625 26.9875 1.5625 27.5C1.5625 28.0125 1.9875 28.4375 2.5 28.4375H27.5C28.0125 28.4375 28.4375 28.0125 28.4375 27.5C28.4375 26.9875 28.0125 26.5625 27.5 26.5625ZM8.125 15.9375V14.0625C8.125 13.375 8.6875 12.8125 9.375 12.8125H11.875C12.5625 12.8125 13.125 13.375 13.125 14.0625V15.9375C13.125 16.625 12.5625 17.1875 11.875 17.1875H9.375C8.6875 17.1875 8.125 16.625 8.125 15.9375ZM18.125 26.5625H11.875V23.125C11.875 22.0875 12.7125 21.25 13.75 21.25H16.25C17.2875 21.25 18.125 22.0875 18.125 23.125V26.5625ZM21.875 15.9375C21.875 16.625 21.3125 17.1875 20.625 17.1875H18.125C17.4375 17.1875 16.875 16.625 16.875 15.9375V14.0625C16.875 13.375 17.4375 12.8125 18.125 12.8125H20.625C21.3125 12.8125 21.875 13.375 21.875 14.0625V15.9375Z" fill="url(#paint0_linear_3422_32246)"/>
<defs>
<linearGradient id="paint0_linear_3422_32246" x1="4.92188" y1="6.64034" x2="24.1513" y2="28.7515" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFEE99"/>
<stop offset="1" stop-color="#FFD700"/>
</linearGradient>
</defs>
</svg>

      );
    case "commercial":
      return (
        
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.46191 6.36238C2.46197 3.08758 4.9121 1.60036 7.89941 3.06257L13.4375 5.79988C14.6375 6.3874 15.625 7.95029 15.625 9.26277V26.2501C15.625 26.9375 15.0624 27.5 14.375 27.5001H5.09961C3.64972 27.4999 2.46191 26.3371 2.46191 24.9122L2.46191 6.36238ZM27.5 24.3751C27.4999 26.1 26.0999 27.5 24.375 27.5001H18.7119C18.0371 27.4998 17.5 26.962 17.5 26.2872V23.588C18.8374 23.7504 20.2502 23.3623 21.2627 22.5499C22.1127 23.2373 23.2003 23.6505 24.3877 23.6505C25.5501 23.6504 26.6376 23.2373 27.5 22.5499V24.3751ZM17.5 15.0001C17.5 14.2002 18.237 13.6007 19.0244 13.7755L21.2627 14.2755L21.8623 14.4122L24.4121 14.9874C25.0246 15.1124 25.5877 15.3253 26.0752 15.6378C26.0754 15.6487 26.0848 15.6503 26.0869 15.6505C26.2119 15.738 26.3377 15.8378 26.4502 15.9503C27.025 16.5253 27.3998 17.3632 27.4873 18.588C27.4874 18.6628 27.5 18.7377 27.5 18.8126V18.8253C27.3999 20.4625 26.0624 21.7753 24.3877 21.7755C22.6504 21.7755 21.263 20.3628 21.2627 18.6505C21.2624 20.5627 19.4997 22.1003 17.5 21.713V15.0001ZM6.875 15.3126C6.3625 15.3126 5.9375 15.7376 5.9375 16.2501C5.93754 16.7625 6.36252 17.1876 6.875 17.1876H11.2119C11.7369 17.1876 12.1494 16.7625 12.1494 16.2501C12.1494 15.7376 11.7244 15.3126 11.2119 15.3126H6.875ZM6.875 10.3126C6.3625 10.3126 5.9375 10.7376 5.9375 11.2501C5.93754 11.7625 6.36252 12.1876 6.875 12.1876H11.2119C11.7369 12.1876 12.1494 11.7625 12.1494 11.2501C12.1494 10.7376 11.7244 10.3126 11.2119 10.3126H6.875Z" fill="url(#paint0_linear_3517_5710)"/>
<defs>
<linearGradient id="paint0_linear_3517_5710" x1="5.59168" y1="5.93714" x2="24.7395" y2="26.6724" gradientUnits="userSpaceOnUse">
<stop stop-color="#F59696"/>
<stop offset="1" stop-color="#ED2E2E"/>
</linearGradient>
</defs>
</svg>

      );
    case "tourism":
      return (
        <svg {...common}>
          <path d="M3 21h18M4 21V10L12 5l8 5v11M7 21v-7M12 21v-7M17 21v-7M3 10h18" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "greenSpace":
      return (
        <svg {...common}>
          <path d="M12 3l4 6h-2l3.5 5H16l3 5H5l3-5H6.5L10 9H8l4-6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 19v2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "health":
      return (
        <svg {...common}>
          <path d="M4 21V10l8-6 8 6v11H4Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 13h6M12 10v6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "office":
      return (
        <svg {...common}>
          <path d="M6 21V4h12v17M6 21h12M6 21H4M18 21h2" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "exhibition":
      return (
        <svg {...common}>
          <path d="M4 21V10l8-6 8 6v11M4 21h16M9 21v-5h6v5" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 13h.01M16 13h.01" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 21V6l8-3 8 3v15M4 21h16M9 21v-4h6v4" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
  }
}
