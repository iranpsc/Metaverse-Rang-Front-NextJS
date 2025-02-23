type Language = "fa" | "en";

export const switchDigits = (
  input: string | number,
  language: Language
): string => {
  const persianDigits: string[] = [
    "۰",
    "۱",
    "۲",
    "۳",
    "۴",
    "۵",
    "۶",
    "۷",
    "۸",
    "۹",
  ];
  const englishDigits: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  // Convert input to string if it's a number
  const inputStr: string = input.toString();

  if (language === "fa") {
    // Convert English digits to Persian digits
    return inputStr.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
  } else if (language === "en") {
    // Convert Persian digits to English digits
    return inputStr.replace(
      /[۰-۹]/g,
      (d) => englishDigits[persianDigits.indexOf(d)]
    );
  }

  return inputStr; // In case there's any invalid language code, we just return the original input
};
