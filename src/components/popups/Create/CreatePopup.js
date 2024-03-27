/** @format */

import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { Fragment } from "react";

export default function CreatePopUp({
  modal,
  setModal,
  children,
  title,
  classname,
  rowData,
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
                  className={` max-w-7xl ${
                    classname ? classname : "w-[90%] sm:w-[60%]"
                  } transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <div
                    onClick={() => setModal(false)}
                    className="absolute z-10 cursor-pointer top-3 right-3 bg-gray-200 rounded-full w-7 flex items-center justify-center h-7"
                  >
                    <XIcon className="w-4 h-4" />
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="text-[1.5rem] text-center font-bold leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 relative bg-gray-100 p-4 rounded-lg shadow-md">
                    <div className="flex justify-start gap-6 flex-wrap">
                      <p>
                        <strong>Name:</strong> {rowData?.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {rowData?.email}
                      </p>
                    </div>
                    <div className="flex flex-col gap-7 mt-8">
                      <p>
                        1. On a scale of 1-5, how satisfied are you with the
                        communication and responsiveness of our team?:
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.satisfactionRating}
                      </p>
                      <p>
                        2- How would you rate the overall effectiveness of the
                        social media campaigns we executed this month?
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.effectiveness}
                      </p>
                      <p>
                        3- How satisfied are you with the quality and relevance
                        of the content we produced for your social media
                        channels
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.relevance}
                      </p>
                      <p>
                        4- How do you feel about the level of engagement and
                        interaction from your target audience on social media
                        this month?
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.quality}
                      </p>
                      <p>
                        5- How satisfied are you with the analytics and
                        performance reports provided to you?
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.analytics}
                      </p>
                      <p>
                        6- How would you rate the efficiency and effectiveness
                        of our ad spend in driving results for your social media
                        goals?
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.efficiency}
                      </p>
                      <p>
                        7- On a scale of 1-5, how well do you think our strategy
                        aligns with your overall business goals?
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.strategy}
                      </p>
                      <p>
                        8- How satisfied are you with the level of customer
                        service and support provided by our team?
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.service}
                      </p>
                      <p>
                        9. Are there any specific types of content you would
                        like to see more or less of in the future?
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.specificContent}
                      </p>
                      <p>
                        10. Is there any additional data or specific insights
                        you would like to see in our reports?
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.additionalData}
                      </p>
                      <p>
                        11- Are there any specific competitors or metrics you
                        would like us to focus on more
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.competitors}
                      </p>
                      <p>
                        12- Is there anything we can do to improve our support
                        and service?
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.support}
                      </p>
                      <p>
                        Are there any areas you think we should focus on to
                        enhance our performance in the coming months?
                        <br />
                        <strong>Ans. </strong>
                        {rowData?.message}
                      </p>
                    </div>
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
