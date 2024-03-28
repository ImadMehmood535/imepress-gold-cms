import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { BrandSchema } from "@/lib/yup-validations";
import Select from "@/components/ui/Select";

const updateSubCategory = ({ item, getAll, setUpdateModal, category }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BrandSchema),
    defaultValues: {
      name: item?.name,
    },
  });

  const { resolveToast, rejectToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const updateCategoryHandler = async (data) => {
    try {
      setIsLoading(true);
      data.categoryId = parseInt(data?.categoryId);
      const res = await API.updateSubCategory(data, item?.id);
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
      <form onSubmit={handleSubmit(updateCategoryHandler)}>
        <Select
          label="Category"
          name="categoryId"
          placeholder="Select your category"
          register={register}
          errors={errors}
          options={category}
          value={item?.categoryId}
        />
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
            text="Update"
            className="flex w-full"
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default updateSubCategory;
