/** @format */

import React, { useState } from "react";
import DropDownTwo from "./DropDownTwo";
import Link from "next/link";
import { Edit, EyeIcon } from "lucide-react";
import CreatePopUp from "../popups/Create/CreatePopup";
import CreateCard from "../screens/events/CreateModal";
import UpdateCard from "../screens/events/UpdateModal";
import { useAuth } from "@/store/AuthContext";

const ExpndablesRow = ({
  data,
  generateLink,
  setAccess,
  setItem,
  setComment,
  setPriceModal,
  tabs,
  moveToTab,
  setRows,
}) => {
  const { authState, authDispatch } = useAuth();
  const [modal, setModal] = useState(false);
  let date = null;
  if (data?.available_date) {
    date = new Date(data?.available_date).toLocaleDateString().slice(0, 10);
  }
  let createdDate = null;
  if (data?.created_at) {
    createdDate = new Date(data?.created_at).toLocaleDateString().slice(0, 10);
  }
  return (
    <div className="w-full border px-[3%] py-6 rounded-lg ">
      <div className="custom_shadow py-2 rounded-lg">
        <div className="text-lg border-b border-gray-300 p-2 px-12  text-center h-full  flex justify-center items-start">
          <div>
            <h1 className="font-bold text-xl">Order Price:</h1>
          </div>
          <div className="flex-1 text-left ml-2 text-base font-bold text-gray-500">
            <p>{data?.order_price || "pending"}</p>
          </div>
        </div>
        <div className="text-lg border-b border-gray-300 p-2 px-12  text-center h-full  flex justify-center items-start">
          <div>
            <h1 className="font-bold text-xl">List Price:</h1>
          </div>
          <div className="flex-1 text-left ml-2 text-base font-bold text-gray-500">
            <p>{data?.list_price || "pending"}</p>
          </div>
        </div>
        <div className="text-lg border-b border-gray-300 p-2 px-12  text-center h-full  flex justify-center items-start">
          <div>
            <h1 className="font-bold text-xl">Available Date:</h1>
          </div>
          <div className="flex-1 text-left ml-2 text-base font-bold text-gray-500">
            <p>{date}</p>
          </div>
        </div>
        <div className="text-lg border-b border-gray-300 p-2 px-12  text-center h-full  flex justify-center items-start">
          <div>
            <h1 className="font-bold text-xl">Created:</h1>
          </div>
          <div className="flex-1 text-left ml-2 text-base font-bold text-gray-500">
            <p>
              {data?.username}{" "}
              <span className="ml-2 text-base font-bold text-gray-500">
                {createdDate}
              </span>
            </p>
          </div>
        </div>
        <div className="text-lg border-gray-300 p-2 text-center h-full flex xl:justify-start justify-center xl:gap-4 gap-3 flex-wrap items-center xl:px-12">
          <div className="hover:text-blue-500 cursor-pointer flex justify-center">
            <DropDownTwo
              tabs={tabs}
              handleChange={(event) => {
                moveToTab(event?.target?.value, [data?.id]);
              }}
            />
          </div>
          <div className="hover:text-blue-500 cursor-pointer flex justify-center">
            <DropDownTwo
              tabs={[
                { id: 1, tab_name: "Order Link" },
                { id: 2, tab_name: "Card Link" },
              ]}
              title={"Generate Link"}
              handleChange={(event) => {
                generateLink(data?.id, event?.target?.value);
              }}
            />
          </div>
          <div
            className="hover:text-blue-500 cursor-pointer flex justify-center"
            onClick={() => {
              setComment(true);
              setItem(data);
            }}
          >
            <div className="bg-black px-4 py-2 text-sm font-medium rounded-lg text-white ">
              Comment
            </div>
          </div>
          {authState.role == "order_taker" && data?.is_card_added == "0" && (
            <div
              className="hover:text-blue-500 cursor-pointer flex justify-center"
              onClick={() => {
                setModal(true);
                setItem(data);
              }}
            >
              <div className="bg-black px-4 py-2 text-sm font-medium rounded-lg text-white ">
                Card Missing
              </div>
            </div>
          )}

          {authState?.role == "admin" && (
            <div
              className="hover:text-blue-500 cursor-pointer flex justify-center"
              onClick={() => {
                setModal(true);
                setItem(data);
              }}
            >
              <div className="bg-black px-4 py-2 text-sm font-medium rounded-lg text-white ">
                Add/Update Card
              </div>
            </div>
          )}

          <div className="hover:text-blue-500 cursor-pointer flex justify-center">
            <div
              className="bg-black flex justify-center items-center px-4 py-2 text-sm font-medium rounded-lg text-white"
              onClick={() =>
                window.open(`/dashboard/orders/update?id=${data?.id}`)
              }
            >
              Edit <Edit size={18} className="ml-2 text-base " />
            </div>
          </div>
          <div className="hover:text-blue-500 cursor-pointer flex justify-center">
            <div
              className="bg-black flex justify-center items-center px-4 py-2 text-sm font-medium rounded-lg text-white"
              onClick={() =>
                window.open(`/dashboard/orders/view?id=${data?.id}`)
              }
            >
              View <EyeIcon size={18} className="ml-2 text-base " />
            </div>
          </div>
          <div className="hover:text-blue-500 cursor-pointer flex justify-center">
            <div
              className="bg-black flex justify-center items-center px-4 py-2 text-sm font-medium rounded-lg text-white"
              onClick={() => {
                setPriceModal(true);
                setItem(data);
              }}
            >
              Edit Price <Edit size={18} className="ml-2 text-base " />
            </div>
          </div>
          {authState.role == "admin" && (
            <div
              className="hover:text-blue-500 cursor-pointer flex justify-center"
              onClick={() => {
                setAccess(true);
                setItem(data);
              }}
            >
              <div className="bg-black px-4 py-2 text-sm font-medium rounded-lg text-white ">
                Special Access
              </div>
            </div>
          )}
        </div>
      </div>
      <CreatePopUp title={"Card Details"} modal={modal} setModal={setModal}>
        <UpdateCard setUpdateModal={setModal} orderId={data?.id} />
      </CreatePopUp>
    </div>
  );
};

export default ExpndablesRow;
