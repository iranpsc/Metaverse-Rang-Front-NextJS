import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { fallbackMessages } from "./fallbackMessages";

export type Translate = (id: number) => string;

/**
 * Looks a unique ID up in the translation dictionary of the app (`mainData`). When the dictionary does not
 * contain it yet, the local fallback text is used instead of the bare ID.
 */
export function createTranslator(mainData: object | null | undefined, lang: string): Translate {
  const fallback = fallbackMessages[lang === "fa" ? "fa" : "en"];
  return (id) => {
    const value = findByUniqueId(mainData, id);
    return value !== String(id) ? value : (fallback[id] ?? value);
  };
}
