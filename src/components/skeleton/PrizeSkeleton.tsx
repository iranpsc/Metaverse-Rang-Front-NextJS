import { DetailItemSkeleton } from "./DetailItemSkeleton";

// معادل دقیق Prize: ۵ DetailItem (psc, red, blue, satisfaction, yellow)
export default function PrizeSkeleton() {
  return (
    <div className="flex flex-wrap justify-between">
      {Array.from({ length: 5 }).map((_, i) => (
        <DetailItemSkeleton key={i} />
      ))}
    </div>
  );
}
