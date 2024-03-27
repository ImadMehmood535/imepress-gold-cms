/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { updateCommunitySchema } from "@/lib/yup-validations";
import TextArea from "@/components/ui/TextArea";

const UpdateCommunity = ({ item, getAll, setUpdateModal }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateCommunitySchema),
    defaultValues: {
      first_name: item?.first_name,
      last_name: item?.last_name,
      message: item?.message,
      rating: item?.rating,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { rejectToast, resolveToast } = useToast();
  const updateCommunity = async (data) => {
    try {
      setIsLoading(true);
      const res = await API.updateCommunity(item?.id, data);
      resolveToast(res?.data?.message);
      getAll();
      setUpdateModal(false);
    } catch (err) {
      console.log(err);
      if (!err?.response?.data?.success) {
        rejectToast(err?.response?.data?.message || err?.response?.data?.error);
      } else {
        rejectToast(err?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(updateCommunity)}>
        <Input
          label="First Name"
          name="first_name"
          placeholder="John"
          register={register}
          errors={errors}
        />
        <Input
          label="Last Name"
          name="last_name"
          placeholder="Doe"
          register={register}
          errors={errors}
        />
        <TextArea
          label="Message"
          name="message"
          placeholder="Hello ..."
          register={register}
          errors={errors}
          required={true}
        />
        <Input
          label="Rating"
          name="rating"
          placeholder="1-5"
          register={register}
          errors={errors}
          type={"number"}
        />

        <div className="mt-4">
          <Button
            isLoading={isLoading}
            type="submit"
            onClick={() => {}}
            text="Update"
            className="flex w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateCommunity;
