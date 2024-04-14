import React, { useEffect, useState } from "react";

const SwitchToggle = ({ name, register, label, value }) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };




  return (
    <div className="flex items-center">
      <input
        id={name}
        name={name}
        type="checkbox"
        className="hidden"
        defaultValue={isChecked}
        {...register(name)}
      />
      <label
        htmlFor={name}
        className="flex items-center cursor-pointer"
        onClick={handleCheckboxChange}
      >
        <div className="relative">
          <div className="w-12 h-6 bg-gray-400 rounded-full shadow-inner transition-colors duration-300 ease-in-out"></div>
          <div
            className={`${
              isChecked
                ? "bg-green-400 right-0 transition-all"
                : "bg-gray-200 left-0 transition-all"
            } absolute  w-6 h-6 rounded-full shadow inset-y-0  focus-within:shadow-outline transition-all duration-300 ease-in-out transform`}
          ></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">{label}</div>
      </label>
    </div>
  );
};

export default SwitchToggle;
