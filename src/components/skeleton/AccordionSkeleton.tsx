import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت دقیق Accordion — مطابق کد واقعی: هدر/چوان فعلاً کامنت شده (غیرفعاله)،
 * فقط یه بلوک متن (dangerouslySetInnerHTML) با border-b-2 پایینشه.
 */
export function AccordionSkeleton() {
  return (
    <div className="w-full pb-5 flex flex-col gap-4 border-b-2 border-solid border-t-0 border-x-0 border-[#ECECEC] dark:border-gray-1">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
      </div>
    </div>
  );
}
