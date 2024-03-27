/** @format */

import Image from "next/image";
import React, { useRef, useState } from "react";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import Button from "./Button";
import CreatePopUp from "../popups/Create/CreatePopup";

const ExpndablesSubscriptionRow = ({ data, getAll }) => {
  const [modal, setModal] = useState(false);
  const row = data;

  return (
    <div className="w-full border px-[3%] py-6 rounded-lg ">
      <div className="custom_shadow flex py-2 px-4 rounded-lg">
        <div className="w-full flex-col justify-center items-center">
          <div className="break-all text-wrap">
            <h3 className="text-red-500 text-lg">Customer Details</h3>
            <div className="flex gap-2">
              <p className="text-sm min-w-[80px]">First Name:</p>
              <p className="text-sm">{row?.first_name}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[80px]">Last Name:</p>
              <p className="text-sm">{row?.last_name}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[80px]">Number:</p>
              <p className="text-sm">{row?.number}</p>
            </div>
          </div>
          <div className="break-all mt-4 text-wrap">
            <h3 className="text-red-500 text-lg">Subscription Details</h3>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px] ">Gross Amount:</p>
              <p className="text-sm">{row?.gross_amount}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px] ">Shipping Cost:</p>
              <p className="text-sm">{row?.shipping_cost}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px] ">Tax Amount:</p>
              <p className="text-sm">{row?.tax_amount}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px] ">Net Amount:</p>
              <p className="text-sm">{row?.net_amount}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex-col justify-center items-center">
          <div className="break-all text-wrap">
            <h3 className="text-red-500 text-lg">Delivery Address Details</h3>
            <div className="flex gap-2 mt-4">
              <Button
                text={"View Details"}
                onClick={() => setModal(true)}
                className={`h-2 hover:bg-red-400 outline:none`}
              />
            </div>
          </div>
        </div>
      </div>
      {
        <CreatePopUp title="Delivery Details" modal={modal} setModal={setModal}>
          <div className="rounded-md shadow-lg bg-white  mt-6 gap-8">
            <div className="bg-black lg:text-base text-sm gap-2 text-white text-center flex items-center justify-between font-medium py-3 px-[20px] ">
              <p className="max-w-[220px] w-full ">Box Title</p>
              <p className="max-w-[180px] w-full ">Brand</p>
              <p className="max-w-[220px] w-full">Item Name</p>
              <p className="max-w-[220px] w-full">Details</p>
              <p className="max-w-[220px] w-full">Price</p>
              <p className="max-w-[220px] w-full">Quantity</p>
              <p className="max-w-[220px] w-full">Type</p>
              <p className="max-w-[220px] w-full">Delivery Address</p>
              <p className="max-w-[220px] w-full">City</p>
              <p className="max-w-[220px] w-full">Postal Code</p>
            </div>
            <div className="max-h-[700px] table_scroll">
              {data?.order_details?.map((item, index) => (
                <div
                  className="bg-white gap-2 flex items-center text-center lg:text-base text-sm  justify-between font-medium py-3 px-[20px] border-b"
                  key={index}
                >
                  <p className="max-w-[220px] text-black w-full ">
                    {item?.box_title}
                  </p>
                  <p className="max-w-[180px] w-full text-black font-bold">
                    {item?.brand}
                  </p>
                  <p className="max-w-[220px] w-full text-black font-bold ">
                    {item?.item_name}
                  </p>{" "}
                  <p className="max-w-[220px] w-full text-black font-bold ">
                    {item?.details}
                  </p>{" "}
                  <p className="max-w-[220px] w-full text-black font-bold ">
                    {item?.price}
                  </p>{" "}
                  <p className="max-w-[220px] w-full text-black font-bold ">
                    {item?.quantity}
                  </p>{" "}
                  <p className="max-w-[220px] w-full text-black font-bold ">
                    {item?.type}
                  </p>
                  <p className="max-w-[220px] w-full text-primaryBrown text-red font-bold ">
                    {item?.delivery_address}
                  </p>
                  <p className="max-w-[220px] w-full text-primaryBrown text-red font-bold ">
                    {item?.city}
                  </p>
                  <p className="max-w-[220px] w-full text-primaryBrown text-red font-bold ">
                    {item?.postal_code}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CreatePopUp>
      }
    </div>
  );
};

export default ExpndablesSubscriptionRow;
