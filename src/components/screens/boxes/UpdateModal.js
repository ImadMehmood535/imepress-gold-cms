import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { updateBoxesSchema } from "@/lib/yup-validations";
import TextArea from "@/components/ui/TextArea";
import { Switch } from "@headlessui/react";
import Select from "@/components/ui/Select";

const UpdateBox = ({ item, getAll, setUpdateModal, boxType }) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateBoxesSchema),
    defaultValues: {
      item_quantity: item.item_quantity,
      title: item?.title,
      item_name: item?.item_name,
      details: item?.details,
      price: item?.price,
      type_id: item?.type_id,
      length: item?.length,
      width: item?.width,
      height: item?.height,
      weight: item?.weight,
    },
  });

  const { resolveToast, rejectToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const updateBox = async (data) => {
    try {
      setIsLoading(true);
      const res = await API.updateBox(item?.id, data);
      resolveToast(res?.data?.message);
      setUpdateModal(false);
      getAll();
    } catch (err) {
      if (!err.response.data.success) {
        rejectToast(err.response.data.message || err.response.data.error);
      } else {
        rejectToast(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-w-[400px]">
      <form onSubmit={handleSubmit(updateBox)}>
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
            checked={item?.is_brand || watch("is_brand") || false} // Use watch from react-hook-form to get the value
            onChange={(checked) => setValue("is_brand", checked)}
            className={`${
              item?.is_brand || watch("is_brand")
                ? "bg-[#4c8bf5]"
                : "bg-gray-400"
            }
    relative inline-flex h-[30px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                item?.is_brand || watch("is_brand")
                  ? "translate-x-9 "
                  : "translate-x-0"
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
            text="Update"
            className="flex w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateBox;
