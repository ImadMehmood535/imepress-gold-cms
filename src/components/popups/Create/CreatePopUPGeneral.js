/** @format */

import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { Fragment } from "react";

export default function CreatePopUPGeneral({
  modal,
  setModal,
  children,
  title,
}) {
  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setModal(!modal);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={` max-w-7xl w-[90%] sm:w-[50%] transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <div
                    onClick={() => setModal(false)}
                    className="absolute z-10 cursor-pointer top-3 right-3 bg-gray-200 rounded-full w-7 flex items-center justify-center h-7"
                  >
                    <XIcon className="w-4 h-4" />
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="text-[2rem] text-center font-bold leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 relative">
                    <div>{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
