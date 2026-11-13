import { findByUniqueId } from "@/components/utils/findByUniqueId";

export const formatNumber = (
  likes: string | number | null | undefined,
): string => {
  const numericLikes =
    typeof likes === "string"
      ? Number.parseInt(likes, 10)
      : likes;

  // API responses may omit counters for newly-created or partially populated
  // categories. Treat an unavailable/invalid count as zero instead of crashing
  // the server-rendered page.
  if (numericLikes == null || !Number.isFinite(numericLikes)) {
    return "0";
  }

  if (numericLikes >= 1000) {
    return numericLikes <= 1099
      ? (numericLikes / 1000).toFixed(0) + "k"
      : (numericLikes / 1000).toFixed(1) + "k";
  }

  return numericLikes.toString();
};

export const translateFooter = (data: any, text: string) => {
  return findByUniqueId(data, text);
};
