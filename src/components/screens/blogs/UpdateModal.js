import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { BrandSchema } from "@/lib/yup-validations";
import { Editor } from "primereact/editor";

const UpdateBlog = ({ item, getAll, setUpdateModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BrandSchema),
    defaultValues: {
      name: item?.name,
      short_description: item?.shortDescription,
      slug: item?.slug,
    },
  });

  const { resolveToast, rejectToast } = useToast();
  const [description, setDescription] = useState(item?.description);
  const [imageData, setImageData] = useState("");
  const [imagePreview, setImagePreview] = useState(item?.imageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const updateBrandHandler = async (data) => {
    try {
      setIsLoading(true);
      let imageUrl = item?.imageUrl;

      if (imageData) {
        const formData = new FormData();
        formData.append("image", imageData);
        const response = await API.uploadImage(formData);
        imageUrl = response?.data?.data;
      }

      const res = await API.updateBlogs(
        { ...data, description: description, imageUrl: imageUrl },
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
      <form onSubmit={handleSubmit(updateBrandHandler)}>
        <Input
          label="Name"
          name="name"
          placeholder="Name"
          register={register}
          errors={errors}
        />

        <div className="py-12">
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
              {imagePreview ? "Change image" : "Upload Image"}
            </label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 rounded-md border border-gray-300 max-w-[200px]   w-full h  object-cover object-center "
              />
            )}
          </div>
        </div>

        <Input
          label="Short Description"
          name="short_description"
          placeholder="Enter Short Description"
          register={register}
          errors={errors}
        />
        <Input
          label="Slug"
          name="slug"
          placeholder="generate or enter slug"
          register={register}
          errors={errors}
        />

        <Editor
          value={description}
          onTextChange={(e) => {
            setDescription(e.htmlValue);
          }}
          style={{ height: "320px" }}
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

export default UpdateBlog;
