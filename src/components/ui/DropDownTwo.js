import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronsDown } from "lucide-react";

export default function DropDownTwo({ tabs, handleChange, title }) {
  return (
    <div className=" max-w-fit text-right">
      <Menu as="div" className="relative text-left">
        <div className="max-w-[10rem]">
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {title || "Move To"}
            <ChevronsDown className="ml-2 -mr-1 h-5 w-5 " aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right   min-w-fit     focus:outline-none">
            <div className="px-1 max-h-[200px] overflow-y-auto shadow-lg divide-y divide-gray-100 ring-1 ring-black rounded-md  py-1 ring-opacity-5 bg-white mb-4 ">
              {tabs?.map((i, index) => {
                return (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-400 text-white" : "text-gray-900"
                        } group flex w-full items-center break-words  rounded-md px-2 py-2 text-sm`}
                        onClick={handleChange}
                        value={i?.id}
                      >
                        {i?.tab_name}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
