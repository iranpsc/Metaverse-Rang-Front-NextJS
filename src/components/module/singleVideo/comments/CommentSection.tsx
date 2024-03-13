import { checkData } from "@/components/utils/targetDataName";
import CommentList from "./CommentList";

const CommentSection = ({ DataVideo }: any) => {
  const data = [
    { id: 1, type: "you" },
    { id: 2, type: "me" },
    { id: 3, type: "you" },
    { id: 4, type: "you" },
    { id: 5, type: "me" },
    { id: 6, type: "you" },
  ];
  return (
    <div className="w-full xl:max-h-[700px] lg:max-h-[700px]  mt-10 pt-5 px-5 bg-white dark:bg-singleVideo-dark-background rounded-t-[20px] xl:overflow-y-scroll overflow-x-clip flex flex-col justify-start items-center gap-10">
      <h1 className="w-full text-start  text-singleVideo_title text-singleVideo-gray dark:text-white font-azarMehr font-bold ">
        {checkData(DataVideo?.tsitle)}
      </h1>

      {data.map((item) => (
        <CommentList key={item.id} DataVideo={DataVideo} typeData={item.type} />
      ))}
    </div>
  );
};

export default CommentSection;
