/** @format */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { BoxSchema, productSchema } from "@/lib/yup-validations";
import TextArea from "@/components/ui/TextArea";
import Select from "@/components/ui/Select";
import SwitchToggle from "@/components/ui/SwitchToggle";
import { generateSlug } from "@/utils/slug";
import { Editor } from "primereact/editor";

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
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [filterId, setFilterId] = useState(null);
  const [slugData, setSlug] = useState("");
  const [descriptionData, setDescription] = useState(null);

  const createBox = async (data) => {
    try {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("image", data?.image[0]);

      const resImg = await API.uploadImage(formData);

      delete data.image;
      delete data.categoryId;
      data.shortDescription = data?.shortDescription
        ? data?.shortDescription
        : " ";
      data.isSale = data.isSale === "true";
      data.isFeatured = data.isFeatured === "true";
      data.isNew = data.isNew === "true";

      const res = await API.addProduct({
        ...data,
        imageUrl: resImg?.data?.data,
        description:descriptionData,
        slug: generateSlug(slugData),
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

  useEffect(() => {
    setSlug(getValues("name"));
  }, [watch("name")]);

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

        <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-5 py-6">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 py-6">
          <SwitchToggle
            name="isFeatured"
            register={register}
            label={"Featured"}
          />
          <SwitchToggle name="isSale" register={register} label={"Sale"} />
          <SwitchToggle name="isNew" register={register} label={"New"} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2  py-6">
          <Input
            label="Price"
            name="price"
            type={"number"}
            placeholder="Dispatch"
            register={register}
            errors={errors}
          />
          <Input
            label="Discount"
            name="discount"
            placeholder="Dispatch"
            register={register}
            errors={errors}
          />
        </div>

        <TextArea
          label="Short Description"
          name="shortDescription"
          placeholder="Dispatch"
          register={register}
          errors={errors}
        />
        {/* <TextArea
          label="Description"
          name="description"
          placeholder="Dispatch"
          register={register}
          errors={errors}
        /> */}
        <p className="flex flex-1 py-4 items-center pl-3 ">Description</p>

        <Editor
          value={descriptionData}
          onTextChange={(e) => setDescription(e.htmlValue)}
          style={{ height: "320px" }}
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
