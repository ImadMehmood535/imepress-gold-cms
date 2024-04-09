import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { BrandSchema } from "@/lib/yup-validations";

const updateCategory = ({ item, getAll, setUpdateModal }) => {
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
  const [imageData, setImageData] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const updateCategoryHandler = async (data) => {
    try {
      setIsLoading(true);

      let imageUrlToUpdate = data?.imageUrl;

      if (imageData) {
        const formData = new FormData();
        formData.append("image", imageData);
        const resImg = await API.uploadImage(formData);
        imageUrlToUpdate = resImg?.data?.data;
      }
      delete data.imageUrl;

      const res = await API.updateCategory(
        { ...data, imageUrl: imageUrlToUpdate },
        item?.id
      );
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
      <form onSubmit={handleSubmit(updateCategoryHandler)}>
        <Input
          label="Name"
          name="name"
          placeholder="Name"
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
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default updateCategory;
