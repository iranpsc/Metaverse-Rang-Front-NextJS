import dynamic from "next/dynamic";

const DynamicVideoPlayer = dynamic(() => import("./SingleVideoPlayModule"), {
  ssr: false,
});

export default DynamicVideoPlayer;
