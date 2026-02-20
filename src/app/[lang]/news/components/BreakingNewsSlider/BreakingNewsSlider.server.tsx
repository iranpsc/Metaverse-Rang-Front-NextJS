import Image from "next/image";
import dynamic from "next/dynamic";

const BreakingNewsSliderClient = dynamic(
  () => import("./BreakingNewsSlider.client"),
  { ssr: false }
);

export default function BreakingNewsSlider({
  news,
  lang,
  mainData,
}: any) {
  if (!news?.length) return null;

  const first = news[0];

  return (
    <section className="relative w-full mt-10 h-[480px] overflow-hidden">
      {/* ✅ LCP IMAGE — MUST BE FIRST & VISIBLE */}
      <Image
        src={first.image}
        alt={first.title + "tor"}
        fill
        priority
        fetchPriority="high"
        sizes="10vw"
        unoptimized
        className="object-cover"
      />

      {/* Gradient overlay (OK for LCP) */}
      <div className="absolute inset-0 bg-[#f8f8f8] dark:bg-black z-10" />

      {/* Client slider (NOT LCP) */}
      <div className="absolute inset-0 z-20">
        <BreakingNewsSliderClient
          news={news}
          lang={lang}
          mainData={mainData}
        />
      </div>
    </section>
  );
}