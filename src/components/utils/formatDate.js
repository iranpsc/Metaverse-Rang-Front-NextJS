import jalaali from "jalaali-js";
import { switchDigits } from "./DigitSwitch";

const pad = (n) => (n < 10 ? "0" + n : n.toString());

export const formatDate = (dateString, lang = "en") => {
  const [jy, jm, jd] = dateString.split("/").map(Number);

  if (lang === "fa") {
    return switchDigits(`${jy}/${pad(jm)}/${pad(jd)}`, lang);
  } else {
    const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
    return switchDigits(`${gy}/${pad(gm)}/${pad(gd)}`, lang);
  }
};
