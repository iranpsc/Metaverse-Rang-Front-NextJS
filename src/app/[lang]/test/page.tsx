import { switchDigits } from "@/components/utils/DigitSwitch";
import {
  getLangArray,
  getMainFile,
  getTranslation,
} from "@/components/utils/actions";

export default async function TestPage({ params }: { params: any }) {
  const langData = await getTranslation(params.lang);

  const mainData = await getMainFile(langData);

  return (
    <div className="relative w-full">
      <div>
        <p>persian:::{switchDigits(11112, "fa")}</p>
        <p>persian:::{switchDigits("1111", "fa")}</p>
        <p>latin:::{switchDigits("۵۵۵", "en")}</p>
      </div>
    </div>
  );
}
