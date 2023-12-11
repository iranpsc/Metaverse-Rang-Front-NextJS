import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Items } from "@/components/utils/items";

export default function ScrollAnimation() {
  const firstItem = Items[0];

  return (
    <div>
      <div key={firstItem.id}>
        <h1>{firstItem.desc}</h1>
        <p>{firstItem.subtitleItems}</p>
        <div className="flex flex-col ">
          {firstItem.subItems.map((k: any) => (
            <div key={k.id}>
              <p>{k.name}</p>
              <p>{k.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
