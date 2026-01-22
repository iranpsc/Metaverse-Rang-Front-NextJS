// components/skeletons/TabContentSkeleton.tsx

export default function TabContentSkeleton() {
  return (
    <div className="grid-third w-full bg-white md:min-w-[65vw] xl:min-w-[65vw] px-1 animate-pulse">
      <div className="h-6 w-1/3 bg-white rounded mb-5" />
      <div className="space-y-4">
        <div className="h-4 bg-white rounded" />
        <div className="h-4 bg-white rounded w-11/12" />
        <div className="h-4 bg-white  rounded w-10/12" />
      </div>
      <div className="mt-6 h-[180px] bg-white rounded-xl" />
    </div>
  );
}
