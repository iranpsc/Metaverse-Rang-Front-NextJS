import { useContext } from "react";
import { LangContext } from "@/context/LangContext";

export default function LanguageList(){
  const { languagesData, languageSelected,setLanguagesSelected } =
    useContext(LangContext);

  const handleDirChange = (event: any) => {
    const [selectedId, selectedDirection] = event.target.value.split(",");
   setLanguagesSelected({
     id: parseInt(selectedId),
     dir: selectedDirection,
     code:"",
     name:"",
     icon:"",
     file_url:""
    
   });
  };
  
  return (
    <>
      <select
        className=""
        onChange={handleDirChange}
        value={languageSelected.name}
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