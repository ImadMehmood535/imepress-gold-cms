import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { BrandSchema } from "@/lib/yup-validations";
import { Editor } from "primereact/editor";
import { toast } from "react-toastify";

const CreateBlogs = ({ setModal, setBrands, brands }) => {
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
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageData, setImageData] = useState("");
  const [validations, setValidations] = useState({
    description: false,
    image: true,
  });

  const createBrandHandler = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("image", imageData);
      const response = await API.uploadImage(formData);

      const res = await API.createBlogs({
        ...data,
        description: description,
        imageUrl: response?.data?.data,
      });
      setBrands([...brands, res.data.data]);
      resolveToast(res?.data?.message);
      setModal(false);
      reset();
    } catch (err) {
      rejectToast("Try again");
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
    <div className="w-full">
      <form onSubmit={handleSubmit(createBrandHandler)}>
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

        <Editor
          value={description}
          onTextChange={(e) => {
            setDescription(e.htmlValue);
            setValidations((validations.description = false));
          }}
          style={{ height: "320px" }}
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

export default CreateBlogs;
