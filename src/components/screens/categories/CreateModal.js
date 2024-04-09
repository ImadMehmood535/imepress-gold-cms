/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { BrandSchema } from "@/lib/yup-validations";

const CreateCategory = ({ setModal, setBrands, brands }) => {
  const { resolveToast, rejectToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BrandSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const createBrandHandler = async (data) => {
    try {
      setIsLoading(true);

      let formData = new FormData();
      formData.append("image", data?.image[0]);

      const resImg = await API.uploadImage(formData);
      delete data.image;

      const res = await API.createCategory({
        ...data,
        imageUrl: resImg?.data?.data,
      });
      setBrands([...brands, res.data.data]);
      resolveToast(res?.data?.message);
      setModal(false);
      reset();
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
    <div className="w-full">
      <form onSubmit={handleSubmit(createBrandHandler)}>
        <Input
          label="Name"
          name="name"
          placeholder="Name"
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

export default CreateCategory;
