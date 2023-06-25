import React from "react";
import { GetServerSideProps } from 'next';
import SearchBar from "@/components/molecules/trainings/search-bar";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import BestTrainers from "@/components/molecules/trainings/best-trainers";
import TrainingCategories from "@/components/organsims/training-categories"
import LatestVideos from "@/components/organsims/latest-videos"
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index"
import { CategoryData, VideoData } from "@/types/api/index"
import Layout from "@/components/template/layout";

const inter = Inter({ subsets: ["latin"] });
interface TrainingsProps {
  data: VideoData;
  categoryData: CategoryData[];
}
export const getServerSideProps: GetServerSideProps = async () => {
  const data: VideoData[] = await axiosHelper<VideoData[]>(API.Tutorials, 'get', {});
  const categoryData: CategoryData[] = await axiosHelper<CategoryData[]>(API.Categories, 'get', {});
  return {
    props: {
      data,
      categoryData
    }
  }
};

export default function Trainings({ data, categoryData }: TrainingsProps) {
  return (
    <Layout>
      <Head>
        <title>آموزش متاورس</title>
        <meta name="description" content="آموزش متاورس" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://rgb.irpsc.com/trainings"/>
        <meta property="og:locale" content="fa_IR"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="آموزش | متاورس ایران | متاورس رنگ"/>
        <meta property="og:description" content="آموزش های ویدیویی مرتبط با بخش های مختلف متاورس رنگ یا همان متارنگ"/>
        <meta property="og:site_name" content="متارنگ"/>
        <meta property="og:url" content="https://rgb.irpsc.com/"/>
        <meta name="google-site-verification" content="lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4"/>
      </Head>
      <main className={`${styles.main} ${inter.className}  bg-white lg:mr-[50px] lg:ml-[50px]`}>
        <SearchBar />
        <BestTrainers />
        <TrainingCategories categoryData={categoryData}/>
        <LatestVideos data={data}/>
      </main>
    </Layout>
  );
}
