import "@/styles/globals.css";
import 'src/index.css'
import Head from 'next/head'
import { GetServerSideProps } from 'next';
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index"
import { Video } from "@/types/api/index";
import type { AppProps } from "next/app";
import Layout from "../components/template/layout";

export default function App({ Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <link href="/fonts/BebasNeue-Regular.ttf" rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link href="/fonts/BrunoAceSC-Regular.ttf" rel="preload" as="font" type="font/woff" crossOrigin="anonymous" />
        <link href="/fonts/DigiHamisheBold.ttf" rel="preload" as="font" type="font/woff" crossOrigin="anonymous" />
        <link href="/fonts/DigiHamisheRegular.ttf" rel="preload" as="font" type="font/woff" crossOrigin="anonymous" />
        <link href="/fonts/JannaLTBold.ttf" rel="preload" as="font" type="font/woff" crossOrigin="anonymous" />
        <link href="/fonts/Sans.ttf" rel="preload" as="font" type="font/woff" crossOrigin="anonymous" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
