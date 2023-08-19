import React from "react";

interface LangProps {
  params: {
    lang: string;
  };
}

const Lang: React.FC<LangProps> = ({ params }) => {
  return <div>{params.lang}</div>;
};

export default Lang;
