import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { BrandSchema } from "@/lib/yup-validations";

const UpdateBrand = ({ item, getAll, setUpdateModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BrandSchema),
    defaultValues: {
      name: item.name,
    },
  });

  const { resolveToast, rejectToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const updateBrandHandler = async (data) => {
    try {
      setIsLoading(true);
      const res = await API.updateBrand(item?.id, data);
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
      <form onSubmit={handleSubmit(updateBrandHandler)}>
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

export default UpdateBrand;
