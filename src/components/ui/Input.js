/** @format */

import { Copy, EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";

// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const Input = ({
  register,
  label,
  placeholder,
  name,
  type,
  errors,
  customClass,
  required,
  disabled,
  copy,
  newClass,
  onchange,
  refrence,
  isOpenDropdown,
  value,
}) => {
  const [show, setShow] = useState(false);

  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
  }
  function copyText() {
    // Get the text field
    var copyText = document.getElementById(name);

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator?.clipboard?.writeText(copyText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied";
  }

  return (
    <div
      className={
        newClass
          ? newClass
          : `${customClass} mt-4 px-4 relative py-2 rounded-lg`
      }
    >
      {label && (
        <label
          htmlFor={name}
          className="relative flex flex-1 py-2 items-center  text-sm"
        >
          {label}
          {required && (
            <span className="text-red-500 absolute text-xl top-0 -left-3">
              *
            </span>
          )}
          {errors && errors[name]?.message && (
            <span className="ml-2 text-red-500 text-xs">
              {errors[name]?.message}
            </span>
          )}
        </label>
      )}
      <div className="flex items-center border-2 border-gray-300  py-2 px-4 rounded-lg   ">
        <input
          disabled={disabled}
          onChange={onchange}
          defaultValue={value}
          id={name}
          multiple
          ref={refrence}
          {...register(name)}
          step="any"
          type={(!show && type) || "text"}
          className={
            "flex-1 bg-transparent py-2 rounded-sm align-middle text-sm w-fit outline-none  "
          }
          // placeholder={placeholder}
        />

       
        {type == "password" && (
          <p className="cursor-pointer" onClick={() => setShow(!show)}>
            {show ? <EyeIcon size={20} /> : <EyeOff size={20} />}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
