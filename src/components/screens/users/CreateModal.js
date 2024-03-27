/** @format */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { sponsorDetailsSchema } from "@/lib/yup-validations";
import TextArea from "@/components/ui/TextArea";
import { Delete, Edit, Save, Trash } from "lucide-react";
import CreatePopUp from "@/components/popups/Create/CreatePopup";
import Select from "@/components/ui/Select";

const UserBoxDetails = ({ data, getAll }) => {
  const alreadyBoxes = [];
  data?.user_box?.map((i) => {
    alreadyBoxes.push(i?.id);
  });
  const { resolveToast, rejectToast } = useToast();
  const [boxes, setBoxes] = useState([]);
  const [box, setBox] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const getAllBoxes = async () => {
    try {
      let res = await API.getAllBoxes();
      res = res?.data?.data?.boxes;
      const boxes = res?.filter((i) => {
        return !alreadyBoxes?.includes(i?.id);
      });
      setBoxes(boxes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (e) => {
    console.log(e);
    if (!e) {
      rejectToast("Please select a box first");
      return;
    }
    try {
      const res = await API.createUserBoxes({
        boxId: Number(e),
        userId: data?.id,
        maxQuantity: 1,
      });
      resolveToast(res?.data?.message);
      setBox("");
      getAll();
      setModal(false);
      console.log(res);
    } catch (err) {
      if (!err?.response?.data?.success) {
        rejectToast(err?.response?.data?.message || err?.response?.data?.error);
      } else {
        rejectToast(err?.message);
      }
    }
  };
  const handleUpdate = () => {
    if (quantity < 1) {
      rejectToast("Quantity must be a positive integer and greater than 0");
      return;
    }
    try {
      const res = API.updateUserBoxes(selectedItem?.user_box_id, {
        max_quantity: Number(quantity),
      });
      resolveToast(res?.data?.message);
      setSelectedItem(null);
      getAll();
    } catch (err) {
      if (!err?.response?.data?.success) {
        rejectToast(err?.response?.data?.message || err?.response?.data?.error);
      } else {
        rejectToast(err?.message);
      }
    }
  };
  const handleDelete = (id) => {
    try {
      const res = API.deleteUserBoxes(id);
      resolveToast(res?.data?.message);
      setSelectedItem(null);
      getAll();
    } catch (err) {
      if (!err?.response?.data?.success) {
        rejectToast(err?.response?.data?.message || err?.response?.data?.error);
      } else {
        rejectToast(err?.message);
      }
    }
  };

  useEffect(() => {
    getAllBoxes();
  }, []);

  return (
    <div className="min-w-[400px]">
      <div className="rounded-md shadow-lg bg-white  mt-6 gap-8">
        <div className="flex justify-end mb-4">
          <Button text={"Add"} className="h-2" onClick={() => setModal(true)} />
        </div>
        <div className="bg-black lg:text-base text-sm gap-2 text-white text-center flex items-center justify-between font-medium py-3 px-[20px] ">
          <p className="max-w-[220px] w-full ">Box Title</p>
          <p className="max-w-[220px] w-full">Item Name</p>
          <p className="max-w-[220px] w-full">Details</p>
          <p className="max-w-[220px] w-full">Price</p>
          <p className="max-w-[220px] w-full">Required Quantity</p>
          <p className="max-w-[220px] w-full">Donated Quantity</p>
          <p className="max-w-[220px] w-full">Type</p>
          <div className="max-w-[220px] w-full">Actions</div>
        </div>
        <div className="max-h-[700px] table_scroll">
          {data?.user_box?.map((item, index) => (
            <div
              className="bg-white gap-2 flex items-center text-center lg:text-base text-sm  justify-between font-medium py-3 px-[20px] border-b"
              key={index}
            >
              <p className="max-w-[220px] text-black w-full ">{item?.title}</p>
              <p className="max-w-[220px] w-full text-black font-bold ">
                {item?.item_name}
              </p>{" "}
              <p className="max-w-[220px] w-full text-black font-bold ">
                {item?.details}
              </p>{" "}
              <p className="max-w-[220px] w-full text-black font-bold ">
                {item?.price}
              </p>{" "}
              <div className="max-w-[220px] w-full text-black font-bold ">
                <input
                  value={
                    (selectedItem?.id == item?.id && quantity) ||
                    item?.required_quantity
                  }
                  onChange={(e) => setQuantity(e.target.value)}
                  type={"number"}
                  className={`max-w-[50px] ${
                    selectedItem?.id == item?.id && "outline"
                  }`}
                  disabled={selectedItem?.id !== item?.id}
                />
              </div>{" "}
              <p className="max-w-[220px] w-full text-black font-bold ">
                {item?.donated_quantity}
              </p>{" "}
              <p className="max-w-[220px] w-full text-black font-bold ">
                {item?.type}
              </p>
              <div className="max-w-[220px] items-center gap-2 justify-center flex w-full text-black font-bold ">
                {selectedItem?.id == item?.id ? (
                  <Save
                    className="hover:text-green-500 cursor-pointer"
                    size={20}
                    onClick={() => handleUpdate(item)}
                  />
                ) : (
                  <Edit
                    className="hover:text-orange-500 cursor-pointer"
                    size={20}
                    onClick={() => setSelectedItem(item)}
                  />
                )}
                <Trash
                  className="hover:text-red-500 cursor-pointer"
                  size={20}
                  onClick={() => handleDelete(item?.user_box_id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <CreatePopUp
          title="Add User Boxes"
          classname={"w-[40%]"}
          modal={modal}
          setModal={setModal}
        >
          <div className="flex justify-between items-center">
            <select
              onChange={(e) => {
                setBox(e?.target?.value);
              }}
              className="bg-black text-white p-4"
            >
              <option value={""}>Select Box</option>
              {boxes?.map((i) => {
                return <option value={i?.id}>{i?.title}</option>;
              })}
            </select>
            <Button
              text={"Add"}
              className="h-4"
              onClick={() => handleAdd(box)}
            />
          </div>
        </CreatePopUp>
      )}
    </div>
  );
};

export default UserBoxDetails;
