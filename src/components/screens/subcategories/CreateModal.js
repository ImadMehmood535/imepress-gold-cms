import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { BrandSchema } from "@/lib/yup-validations";
import Select from "@/components/ui/Select";

const CreateSubCategory = ({ setModal, setBrands, brands, category }) => {
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
      data.categoryId = parseInt(data.categoryId);
      const res = await API.createSubCategory(data);
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
        {category && (
          <Select
            label="Category"
            name="categoryId"
            placeholder="Select your category"
            register={register}
            errors={errors}
            options={category}
            onChange={() => null}
          />
        )}

        <Input
          label="Name"
          name="name"
          placeholder="Name"
          register={register}
          errors={errors}
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

export default CreateSubCategory;
