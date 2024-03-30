import Image from "next/image";
import React, { useState } from "react";
import CreatePopUp from "../popups/Create/CreatePopup";
import { X } from "lucide-react";
import Button from "./Button";
import UpdateBlog from "../screens/boxtype/UpdateModal";
import UpdateSponsorDetails from "../screens/users/UpdateModal";
import UserBoxDetails from "../screens/users/CreateModal";

const ExpndablesUserRow = ({ data, getAll }) => {
  const row = data;
  const [item, setItem] = useState(null);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  return (
    <div className="w-full border px-[3%] py-6 rounded-lg ">
      <div className="custom_shadow flex justify-between items-center w-full py-2 px-4 rounded-lg">
        <div className="w-full    justify-center items-center">
          <div className="break-all text-wrap">
            <h3 className="text-red-500 text-lg">Product Details</h3>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px] font-bold">Name:</p>
              <p className="text-sm">{row?.name}</p>
            </div>

            <div className="flex gap-2">
              <p className="text-sm min-w-[100px] font-bold">Price:</p>
              <p className="text-sm">{row?.price}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px] font-bold">Brand:</p>
              <p className="text-sm">{row?.brand}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px] font-bold">State:</p>
              <p className="text-sm">{"Colorado"}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px] font-bold">Category:</p>
              <p className="text-sm">{row?.category}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px] font-bold">subCategory:</p>
              <p className="text-sm">{row?.subCategory}</p>
            </div>
          </div>
        </div>
        <div className="pr-[3%]  ">
          <div className="break-all text-wrap">
            <Image
              src={row?.imageUrl}
              alt="productImage"
              width={300}
              height={300}
              className="rounded-lg"
            />
            {/* <h3 className="text-red-500 text-lg">User Box Details</h3> */}
            {/* <div className="flex gap-2 mt-4">
              <Button
                text={"View Details"}
                onClick={() => {
                  setModal(true);
                  setItem(row);
                }}
                className={`h-2 hover:bg-red-400 outline:none`}
              />
            </div> */}
          </div>
        </div>
      </div>
      {/* {updateModal && (
        <CreatePopUp
          title="Update Sponsorship Details"
          modal={updateModal}
          setModal={setUpdateModal}
        >
          <UpdateSponsorDetails
            item={item}
            getAll={getAll}
            setUpdateModal={setUpdateModal}
          />
        </CreatePopUp>
      )}
      {modal && (
        <CreatePopUp title="User Box Details" modal={modal} setModal={setModal}>
          <UserBoxDetails data={item} getAll={getAll} setModal={setModal} />
        </CreatePopUp>
      )} */}
    </div>
  );
};

export default ExpndablesUserRow;
