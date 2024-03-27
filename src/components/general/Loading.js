import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <Loader className="mr-2 h-[2rem] w-[2rem] animate-spin" />
    </div>
  );
};

export default Loading;
