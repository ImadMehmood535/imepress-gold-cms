import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import Select from "@/components/ui/Select";
import { parse } from "postcss";
import SwitchToggle from "@/components/ui/SwitchToggle";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "@/lib/yup-validations";

const UpdateProduct = ({
  item,
  getAll,
  setUpdateModal,
  brands,
  categories,
  subCategories,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item?.name,
      brandId: item?.brandId,
      categoryId: item?.categoryId,
      subCategoryId: item?.subCategoryId,
      price: item?.price,
      description: item?.description,
      imageUrl: item?.imageUrl,
      isFeatured: item?.isFeatured,
      isSale: item?.isSale,
      isNew: item?.isNew,
      discount: item?.discount,
      slug: item?.slug,
    },
  });

  const { resolveToast, rejectToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [filterId, setFilterId] = useState(item.categoryId);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFilterId = (id) => {
    setFilterId(id);
  };

  const filterCategories = subCategories?.filter(
    (item) => item.categoryId === Number(filterId)
  );

  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState("");

  const updateBox = async (data) => {
    try {
      setIsLoading(true);
      let imageUrlToUpdate = data?.imageUrl;

      if (imageData) {
        const formData = new FormData();
        formData.append("image", imageData);
        const resImg = await API.uploadImage(formData);
        imageUrlToUpdate = resImg?.data?.data;
      }

      delete data.categoryId;
      delete data.imageUrl;
      data.price = parseInt(data.price);
      data.discount = parseInt(data.discount);

      data.isSale = data.isSale === "true";
      data.isFeatured = data.isFeatured === "true";
      data.isNew = data.isNew === "true";
      await API.updateProduct(item.id, {
        ...data,
        imageUrl: imageUrlToUpdate,
      });
      resolveToast("Successfully Updated Product");
      setUpdateModal(false);
      getAll();
    } catch (err) {
      rejectToast(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageData(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-w-[400px]">
      <form onSubmit={handleSubmit(updateBox)}>
        <Input
          label="Name"
          name="name"
          placeholder="Name"
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
        <div className="grid grid-cols-1 md:grid-cols-3 py-6">
          <SwitchToggle
            name="isFeatured"
            register={register}
            label={"Featured"}
            value={item?.isFeatured}
          />
          <SwitchToggle
            name="isSale"
            register={register}
            label={"Sale"}
            value={item?.isSale}
          />
          <SwitchToggle
            name="isNew"
            register={register}
            label={"New"}
            value={item?.isNew}
          />
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
            type={"number"}
            placeholder="Dispatch"
            register={register}
            errors={errors}
          />
        </div>

        <Input
          label="Slug"
          name="slug"
          placeholder="generate or enter slug"
          register={register}
          errors={errors}
        />

        <Input
          label="Description"
          name="description"
          placeholder="Description"
          register={register}
          errors={errors}
        />
        <div className="mt-4 flex justify-center items-center gap-12">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="py-4 px-4 my-3 bg-black text-white rounded-md cursor-pointer"
          >
            Change image
          </label>
          <img
            src={imagePreview || item?.imageUrl}
            alt="Preview"
            className="mt-2 rounded-md border border-gray-300 max-w-[200px]   w-full h  object-cover object-center "
          />
        </div>
        <div className="mt-4">
          <Button
            isLoading={isLoading}
            type="submit"
            text="Update"
            className="flex w-full"
            onClick={() => null}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
