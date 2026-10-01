export default function ImageBoxSkeleton() {
  return (
    <div className="w-full flex flex-col items-center animate-pulse sticky top-0">
      <div className="w-[90%] md:w-full aspect-[5/7] bg-gray-2 rounded-xl" />
      <div className="flex gap-4 mt-4">
        <div className="w-[63px] h-[44px] bg-gray-2 rounded-lg" />
        <div className="w-[63px] h-[44px] bg-gray-2 rounded-lg" />
        <div className="w-[63px] h-[44px] bg-gray-2 rounded-lg" />
      </div>
    </div>
  );
}