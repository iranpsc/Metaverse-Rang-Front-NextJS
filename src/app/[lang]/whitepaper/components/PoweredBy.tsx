// components/PoweredBy.tsx
export default function PoweredBy() {
  // تاریخ و ساعت مطابق با تصویر
  const formattedTime = "10:37 PM";
  const formattedDay = "Wednesday, February 25, 2026";

  return (
    <div className="flex flex-col items-end justify-between h-full min-h-[80vh] text-right">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white tracking-wide">
          Powered by Avalanche
        </h2>
        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
          The future of blockchain adoption won&apos;t happen on one chain—it&apos;ll happen across thousands of purpose-built L1s. Avalanche is where they&apos;re built...
        </p>
      </div>

      <div className="mt-auto pt-12">
        <div className="text-gray-500 text-sm space-y-1">
          <p>{formattedTime}</p>
          <p>{formattedDay}</p>
        </div>
      </div>
    </div>
  );
}