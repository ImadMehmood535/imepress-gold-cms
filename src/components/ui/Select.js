/** @format */

import { useEffect, useState } from "react";

const Select = ({
  register,
  label,
  name,
  errors,
  options,
  value,
  customClass,
  disabled,
  onChange,
  currentOption,
}) => {
  // let optionsData = [
  // // { id: null, name: "please select" },
  //   ...options,
  // ];
  const [optionsData, setOptionsData] = useState([...options]);

  useEffect(() => {
    // setOptionsData([...options]);
    if (currentOption) {
      let filterArray = options?.filter(
        (item) => item.id === currentOption?.id
      );
      if (filterArray.length > 0) {
        setOptionsData([
          currentOption,
          ...options.filter((item) => item?.id !== currentOption?.id),
        ]);
      }
    } else {
      setOptionsData([...options]);
    }
  }, [options, currentOption]);

  // console.log(optionsData, "data inside select...");

  return (
    <div className={`mt-4 px-4 py-2 rounded-lg bg-gray-200/95 ${customClass}`}>
      <label
        htmlFor={name}
        className="relative flex flex-1 py-2 items-center  text-sm"
      >
        {label}
        {errors && errors[name]?.message && (
          <span className="ml-2 text-red-500 text-xs">
            {errors[name]?.message}
          </span>
        )}
      </label>
      <div className="flex items-center border py-3 px-4 rounded-lg bg-white/90">
        <select
          {...register(name)}
          id={name}
          defaultValue={value}
          className={
            "flex-1 bg-transparent align-middle text-sm w-fit outline-none accent-green-600 break-words text-blue-600 "
          }
          disabled={disabled}
          onChange={onChange}
        >
          <option value="">
            please select
          </option>
          {optionsData?.map((i) => {
            return (
              <option value={i?.id} key={i?.name}>
                {`${i?.name}`}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Select;
