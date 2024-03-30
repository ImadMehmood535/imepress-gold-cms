/** @format */

import Image from "next/image";
import React, { useRef, useState } from "react";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import Button from "./Button";
import CreatePopUp from "../popups/Create/CreatePopup";

const ExpndablesOrdersRow = ({ data, getAll }) => {
  const { resolveToast, rejectToast } = useToast();
  const [modal, setModal] = useState(false);
  const row = data;
  const statusObj = {
    placed: {
      text: "Dispatched",
      color: "hover:bg-orange-400 hover:cursor-pointer",
    },
    dispatched: {
      text: "Transit",
      color: "hover:bg-blue-400 hover:cursor-pointer",
    },
    transit: {
      text: "Delivered",
      color: "hover:bg-green-400 hover:cursor-pointer",
    },
    delivered: { text: "Delivered", color: "bg-green-400" },
  };
  const btn_text =
    row.status !== "delivered"
      ? `Move to ${statusObj[row?.status]?.text}`
      : "Delivered";

  const updateOrder = async (id) => {
    console.log(id);
    try {
      const res = await API.updateOrder(id);
      resolveToast(res?.data?.message);
      getAll();
    } catch (error) {
      rejectToast(error?.response?.data?.message || error?.message);
    }
  };
  return (
    <div className="w-full border px-[3%] py-6 rounded-lg ">
      <div className="custom_shadow flex py-2 px-4 rounded-lg">
        <div className="w-full grid grid-cols-2 ">
          <div className="break-all text-wrap">
            <h3 className="text-red-500 text-lg mb-4">Customer Details</h3>
            <div className="flex gap-2">
              <p className="text-sm min-w-[80px] font-bold">First Name:</p>
              <p className="text-sm">{(row?.User?.name).split(" ")[0]}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[80px] font-bold">Last Name:</p>
              <p className="text-sm">{(row?.User?.name).split(" ")[1]}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[80px] font-bold">Number:</p>
              <p className="text-sm">{row?.User?.phoneNumber}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[80px] font-bold">Email:</p>
              <p className="text-sm">{row?.User?.email}</p>
            </div>
          </div>
          <div className="w-full">
          <h3 className="text-red-500 text-lg mb-4 w-full">Order Items</h3>
          {data?.orderItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <div className="w-20">
                <Image
                  alt={item?.Product?.name}
                  src={item?.Product?.imageUrl}
                  width={80}
                  height={80}
                />
              </div>
              <div>
     
                <p className="text-sm"><span className="font-semibold">Name:</span> {item?.Product?.name}</p>
                <p className="text-sm"><span className="font-semibold">Price:</span> {item?.Product?.price}</p>
                <p className="text-sm"><span className="font-semibold">Quantity:</span> {item?.quantity}</p>
                <p className="text-sm"><span className="font-semibold">Total Price:</span> ${item?.price}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
        {/* <div className="w-full flex-col justify-center items-center">
          <div className="break-all text-wrap">
            <h3 className="text-red-500 text-lg">Shipping Details</h3>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px]">Placed On:</p>
              <p className="text-sm">{row?.placed?.slice(0, 10) || "-"}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px]">Dispatched On:</p>
              <p className="text-sm">{row?.dispatched?.slice(0, 10) || "-"}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px]">In Transit:</p>
              <p className="text-sm">{row?.transit?.slice(0, 10) || "-"}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px]">Delivered On:</p>
              <p className="text-sm">{row?.delivered?.slice(0, 10) || "-"}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                disabled={row?.status == "delivered"}
                text={btn_text}
                onClick={() => updateOrder(row?.id)}
                className={`h-2  ${statusObj[row?.status]?.color}`}
              />
            </div>
          </div>
          <div className="break-all mt-4 text-wrap">
            <h3 className="text-red-500 text-lg">Delivery Address Details</h3>
            <div className="flex gap-2 mt-4">
              <Button
                text={"View Details"}
                onClick={() => setModal(true)}
                className={`h-2 hover:bg-red-400 outline:none`}
              />
            </div>
          </div>
        </div> */}
      </div>
      {
        // <CreatePopUp title="Delivery Details" modal={modal} setModal={setModal}>
        //   <div className="rounded-md shadow-lg bg-white  mt-6 gap-8">
        //     <div className="bg-black lg:text-base text-sm gap-2 text-white text-center flex items-center justify-between font-medium py-3 px-[20px] ">
        //       <p className="max-w-[220px] w-full ">Box Title</p>
        //       <p className="max-w-[180px] w-full ">Brand</p>
        //       <p className="max-w-[220px] w-full">Item Name</p>
        //       <p className="max-w-[220px] w-full">Details</p>
        //       <p className="max-w-[220px] w-full">Price</p>
        //       <p className="max-w-[220px] w-full">Quantity</p>
        //       <p className="max-w-[220px] w-full">Type</p>
        //       <p className="max-w-[220px] w-full">Delivery Address</p>
        //       <p className="max-w-[220px] w-full">City</p>
        //       <p className="max-w-[220px] w-full">Postal Code</p>
        //     </div>
        //     <div className="max-h-[700px] table_scroll">
        //       {data?.order_details?.map((item, index) => (
        //         <div
        //           className="bg-white gap-2 flex items-center text-center lg:text-base text-sm  justify-between font-medium py-3 px-[20px] border-b"
        //           key={index}
        //         >
        //           <p className="max-w-[220px] text-black w-full ">
        //             {item?.box_title}
        //           </p>
        //           <p className="max-w-[180px] w-full text-black font-bold">
        //             {item?.brand}
        //           </p>
        //           <p className="max-w-[220px] w-full text-black font-bold ">
        //             {item?.item_name}
        //           </p>{" "}
        //           <p className="max-w-[220px] w-full text-black font-bold ">
        //             {item?.details}
        //           </p>{" "}
        //           <p className="max-w-[220px] w-full text-black font-bold ">
        //             {item?.price}
        //           </p>{" "}
        //           <p className="max-w-[220px] w-full text-black font-bold ">
        //             {item?.quantity}
        //           </p>{" "}
        //           <p className="max-w-[220px] w-full text-black font-bold ">
        //             {item?.type}
        //           </p>
        //           <p className="max-w-[220px] w-full text-primaryBrown text-red font-bold ">
        //             {item?.delivery_address}
        //           </p>
        //           <p className="max-w-[220px] w-full text-primaryBrown text-red font-bold ">
        //             {item?.city}
        //           </p>
        //           <p className="max-w-[220px] w-full text-primaryBrown text-red font-bold ">
        //             {item?.postal_code}
        //           </p>
        //         </div>
        //       ))}
        //     </div>
        //   </div>
        // </CreatePopUp>
      }
    </div>
  );
};

export default ExpndablesOrdersRow;
