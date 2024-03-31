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

const CreateProduct = ({
  setModal,
  getAll,
  brands,
  categories,
  subCategories,
}) => {
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
  const [filterId, setFilterId] = useState(null);

  const createBox = async (data) => {
    try {
      console.log(data, "data");
      setIsLoading(true);
      let formData = new FormData();
      formData.append("image", data?.image[0]);

      const resImg = await API.uploadImage(formData);

      delete data.image;
      delete data.categoryId;
      const res = await API.addProduct({
        ...data,
        imageUrl: resImg?.data?.data,
      });

      getAll();
      resolveToast(res?.data?.message);
      reset();
      setModal(false);
    } catch (err) {
      console.log(err);
      rejectToast(err?.response?.data?.message[0]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterId = (id) => {
    setFilterId(id);
  };

  const filterCategories = subCategories?.filter(
    (item) => item?.categoryId === Number(filterId)
  );

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(createBox)}>
        <Input
          label="Name"
          name="name"
          placeholder="Dispatch"
          register={register}
          errors={errors}
        />
        <Select
          label="Brand"
          name="brandId"
          placeholder="Select your Brand"
          register={register}
          errors={errors}
          options={brands}
          onChange={() => null}
        />
        <Select
          label="Category"
          name="categoryId"
          placeholder="Select your Category"
          register={register}
          errors={errors}
          options={categories}
          onChange={handleFilterId}
        />

        <Select
          label="Sub Category"
          name="subCategoryId"
          placeholder="Select your Sub-Category"
          register={register}
          errors={errors}
          options={filterCategories}
          onChange={() => null}
        />
        <Input
          label="Price"
          name="price"
          type={"number"}
          placeholder="Dispatch"
          register={register}
          errors={errors}
        />
        <TextArea
          label="Description"
          name="description"
          placeholder="Dispatch"
          register={register}
          errors={errors}
        />

        <Input
          label="Picture"
          name="image"
          placeholder="Dispatch"
          register={register}
          errors={errors}
          type={"file"}
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

export default CreateProduct;
