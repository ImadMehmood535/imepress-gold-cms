"use client";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader } from "lucide-react";
import React from "react";

const Button = ({
  className = "",
  text,
  icon,
  isLoading = false,
  onClick,
  variant = "primary",
  type = "button",
  right,
  left,
  disabled,
}) => {
  const buttonClasses = ` rounded-lg  flex items-center justify-center ${className}`;

  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses = "text-white bg-black px-6 py-4";
      break;
    case "blue":
      variantClasses = "text-white bg-blue-500";
      break;
    case "secondary":
      variantClasses = "text-white bg-black px-4 py-1";
      break;
    default:
      variantClasses = "text-white bg-black";
  }

  return (
    <button
      type={type}
      className={`${variantClasses} ${buttonClasses}`}
      onClick={() => {
        if (!isLoading) {
          onClick();
        }
      }}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : icon ? (
        icon
      ) : null}
      {left && <ChevronLeft size={20} />}
      {text}
      {right && <ChevronRight size={20} />}
    </button>
  );
};

export default Button;
