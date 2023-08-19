import React from "react";

interface LangProps {
  params: {
    userId: string;
  };
}

const user: React.FC<LangProps> = ({ params }) => {
  return <section></section>;
};

export default user;
