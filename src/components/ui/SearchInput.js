import React, { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
const SearchInput = ({
  getOptions,
  register,
  label,
  placeholder,
  name,
  type,
  show,
  options,
  errors,
  customClass,
  required,
  disabled,
}) => {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const filteredOptions =
    query !== "" &&
    options?.filter((i) =>
      i?.postalCode
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.toLowerCase().replace(/\s+/g, ""))
    );
  return (
    <div
      className={`${customClass} mt-4 px-4 relative py-2 pb-[46px] 
       rounded-lg bg-gray-200/95`}
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
      <div className="absolute top-10 w-[92.5%]">
        <Combobox value={selected} onChange={setSelected} disabled={disabled}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left outline-none sm:text-sm">
              <Combobox.Input
                id={name}
                {...register(name)}
                step="any"
                placeholder={placeholder}
                type={(!show && type) || "text"}
                className="w-full border-none py-2 outline-none pl-3 pr-10 text-sm leading-5 text-blue-500 tooltip"
                onChange={(event) => {
                  getOptions(event.target.value);
                  // console.log(eve);
                  setQuery(event.target.value);
                }}
              />
            </div>
            {filteredOptions && (
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute border-2 overflow-y-auto mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg border-none outline-none focus:outline-none sm:text-sm">
                  {filteredOptions?.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredOptions?.map((i) => (
                      <Combobox.Option
                        key={i?.id}
                        className={({ active }) =>
                          `relative  cursor-default select-none py-2 pl-4 pr-4 ${
                            active ? "bg-gray-100" : "text-gray-900"
                          }`
                        }
                        value={`${
                          i?.postalCode + ", " + i?.city + ", " + i?.region
                        }`}
                      >
                        {({ selected, active }) => {
                          // setTimeout(() => {
                          //   selected ? getOptions(person.name) : "";
                          // }, 200);
                          return (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {`${
                                  i?.postalCode +
                                  ", " +
                                  i?.city +
                                  ", " +
                                  i?.region
                                }`}
                              </span>
                            </>
                          );
                        }}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            )}
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default SearchInput;
