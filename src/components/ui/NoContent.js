/** @format */

import React, { ReactNode } from "react";
import Button from "./Button";
import { Plus } from "lucide-react";

const NoContent = ({
  icon,
  onClick,
  title,
  type,
  content,
  button,
  btnShow,
}) => {
  return (
    <div className="border-dashed border-2 text-center p-8 rounded-lg">
      <div className="border-dashed border-2 text-black/80 w-[10rem] h-[10rem] p-8 mb-8 rounded-full flex items-center justify-center mx-auto">
        {icon}
      </div>
      <h2 className="text-3xl font-bold mb-2">
        {title || `No ${type} `}
      </h2>
      <p>
        {content ||
          `You don't have any ${type} yet. ${
            onClick ? "Start creating content." : ""
          }`}
      </p>
      
    </div>
  );
};

export default NoContent;
