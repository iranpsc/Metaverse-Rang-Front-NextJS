import React from "react";
import { GetServerSideProps } from 'next';
import Head from "next/head";
import { Inter } from "next/font/google";
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index"
import type { SingleVideo, VideoData, CommentData } from "@/types/api/index"
import SingleVideoCard from '@/components/organsims/single-video-card'
import SingleVideoSideBar from "@/components/organsims/single-video-sidebar"
import Comment from "@/components/organsims/comments/comment"
import NewComment from "@/src/components/organsims/comments/new-comment";
import Layout from "@/components/template/layout";

import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });

export interface TrainingsProps {
  video: VideoData;
  data: SingleVideo;
  tutorials: VideoData;
  comments: CommentData;
  category: string;
  id: string
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { category } = context.query;
  const video: VideoData[] = await axiosHelper<VideoData[]>(API.Tutorials, 'get', {});
  const data: SingleVideo = await axiosHelper<SingleVideo>(`${API.SingleVideo}/${id}`, 'get', {});
  const tutorials: VideoData = await axiosHelper<VideoData>(API.Tutorials, 'get', {});
  const comments: CommentData = await axiosHelper<CommentData>(`${API.Tutorials}/${id}/comments`, 'get', {});
  return {
    props: {
      video,
      data,
      tutorials,
      comments,
      id
    }
  }
};
export default function SingleVideo(props:TrainingsProps) {
return (
    <Layout>
      <Head>
        <title>آموزش متاورس</title>
        <meta name="description" content="آموزش متاورس" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}  bg-white pt-6`}>
        <div className="grid-cols-1 lg:grid lg:grid-cols-4">
          <div className="ml-[5px] col-span-1 hidden lg:flex mx-auto border border-gray-lighter overflow-y-auto">
            <SingleVideoSideBar data={props.tutorials.data} links={props.tutorials.links} meta={props.tutorials.meta}/>
          </div>
          <div className="col-span-3 border border-gray-lighter">
            <SingleVideoCard videoId={props.id} videoData={props.data.data}/>
            <div className="flex justify-center my-[20px] mr-[10px] ml-[10px]">
              <NewComment VideoId={props.id}/>
            </div>
            <div className="flex w-full my-[10px] mr-[10px]">
              <Comment VideoId={props.id} comments={props.comments}/>
            </div>
              {/*<LatestVideos data={props.video}/>*/}
          </div>
          <div className="col-span-1 lg:hidden  mx-auto border border-gray-lighter overflow-y-auto mt-[5px]">
            <SingleVideoSideBar data={props.tutorials.data} links={props.tutorials.links} meta={props.tutorials.meta}/>
          </div>
        </div>
      </main>
    </Layout>
  );
}