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
      <div className="custom_shadow flex py-2 px-4 rounded-lg">
        <div className="w-full flex-col justify-center items-center">
          <div className="break-all text-wrap">
            <h3 className="text-red-500 text-lg">Institute Details</h3>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px]">Name:</p>
              <p className="text-sm">{row?.current_institute}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px]">Address:</p>
              <p className="text-sm">{row?.address}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px]">Postal Code:</p>
              <p className="text-sm">{row?.postal_code}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px]">City:</p>
              <p className="text-sm">{row?.city}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px]">State:</p>
              <p className="text-sm">{"Colorado"}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[100px]">Country:</p>
              <p className="text-sm">{"United States of America"}</p>
            </div>
          </div>
          <div className="break-all mt-4 text-wrap">
            <h3 className="text-red-500 text-lg">Sponsorship Details</h3>
            <div className="flex gap-2">
              <p className="text-sm min-w-[200px] ">Requirements:</p>
              <p className="text-sm">{row?.requirements || "-"}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[200px] ">Requirement Details:</p>
              <p className="text-sm">{row?.requirement_details || "-"}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm min-w-[200px] ">Requirement Description:</p>
              <p className="text-sm">{row?.requirement_description || "-"}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                onClick={() => {
                  setUpdateModal(true);
                  setItem(row);
                }}
                text={"Edit Details"}
                className="h-2 hover:bg-orange-500"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex-col justify-center items-center">
          <div className="break-all text-wrap">
            <h3 className="text-red-500 text-lg">User Box Details</h3>
            <div className="flex gap-2 mt-4">
              <Button
                text={"View Details"}
                onClick={() => {
                  setModal(true);
                  setItem(row);
                }}
                className={`h-2 hover:bg-red-400 outline:none`}
              />
            </div>
          </div>
        </div>
      </div>
      {updateModal && (
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
      )}
    </div>
  );
};

export default ExpndablesUserRow;
