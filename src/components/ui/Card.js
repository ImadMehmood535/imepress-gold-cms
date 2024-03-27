import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <article className={`${className} border p-6 rounded-lg bg-white`}>
      {children}
    </article>
  );
};

export default Card;
