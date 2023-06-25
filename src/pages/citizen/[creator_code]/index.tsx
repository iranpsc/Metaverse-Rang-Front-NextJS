import React, { useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from 'next';
import axiosHelper from "@/helper/axios";
import { API } from "@/types/api-routes/index"
import StickyMenu from "@/components/organsims/sticky-menu"
import ProfilePhoto from "@/components/molecules/citizen/profile-photo"
import PhotoGallery from "@/components/molecules/citizen/photo-gallery"
import PhotoGalleryMobile from "@/components/molecules/citizen/photo-gallery-mobile"
import InfoBox from "@/components/molecules/citizen/info-box"
import About from "@/components/molecules/citizen/about"
import Details from "@/components/molecules/citizen/details"
import ProfilePhotoMobile from "@/components/molecules/citizen/profile-photo-mobile"
import Navbar from "@/components/organsims/navbar"
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import type { CitizenResponse } from "@/types/api/index"

const inter = Inter({ subsets: ["latin"] });

interface CitizenPageProps {
    data: any;
    creator_code: string;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { creator_code } = context.query;
    const data: CitizenResponse = await axiosHelper<CitizenResponse>(`${API.Citizen}/${creator_code }`, 'get', {});
    return {
      props: {
        data,
        creator_code
      }
    }
  };

export default function CitizenPage({data, creator_code}:CitizenPageProps) {
    const [isOpen, setIsOpen] = useState(false);
    function handleIsOpenChange(newIsOpen: boolean) {
        setIsOpen(newIsOpen);
      }
return (
    <>
      <Head>
        <title>{data.data.name} - پروفایل کاربری</title>
        <meta name="description" content="آموزش متاورس" />
        <meta
  name="description"
  content={JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Person",
    "nationality": "Iranian",
    "name": data.data.level.name,
    "familyName": data.data.level.name,
    "birthDate": data.data.kyc?.birth_date,
    "telephone": data.data.kyc?.phone,
    "email": data.data.kyc?.email,
    "address": data.data.kyc?.address,
    "knowsAbout": data.data?.customs?.passions,
    "identifier": data.data.code,
    "additionalName": "undefined",
    "jobTitle": data.data.customs?.occupation,
    "alumniOf": data.data.position,
    "url": `https://rgb.irpsc.com/citizen/${data.data.code}`,
    "image": data.data.profilePhotos[0].url
  })}
/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.rgbmain} ${inter.className}  bg-[#F0F1F4] pb-[80px]`}>
        {/*mobile*/}
        <Navbar className="md:hidden"/>
        <div className="md:hidden">
            {data && data.data && 
                <ProfilePhotoMobile 
                    src={data.data.profilePhotos[0].url} 
                    name={data.data.name}
                    levelName={data.data.level.name}
                    levelSlug={data.data.level.slug}
                />
            }
                <PhotoGalleryMobile/>
                <InfoBox 
                    code={creator_code}
                    name={data.data?.name}
                    position={data.data?.position}
                    registered_at={data.data?.registered_at}
                    score={data.data.score}
                    level_images={data.data.level.levels_images}
                />
                <About 
                    birth_date={data.data.kyc?.birth_date}
                    phone={data.data.kyc?.phone}
                    email={data.data.kyc?.email}
                    address={data.data.kyc?.address}
                    about={data.data.customs?.about}
                />
                <Details 
                    occupation={data.data.customs?.occupation}
                    education={data.data.customs?.education}
                    loved_city={data.data.customs?.loved_city}
                    loved_country={data.data.customs?.loved_country}
                    loved_language={data.data.customs?.loved_language}
                    prediction={data.data.customs?.prediction}
                    memory={data.data.customs?.memory}
                    avatar={data.data?.avatar}
                    passions={data.data?.customs?.passions}
                />
        </div>
        <StickyMenu onIsOpenChange={handleIsOpenChange} className="hidden md:flex"/>
        <div 
            style={{ alignItems: "stretch", height: "93vh" }} 
            className={`hidden md:flex ${isOpen == true ? 'mr-[105px]' : 'mr-[55px]'} ${isOpen == true ? 'w-[88vw]' : 'w-[93vw]'} `}
        >
            <div 
                style={{ flex: `${isOpen ? '0 0 20vw' : '0 0 25vw'}`, height: '93vh' }}
            >
                {data && data.data && 
                    <ProfilePhoto 
                        src={data.data.profilePhotos[0].url} 
                        name={data.data.name}
                        levelName={data.data.level.name}
                        levelSlug={data.data.level.slug}
                    />
                }
                <InfoBox 
                    code={data.data.code}
                    name={data.data.name}
                    position={data.data.position}
                    registered_at={data.data.registered_at}
                    score={data.data.score}
                    level_images={data.data.level.levels_images}
                />
            </div>
            <div
                style={{ flex: "0 0 68vw", height: "93vh" }}
            >
                <About 
                    birth_date={data.data.kyc?.birth_date}
                    phone={data.data.kyc?.phone}
                    email={data.data.kyc?.email}
                    address={data.data.kyc?.address}
                    about={data.data.customs?.about}
                />
                <Details 
                    occupation={data.data.customs?.occupation}
                    education={data.data.customs?.education}
                    loved_city={data.data.customs?.loved_city}
                    loved_country={data.data.customs?.loved_country}
                    loved_language={data.data.customs?.loved_language}
                    prediction={data.data.customs?.prediction}
                    memory={data.data.customs?.memory}
                    avatar={data.data?.avatar}
                    passions={data.data?.customs?.passions}
                />
            </div>
        </div>
      </main>
    </>
  );
}