/** @format */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { BoxSchema } from "@/lib/yup-validations";
import TextArea from "@/components/ui/TextArea";
import { Switch } from "@headlessui/react";
import Select from "@/components/ui/Select";

const CreateBox = ({ setModal, getAll, boxType }) => {
  const { resolveToast, rejectToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BoxSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const createBox = async (data) => {
    try {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("box", data?.image[0]);
      const resImg = await API.uploadImage(formData);
      delete data.image;
      data.image = resImg?.data?.data[0];
      data.length = Number(data.length);
      data.width = Number(data.width);
      data.height = Number(data.height);
      data.weight = Number(data.weight);
      const res = await API.createBox(data);
      getAll();
      resolveToast(res?.data?.message);
      reset();
      setModal(false);
    } catch (err) {
      if (!err.response.data.success) {
        rejectToast(err?.response?.data?.message || err?.response?.data?.error);
      } else {
        rejectToast(err?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(createBox)}>
        <Input
          label="Title"
          name="title"
          placeholder="Dispatch"
          register={register}
          errors={errors}
        />
        <Input
          label="Item Name"
          name="item_name"
          placeholder="Dispatch"
          register={register}
          errors={errors}
        />
        <TextArea
          label="Detail"
          name="details"
          placeholder="Dispatch"
          register={register}
          errors={errors}
          required={true}
        />
        <Input
          label="Price"
          name="price"
          placeholder="Dispatch"
          register={register}
          errors={errors}
        />
        <Input
          label="Item quantity"
          name="item_quantity"
          placeholder="Dispatch"
          register={register}
          errors={errors}
        />
        <div className="border mt-4 px-4 relative py-2 pb-1 rounded-lg bg-gray-200/95">
          <label
            htmlFor={"active"}
            className="relative flex flex-1 py-2 items-center  text-sm"
          >
            Brands
          </label>
          <Switch
            checked={watch("is_brand") || false} // Use watch from react-hook-form to get the value
            onChange={(checked) => setValue("is_brand", checked)}
            className={`${watch("is_brand") ? "bg-[#4c8bf5]" : "bg-gray-400"}
    relative inline-flex h-[30px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                watch("is_brand") ? "translate-x-9 " : "translate-x-0"
              }
      pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
        <Select
          label="Type"
          name="type_id"
          placeholder="Dispatch"
          register={register}
          errors={errors}
          options={boxType}
        />

        <Input
          label="Picture"
          name="image"
          placeholder="Dispatch"
          register={register}
          errors={errors}
          type={"file"}
        />
        <Input
          label="Length (inch.)"
          name="length"
          placeholder="length"
          register={register}
          errors={errors}
          type={"number"}
        />
        <Input
          label="Width (inch.)"
          name="width"
          placeholder="width"
          register={register}
          errors={errors}
          type={"number"}
        />
        <Input
          label="Thickness (inch.)"
          name="height"
          placeholder="Thickness"
          register={register}
          errors={errors}
          type={"number"}
        />
        <Input
          label="Weight (pounds)"
          name="weight"
          placeholder="weight"
          register={register}
          errors={errors}
          type={"number"}
        />

        <div className="mt-4">
          <Button
            isLoading={isLoading}
            type="submit"
            onClick={() => {}}
            text="Create"
            className="flex w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateBox;
