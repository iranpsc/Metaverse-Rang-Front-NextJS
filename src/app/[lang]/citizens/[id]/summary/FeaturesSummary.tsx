"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import FeaturesChart from "./FeaturesChart";
import {
  Period,
  PERIOD_OPTIONS,
  KarbariOption,
  IconKey,
  resolveIconKey,
  ICON_COLORS,
  getKarbariDescription,
} from "./featuresShared";

/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
interface FeatureSummaryItem {
  karbari: string;
  label: string;
  current_count: number;
  bought_count: number;
  sold_count: number;
}

const CARD_HEIGHT = "h-[200px]";

/* ------------------------------------------------------------------ */
/*                                 ICON                                 */
/* ------------------------------------------------------------------ */
function FeatureIcon({ iconKey, color }: { iconKey: IconKey; color: string }) {
  switch (iconKey) {
    case "tourism":
      // monument / landmark (columns + pediment)
      return (

        <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.0834 37.2083V43.0833H3.91675V37.2083C3.91675 36.1313 4.798 35.25 5.87508 35.25H41.1251C42.2022 35.25 43.0834 36.1313 43.0834 37.2083Z" fill="url(#paint0_linear_3482_4076)" stroke="url(#paint1_linear_3482_4076)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.7084 21.542H9.79175V35.2503H13.7084V21.542Z" fill="url(#paint2_linear_3482_4076)" />
          <path d="M21.5417 21.542H17.625V35.2503H21.5417V21.542Z" fill="url(#paint3_linear_3482_4076)" />
          <path d="M29.3749 21.542H25.4583V35.2503H29.3749V21.542Z" fill="url(#paint4_linear_3482_4076)" />
          <path d="M37.2084 21.542H33.2917V35.2503H37.2084V21.542Z" fill="url(#paint5_linear_3482_4076)" />
          <path d="M45.0416 44.5518H1.95825C1.15534 44.5518 0.489502 43.8859 0.489502 43.083C0.489502 42.2801 1.15534 41.6143 1.95825 41.6143H45.0416C45.8445 41.6143 46.5103 42.2801 46.5103 43.083C46.5103 43.8859 45.8445 44.5518 45.0416 44.5518Z" fill="url(#paint6_linear_3482_4076)" />
          <path d="M41.8497 11.2603L24.2247 4.21027C23.833 4.05361 23.1672 4.05361 22.7755 4.21027L5.1505 11.2603C4.46508 11.5344 3.91675 12.3374 3.91675 13.0815V19.5832C3.91675 20.6603 4.798 21.5415 5.87508 21.5415H41.1251C42.2022 21.5415 43.0834 20.6603 43.0834 19.5832V13.0815C43.0834 12.3374 42.5351 11.5344 41.8497 11.2603ZM23.5001 16.6457C21.8747 16.6457 20.5626 15.3336 20.5626 13.7082C20.5626 12.0828 21.8747 10.7707 23.5001 10.7707C25.1255 10.7707 26.4376 12.0828 26.4376 13.7082C26.4376 15.3336 25.1255 16.6457 23.5001 16.6457Z" fill="url(#paint7_linear_3482_4076)" />
          <defs>
            <linearGradient id="paint0_linear_3482_4076" x1="23.5001" y1="35.25" x2="23.5001" y2="43.0833" gradientUnits="userSpaceOnUse">
              <stop stopColor="#001B3C" />
              <stop offset="1" stopColor="#0058C6" />
            </linearGradient>
            <linearGradient id="paint1_linear_3482_4076" x1="23.5001" y1="35.25" x2="23.5001" y2="43.0833" gradientUnits="userSpaceOnUse">
              <stop stopColor="#001B3C" />
              <stop offset="1" stopColor="#0058C6" />
            </linearGradient>
            <linearGradient id="paint2_linear_3482_4076" x1="11.7501" y1="21.542" x2="11.7501" y2="35.2503" gradientUnits="userSpaceOnUse">
              <stop stopColor="#001B3C" />
              <stop offset="1" stopColor="#0058C6" />
            </linearGradient>
            <linearGradient id="paint3_linear_3482_4076" x1="19.5833" y1="21.542" x2="19.5833" y2="35.2503" gradientUnits="userSpaceOnUse">
              <stop stopColor="#001B3C" />
              <stop offset="1" stopColor="#0058C6" />
            </linearGradient>
            <linearGradient id="paint4_linear_3482_4076" x1="27.4166" y1="21.542" x2="27.4166" y2="35.2503" gradientUnits="userSpaceOnUse">
              <stop stopColor="#001B3C" />
              <stop offset="1" stopColor="#0058C6" />
            </linearGradient>
            <linearGradient id="paint5_linear_3482_4076" x1="35.2501" y1="21.542" x2="35.2501" y2="35.2503" gradientUnits="userSpaceOnUse">
              <stop stopColor="#001B3C" />
              <stop offset="1" stopColor="#0058C6" />
            </linearGradient>
            <linearGradient id="paint6_linear_3482_4076" x1="23.4999" y1="41.6143" x2="23.4999" y2="44.5518" gradientUnits="userSpaceOnUse">
              <stop stopColor="#001B3C" />
              <stop offset="1" stopColor="#0058C6" />
            </linearGradient>
            <linearGradient id="paint7_linear_3482_4076" x1="23.5001" y1="4.09277" x2="23.5001" y2="21.5415" gradientUnits="userSpaceOnUse">
              <stop stopColor="#001B3C" />
              <stop offset="1" stopColor="#0058C6" />
            </linearGradient>
          </defs>
        </svg>

      );
    case "commercial":
      return (

        <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.85742 9.96787C3.85746 4.83709 7.69656 2.50671 12.377 4.79795L21.0518 9.08701C22.9316 10.0074 24.4793 12.4547 24.4795 14.5108V41.1251C24.4795 42.2022 23.5976 43.0831 22.5205 43.0831H7.99023C5.71857 43.0831 3.85742 41.2619 3.85742 39.0294L3.85742 9.96787ZM43.083 38.1876C43.083 40.89 40.8899 43.083 38.1875 43.0831H29.3164C28.2589 43.0831 27.417 42.2412 27.417 41.1837V36.9542C29.5123 37.2086 31.7254 36.601 33.3115 35.3282C34.6432 36.4052 36.3467 37.0519 38.207 37.0519C40.0282 37.0518 41.7318 36.4053 43.083 35.3282V38.1876ZM27.417 23.5001C27.417 22.2468 28.5719 21.307 29.8057 21.5812L33.3115 22.3644L34.251 22.5792L38.2461 23.4806C39.2057 23.6764 40.0868 24.0095 40.8506 24.4991C40.8508 24.5173 40.8682 24.5186 40.8701 24.5187C41.0659 24.6557 41.2622 24.8121 41.4385 24.9884C42.3392 25.8892 42.9264 27.2013 43.0635 29.1202C43.0635 29.2377 43.083 29.3553 43.083 29.4728V29.4923C42.9263 32.0577 40.8312 34.1143 38.207 34.1144C35.4849 34.1144 33.3115 31.9008 33.3115 29.2179C33.3115 32.214 30.5501 34.6234 27.417 34.0167V23.5001ZM10.7705 23.9894C9.96777 23.9895 9.3019 24.6554 9.30176 25.4581C9.30176 26.261 9.96768 26.9267 10.7705 26.9269H17.5664C18.3888 26.9267 19.0352 26.2609 19.0352 25.4581C19.035 24.6554 18.3691 23.9895 17.5664 23.9894H10.7705ZM10.7705 16.1563C9.96768 16.1565 9.30176 16.8223 9.30176 17.6251C9.3018 18.4279 9.96771 19.0937 10.7705 19.0938H17.5664C18.3888 19.0937 19.0351 18.4279 19.0352 17.6251C19.0352 16.8223 18.3692 16.1565 17.5664 16.1563H10.7705Z" fill="url(#paint0_linear_3482_3268)" />
          <defs>
            <linearGradient id="paint0_linear_3482_3268" x1="8.76062" y1="9.30123" x2="38.7588" y2="41.7858" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59696" />
              <stop offset="1" stopColor="#ED2E2E" />
            </linearGradient>
          </defs>
        </svg>

      );
    case "residential":
      return (

        <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.0832 41.6151H41.1248V19.5446C41.1248 18.3305 40.5765 17.1946 39.6169 16.4505L37.2082 14.5705L37.169 9.77256C37.169 8.69548 36.2878 7.83382 35.2107 7.83382H28.5328L25.9086 5.79715C24.4986 4.6809 22.5011 4.6809 21.0911 5.79715L7.38275 16.4505C6.42317 17.1946 5.87484 18.3305 5.87484 19.5251L5.77692 41.6151H3.9165C3.11359 41.6151 2.44775 42.2809 2.44775 43.0838C2.44775 43.8867 3.11359 44.5526 3.9165 44.5526H43.0832C43.8861 44.5526 44.5519 43.8867 44.5519 43.0838C44.5519 42.2809 43.8861 41.6151 43.0832 41.6151ZM12.729 24.9692V22.0317C12.729 20.9546 13.6103 20.0734 14.6873 20.0734H18.604C19.6811 20.0734 20.5623 20.9546 20.5623 22.0317V24.9692C20.5623 26.0463 19.6811 26.9276 18.604 26.9276H14.6873C13.6103 26.9276 12.729 26.0463 12.729 24.9692ZM28.3957 41.6151H18.604V36.2296C18.604 34.6042 19.9161 33.2921 21.5415 33.2921H25.4582C27.0836 33.2921 28.3957 34.6042 28.3957 36.2296V41.6151ZM34.2707 24.9692C34.2707 26.0463 33.3894 26.9276 32.3123 26.9276H28.3957C27.3186 26.9276 26.4373 26.0463 26.4373 24.9692V22.0317C26.4373 20.9546 27.3186 20.0734 28.3957 20.0734H32.3123C33.3894 20.0734 34.2707 20.9546 34.2707 22.0317V24.9692Z" fill="url(#paint0_linear_3482_3945)" />
          <defs>
            <linearGradient id="paint0_linear_3482_3945" x1="7.71077" y1="10.4037" x2="37.8369" y2="45.0445" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFEA7F" />
              <stop offset="1" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>

      );
    case "education":
      // bank / university building
      return (

        <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.0807 41.6143H40.6328V21.5413C40.6328 16.8022 38.0282 14.1976 33.2891 14.1976H24.9661V11.7888C26.102 12.063 27.2378 12.2197 28.3932 12.2197C30.2341 12.2197 32.0749 11.8672 33.8374 11.1622C34.3857 10.9468 34.7578 10.3984 34.7578 9.79134V3.91634C34.7578 3.42676 34.5228 2.97634 34.1116 2.70218C33.7003 2.42801 33.1911 2.36926 32.7407 2.54551C29.9403 3.66176 26.8461 3.66176 24.0457 2.54551C23.5953 2.36926 23.0861 2.42801 22.6749 2.70218C22.2636 2.97634 22.0286 3.42676 22.0286 3.91634V9.79134V14.1976L13.7057 14.1976C8.96656 14.1976 6.36198 16.8022 6.36198 21.5413L6.36198 41.6143H3.91406C3.11115 41.6143 2.44531 42.2801 2.44531 43.083C2.44531 43.8859 3.11115 44.5518 3.91406 44.5518H7.83073H39.1641H43.0807C43.8836 44.5518 44.5495 43.8859 44.5495 43.083C44.5495 42.2801 43.8836 41.6143 43.0807 41.6143ZM14.1757 41.6143H9.29948L9.29948 24.9684H14.1757V41.6143ZM22.0091 41.6143H17.1132V24.9684H22.0091L22.0091 41.6143ZM29.8424 41.6143H24.9466L24.9466 24.9684H29.8424L29.8424 41.6143ZM37.6953 41.6143H32.7799V24.9684L37.6953 24.9684V41.6143Z" fill="url(#paint0_linear_3422_24827)" />
          <defs>
            <linearGradient id="paint0_linear_3422_24827" x1="4.02422" y1="7.18229" x2="38.2358" y2="43.4972" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7FC4FB" />
              <stop offset="1" stopColor="#008BF8" />
            </linearGradient>
          </defs>
        </svg>

      );
    case "exhibition":
      return (

        <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.7884 16.1957L43.2205 10.7712C42.398 4.85699 39.715 2.44824 33.9771 2.44824H29.3555H26.4571H20.5038H17.6055H12.9055C7.14796 2.44824 4.48463 4.85699 3.64255 10.8299L3.1138 16.2153C2.91796 18.3107 3.48588 20.3474 4.71963 21.9337C6.20796 23.8724 8.49921 24.9691 11.045 24.9691C13.5125 24.9691 15.8821 23.7353 17.3705 21.7574C18.7021 23.7353 20.9738 24.9691 23.5 24.9691C26.0263 24.9691 28.2392 23.7941 29.5905 21.8357C31.0984 23.7745 33.4288 24.9691 35.8571 24.9691C38.4617 24.9691 40.8117 23.8137 42.2805 21.777C43.4555 20.2103 43.9842 18.2324 43.7884 16.1957Z" fill="url(#paint0_linear_3422_24848)" />
          <path d="M22.2272 32.6257C19.7401 32.8802 17.8601 34.9952 17.8601 37.5019V42.8677C17.8601 43.3965 18.2909 43.8273 18.8197 43.8273H28.1609C28.6897 43.8273 29.1205 43.3965 29.1205 42.8677V38.1873C29.1401 34.0944 26.7314 32.1557 22.2272 32.6257Z" fill="url(#paint1_linear_3422_24848)" />
          <path d="M41.8496 28.1999V34.0357C41.8496 39.4407 37.4629 43.8274 32.0579 43.8274C31.5291 43.8274 31.0983 43.3966 31.0983 42.8678V38.1874C31.0983 35.6807 30.3346 33.7224 28.8462 32.3907C27.5341 31.1962 25.7521 30.6087 23.5391 30.6087C23.0496 30.6087 22.56 30.6282 22.0312 30.687C18.5454 31.0395 15.9016 33.977 15.9016 37.502V42.8678C15.9016 43.3966 15.4708 43.8274 14.9421 43.8274C9.53706 43.8274 5.15039 39.4407 5.15039 34.0357V28.2391C5.15039 26.8682 6.50164 25.9478 7.77456 26.3982C8.30331 26.5745 8.83206 26.7116 9.38039 26.7899C9.61539 26.8291 9.86997 26.8682 10.105 26.8682C10.4183 26.9074 10.7316 26.927 11.045 26.927C13.3166 26.927 15.5491 26.0849 17.3116 24.6357C18.9958 26.0849 21.1891 26.927 23.5 26.927C25.8304 26.927 27.9846 26.1241 29.6687 24.6749C31.4312 26.1045 33.6246 26.927 35.8571 26.927C36.2096 26.927 36.5621 26.9074 36.895 26.8682C37.13 26.8487 37.3454 26.8291 37.5608 26.7899C38.1679 26.7116 38.7162 26.5353 39.2646 26.3591C40.5375 25.9282 41.8496 26.8682 41.8496 28.1999Z" fill="url(#paint2_linear_3422_24848)" />
          <defs>
            <linearGradient id="paint0_linear_3422_24848" x1="23.4521" y1="2.44824" x2="23.4521" y2="24.9691" gradientUnits="userSpaceOnUse">
              <stop stopColor="#008062" />
              <stop offset="1" stopColor="#0ECFA4" />
            </linearGradient>
            <linearGradient id="paint1_linear_3422_24848" x1="23.4904" y1="32.5566" x2="23.4904" y2="43.8273" gradientUnits="userSpaceOnUse">
              <stop stopColor="#008062" />
              <stop offset="1" stopColor="#0ECFA4" />
            </linearGradient>
            <linearGradient id="paint2_linear_3422_24848" x1="23.5" y1="24.6357" x2="23.5" y2="43.8274" gradientUnits="userSpaceOnUse">
              <stop stopColor="#008062" />
              <stop offset="1" stopColor="#0ECFA4" />
            </linearGradient>
          </defs>
        </svg>

      );
    case "park":
      return (

        <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.375 13.8456C29.375 12.5335 28.7288 11.3193 27.6321 10.5948L19.7987 5.36602C18.4867 4.48477 16.7633 4.48477 15.4513 5.36602L7.61792 10.5948C6.54083 11.3193 5.875 12.5335 5.875 13.8456V24.9689C5.875 25.5173 6.30583 25.9481 6.85417 25.9481H28.3958C28.9442 25.9481 29.375 25.5173 29.375 24.9689V13.8456ZM17.625 21.0523C15.745 21.0523 14.1979 19.5052 14.1979 17.6252C14.1979 15.7452 15.745 14.1981 17.625 14.1981C19.505 14.1981 21.0521 15.7452 21.0521 17.6252C21.0521 19.5052 19.505 21.0523 17.625 21.0523Z" fill="url(#paint0_linear_3482_2774)" />
          <path d="M43.0834 41.6146H40.5963V35.7396C42.4567 35.1325 43.808 33.3896 43.808 31.3334V27.4167C43.808 24.8513 41.7126 22.7559 39.1472 22.7559C36.5817 22.7559 34.4863 24.8513 34.4863 27.4167V31.3334C34.4863 33.37 35.818 35.0934 37.6392 35.72V41.6146H29.3751V29.8646C29.3751 29.3163 28.9442 28.8854 28.3959 28.8854H6.85425C6.30591 28.8854 5.87508 29.3163 5.87508 29.8646V41.6146H3.91675C3.11383 41.6146 2.448 42.2804 2.448 43.0834C2.448 43.8863 3.11383 44.5521 3.91675 44.5521H39.0297C39.0688 44.5521 39.0884 44.5717 39.1276 44.5717C39.1667 44.5717 39.1863 44.5521 39.2255 44.5521H43.0834C43.8863 44.5521 44.5522 43.8863 44.5522 43.0834C44.5522 42.2804 43.8863 41.6146 43.0834 41.6146ZM16.1563 35.7396C16.1563 34.9367 16.8222 34.2709 17.6251 34.2709C18.428 34.2709 19.0938 34.9367 19.0938 35.7396V41.6146H16.1563V35.7396Z" fill="url(#paint1_linear_3482_2774)" />
          <defs>
            <linearGradient id="paint0_linear_3482_2774" x1="17.625" y1="4.70508" x2="17.625" y2="25.9481" gradientUnits="userSpaceOnUse">
              <stop stopColor="#013918" />
              <stop offset="1" stopColor="#448960" />
            </linearGradient>
            <linearGradient id="paint1_linear_3482_2774" x1="23.5001" y1="22.7559" x2="23.5001" y2="44.5717" gradientUnits="userSpaceOnUse">
              <stop stopColor="#013918" />
              <stop offset="1" stopColor="#448960" />
            </linearGradient>
          </defs>
        </svg>

      );
    case "health":
      // hospital building with a cross
      return (

        <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.0832 41.6143H3.9165C3.11359 41.6143 2.44775 42.2801 2.44775 43.083C2.44775 43.8859 3.11359 44.5518 3.9165 44.5518H43.0832C43.8861 44.5518 44.5519 43.8859 44.5519 43.083C44.5519 42.2801 43.8861 41.6143 43.0832 41.6143Z" fill="url(#paint0_linear_3482_2752)" />
          <path d="M33.2917 3.91699H13.7083C7.83333 3.91699 5.875 7.42241 5.875 11.7503V43.0837H17.625V31.2162C17.625 30.1978 18.4475 29.3753 19.4658 29.3753H27.5537C28.5525 29.3753 29.3946 30.1978 29.3946 31.2162V43.0837H41.1446V11.7503C41.125 7.42241 39.1667 3.91699 33.2917 3.91699ZM28.3958 18.1149H24.9688V21.542C24.9688 22.3449 24.3029 23.0107 23.5 23.0107C22.6971 23.0107 22.0312 22.3449 22.0312 21.542V18.1149H18.6042C17.8013 18.1149 17.1354 17.4491 17.1354 16.6462C17.1354 15.8432 17.8013 15.1774 18.6042 15.1774H22.0312V11.7503C22.0312 10.9474 22.6971 10.2816 23.5 10.2816C24.3029 10.2816 24.9688 10.9474 24.9688 11.7503V15.1774H28.3958C29.1987 15.1774 29.8646 15.8432 29.8646 16.6462C29.8646 17.4491 29.1987 18.1149 28.3958 18.1149Z" fill="url(#paint1_linear_3482_2752)" />
          <defs>
            <linearGradient id="paint0_linear_3482_2752" x1="23.4998" y1="41.6143" x2="23.4998" y2="44.5518" gradientUnits="userSpaceOnUse">
              <stop stopColor="#51006C" />
              <stop offset="1" stopColor="#D352FF" />
            </linearGradient>
            <linearGradient id="paint1_linear_3482_2752" x1="23.5098" y1="3.91699" x2="23.5098" y2="43.0837" gradientUnits="userSpaceOnUse">
              <stop stopColor="#51006C" />
              <stop offset="1" stopColor="#D352FF" />
            </linearGradient>
          </defs>
        </svg>

      );
    default:
      return (

        <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.375 13.8456C29.375 12.5335 28.7288 11.3193 27.6321 10.5948L19.7987 5.36602C18.4867 4.48477 16.7633 4.48477 15.4513 5.36602L7.61792 10.5948C6.54083 11.3193 5.875 12.5335 5.875 13.8456V24.9689C5.875 25.5173 6.30583 25.9481 6.85417 25.9481H28.3958C28.9442 25.9481 29.375 25.5173 29.375 24.9689V13.8456ZM17.625 21.0523C15.745 21.0523 14.1979 19.5052 14.1979 17.6252C14.1979 15.7452 15.745 14.1981 17.625 14.1981C19.505 14.1981 21.0521 15.7452 21.0521 17.6252C21.0521 19.5052 19.505 21.0523 17.625 21.0523Z" fill="url(#paint0_linear_3482_2773)" />
          <path d="M43.0834 41.6146H40.5963V35.7396C42.4567 35.1325 43.808 33.3896 43.808 31.3334V27.4167C43.808 24.8513 41.7126 22.7559 39.1472 22.7559C36.5817 22.7559 34.4863 24.8513 34.4863 27.4167V31.3334C34.4863 33.37 35.818 35.0934 37.6392 35.72V41.6146H29.3751V29.8646C29.3751 29.3163 28.9442 28.8854 28.3959 28.8854H6.85425C6.30591 28.8854 5.87508 29.3163 5.87508 29.8646V41.6146H3.91675C3.11383 41.6146 2.448 42.2804 2.448 43.0834C2.448 43.8863 3.11383 44.5521 3.91675 44.5521H39.0297C39.0688 44.5521 39.0884 44.5717 39.1276 44.5717C39.1667 44.5717 39.1863 44.5521 39.2255 44.5521H43.0834C43.8863 44.5521 44.5522 43.8863 44.5522 43.0834C44.5522 42.2804 43.8863 41.6146 43.0834 41.6146ZM16.1563 35.7396C16.1563 34.9367 16.8222 34.2709 17.6251 34.2709C18.428 34.2709 19.0938 34.9367 19.0938 35.7396V41.6146H16.1563V35.7396Z" fill="url(#paint1_linear_3482_2773)" />
          <defs>
            <linearGradient id="paint0_linear_3482_2773" x1="17.625" y1="4.70508" x2="17.625" y2="25.9481" gradientUnits="userSpaceOnUse">
              <stop stopColor="#013918" />
              <stop offset="1" stopColor="#448960" />
            </linearGradient>
            <linearGradient id="paint1_linear_3482_2773" x1="23.5001" y1="22.7559" x2="23.5001" y2="44.5717" gradientUnits="userSpaceOnUse">
              <stop stopColor="#013918" />
              <stop offset="1" stopColor="#448960" />
            </linearGradient>
          </defs>
        </svg>

      );
  }
}

/* ------------------------------------------------------------------ */
/*                     FEATURE CARD (flips on hover)                   */
/* ------------------------------------------------------------------ */
function FeatureCard({
  item,
  isFa,
   
  mainData,
  
}: {
  item: FeatureSummaryItem;
  isFa: boolean;
    params:any;
  mainData:any;
}) {
  const iconKey = resolveIconKey(item.label);
  const color = ICON_COLORS[iconKey];
  const description = getKarbariDescription(mainData, iconKey);

  const faceBase =
    "absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-darkGray rounded-2xl p-5 flex flex-col";

  return (
    <div className={`w-full ${CARD_HEIGHT} group [perspective:1200px]`}>
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out  [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        {/* ---- front ---- */}
        <div className={`${faceBase} gap-4`}>
          <div className="flex items-center gap-3">
            <div
              className="rounded-xl w-full flex items-center justify-center absolute right-0 left-0 top-[-20px]"

            >
              <FeatureIcon iconKey={iconKey} color={color} />
            </div>
            <div className="text-center flex flex-col  w-full items-center mt-6">
              <p className="text-black dark:text-white font-bold text-base lg:text-2xl">
                {item.label}
              </p>
              <p className="text-lightGray dark:text-lightGray text-xs lg:text-sm mt-1">
                {isFa
                  ? `دارای ${item.current_count.toLocaleString("fa-IR")} بنای تکمیل شده`
                  : `${item.current_count.toLocaleString("en-US")} completed units`}
              </p>
            </div>
          </div>



          <div className="flex items-end justify-between text-center border-t border-solid border-x-0 border-b-0 border-[#EFEFEF] dark:border-[#2A2B32]">
            <div className="flex flex-col gap-1 pt-3 items-center mx-auto">
              <span className="text-black dark:text-white font-bold text-base">
                {item.bought_count.toLocaleString(isFa ? "fa-IR" : "en-US")}
              </span>
              <span className="text-lightGray text-[12px] lg:text-sm">
               {findByUniqueId(mainData, 597 )}
              </span>
            </div>
            <div className="h-full w-[1px] bg-[#EFEFEF] dark:bg-[#2A2B32]" />
            <div className="flex flex-col gap-1 items-center justify-center text-center mx-auto">
              <span className="flex items-center justify-center text-center gap-1 text-[12px] lg:text-sm font-bold text-[#F03A47]  text-base">

                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.0846 0.75H8.3096C11.0679 0.75 12.2013 2.70833 10.8179 5.1L9.70126 7.025L8.5846 8.95C7.20126 11.3417 4.94293 11.3417 3.5596 8.95L2.44293 7.025L1.32626 5.1C-0.0320705 2.70833 1.09293 0.75 3.8596 0.75H6.0846Z" stroke="#F03A47" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {item.sold_count.toLocaleString(isFa ? "fa-IR" : "en-US")}
              </span>

              <span className="text-lightGray text-[12px] lg:text-sm">
               {findByUniqueId(mainData, 1791 )}
              </span>
            </div>
          </div>
        </div>

        {/* ---- back ---- */}
        <div
          className={`${faceBase} justify-between items-center gap-3`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="rounded-xl w-full flex items-center justify-center absolute right-0 left-0 top-[-20px]"

            >
              <FeatureIcon iconKey={iconKey} color={color} />
            </div>

          </div>
          <p className="text-[#84858F] text-xs mt-2 text-center lg:text-sm leading-6 line-clamp-4 flex-1">
            {description}
          </p>
          <a
            href="#"
            className="text-blueLink dark:text-dark-primary text-center text-xs lg:text-sm font-bold"
          >
           {findByUniqueId(mainData, 774 )}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                                SKELETON                              */
/* ------------------------------------------------------------------ */
function FeatureCardSkeleton() {
  return (
    <div
      className={`bg-white dark:bg-darkGray rounded-2xl p-5 flex flex-col gap-4 ${CARD_HEIGHT} animate-pulse`}
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/10 shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3 w-2/3 rounded bg-black/5 dark:bg-white/10" />
          <div className="h-2.5 w-3/4 rounded bg-black/5 dark:bg-white/10" />
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex justify-between pt-3 border-t border-black/5 dark:border-white/10">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-10 rounded bg-black/5 dark:bg-white/10" />
          <div className="h-2.5 w-14 rounded bg-black/5 dark:bg-white/10" />
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="h-4 w-10 rounded bg-black/5 dark:bg-white/10" />
          <div className="h-2.5 w-14 rounded bg-black/5 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                         MAIN FEATURES SUMMARY                        */
/* ------------------------------------------------------------------ */
export default function FeaturesSummary({
  params,
  mainData,
}: {
  params: any;
  mainData: any;
}) {
  const lang: string = params?.lang || "fa";
  const isFa = lang.toLowerCase() === "fa";

  const [period, setPeriod] = useState<Period>("weekly");

  // Discovered from the first (unfiltered) API response, since the full
  // list of karbari codes isn't documented ahead of time. Shared with
  // FeaturesChart so both stay in sync off the same filters.
  const [knownKarbari, setKnownKarbari] = useState<KarbariOption[]>([]);
  const [selectedKarbari, setSelectedKarbari] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  const [summaryData, setSummaryData] = useState<FeatureSummaryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isAllSelected =
    knownKarbari.length > 0 && selectedKarbari.length === knownKarbari.length;

  const toggleAll = () => {
    setSelectedKarbari(isAllSelected ? [] : knownKarbari.map((k) => k.code));
  };

  const toggleKarbari = (code: string) => {
    setSelectedKarbari((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  /* ---------------------- data fetching ---------------------- */
  const fetchSummary = async (codesOverride?: string[] | null) => {
    try {
      setLoading(true);
      setError(false);

      const qs = new URLSearchParams();
      const codes = codesOverride !== undefined ? codesOverride : selectedKarbari;
      const sendFilter =
        codes !== null && knownKarbari.length > 0 && codes.length < knownKarbari.length;

      if (sendFilter) {
        (codes as string[]).forEach((c) => qs.append("karbari", c));
      }
      qs.append("period", period);

      const res = await axios.get(
        `https://dev-api.metarang.com/api/citizen/${params.id}/features/summary?${qs.toString()}`,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("[features/summary] raw response:", res.data);

      const data: FeatureSummaryItem[] = res.data?.data || [];
      setSummaryData(data);

      if (!initialized) {
        const codesFromResponse = data.map((d) => ({
          code: d.karbari,
          label: d.label,
        }));
        setKnownKarbari(codesFromResponse);
        setSelectedKarbari(codesFromResponse.map((c) => c.code));
        setInitialized(true);
      }
    } catch (err) {
      console.error("Error fetching features summary:", err);
      setError(true);
      setSummaryData([]);
    } finally {
      setLoading(false);
    }
  };

  // first load: fetch unfiltered to discover available karbari codes
  useEffect(() => {
    fetchSummary(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-fetch ("sort") whenever the period or filters change, after init
  useEffect(() => {
    if (!initialized) return;
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, JSON.stringify(selectedKarbari)]);

  const orderedSummary = knownKarbari
    .map((k) => summaryData.find((s) => s.karbari === k.code))
    .filter(Boolean) as FeatureSummaryItem[];

  const gridChildren = orderedSummary.map((item) => (
    <FeatureCard key={item.karbari} item={item} isFa={isFa} mainData={mainData} params={params}/>
  ));

  return (
    <div className="w-full pt-7 flex flex-col gap-3 mt-6">
      {/* header */}
      <div className="flex flex-col gap-3">
        <h2 className="text-black dark:text-white text-lg font-black lg:text-2xl font-rokh">
          {findByUniqueId(mainData, 1784 ) }
        </h2>
        <p className="text-[#A0A0AB] text-base my-1 lg:text-lg">
          {findByUniqueId(mainData, 1785 )}
        </p>
      </div>

      {/* karbari filters — shared by cards below AND the chart */}
      <div className="flex items-center justify-between gap-10 mt-10">
        {/* period ("sort") switch — same style/markup as the referral page */}
        <div className="flex justify-between gap-4 md:max-w-[50%] lg:max-w-[30%] h-[64px]">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setPeriod(opt.key)}
              className={`moment bg-white dark:bg-darkGray text-[#84858F] p-2 rounded-xl w-full px-7 ${
                period === opt.key
                  ? "border-2 border-light-primary dark:border-dark-yellow border-solid dark:text-dark-yellow text-light-primary font-bold"
                  : ""
              }`}
            >
              {findByUniqueId(mainData, opt.uniqueId) || opt.fallback}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleAll}
              className="accent-light-primary dark:accent-dark-yellow w-4 h-4"
            />
            {isFa ? "تمام کاربری‌ها" : "All feature types"}
          </label>

          {knownKarbari.map((k) => (
            <label
              key={k.code}
              className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white"
            >
              <input
                type="checkbox"
                checked={selectedKarbari.includes(k.code)}
                onChange={() => toggleKarbari(k.code)}
                className="accent-light-primary dark:accent-dark-yellow w-4 h-4"
              />
              {k.label}
            </label>
          ))}
        </div>
      </div>

      {/* summary cards */}
      {error && (
        <p className="w-full text-center text-red-400 py-4">
          {isFa ? "خطا در دریافت اطلاعات." : "Failed to load data."}
        </p>
      )}

      {!error && initialized && selectedKarbari.length === 0 && (
        <p className="w-full text-center text-lightGray py-4">
          {isFa ? "حداقل یک کاربری را انتخاب کنید." : "Select at least one feature type."}
        </p>
      )}

      {!error && (!initialized || selectedKarbari.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 gap-y-14 mt-10 w-full py-2">
          {loading && orderedSummary.length === 0
            ? Array.from({ length: 7 }).map((_, i) => <FeatureCardSkeleton key={i} />)
            : gridChildren}
        </div>
      )}

      {/* chart — separate component, driven by the same period/filters */}
      {initialized && (
        <FeaturesChart
          params={params}
          period={period}
          selectedKarbari={selectedKarbari}
          knownKarbari={knownKarbari}
          isAllSelected={isAllSelected}
          lang={lang}
        />
      )}
    </div>
  );
}