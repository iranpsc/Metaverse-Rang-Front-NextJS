import { useContext, useState } from "react";
import { LangContext } from "../context/LangContext";



export default function LanguageList(){
  

  const { languagesData, selectedDir, setSelectedDir, setSelectedIdLang } =
    useContext(LangContext);
 

  const handleDirChange = (event: any) => {
    const [selectedId, selectedDirection] = event.target.value.split(",");
    setSelectedDir(selectedDirection);
    setSelectedIdLang(selectedId);
  };

  return (
    <>
      <select
        className=""
        onChange={handleDirChange}
        value={selectedDir}
      >
        <option selected>Language</option>
        {languagesData.map((item: any) => (
          <option key={item.id} value={`${item.id},${item.direction}`}>
            {item.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}