/** @format */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { BoxSchema, CommunitySchema } from "@/lib/yup-validations";
import TextArea from "@/components/ui/TextArea";
import { Switch } from "@headlessui/react";
import Select from "@/components/ui/Select";

const CreateCommunity = ({ setModal, setCommunity, community }) => {
  const { resolveToast, rejectToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CommunitySchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const createCommunity = async (data) => {
    try {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("box", data?.image[0]);
      const resImg = await API.uploadImage(formData);
      delete data.image;
      data.picture = resImg?.data?.data[0];
      const res = await API.createCommunity(data);
      setCommunity([...community, res.data.data]);
      resolveToast(res?.data?.message);
      reset();
      setModal(false);
    } catch (err) {
      if (!err.response.data.success) {
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
      <form onSubmit={handleSubmit(createCommunity)}>
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
          label="Picture"
          name="image"
          placeholder="Dispatch"
          register={register}
          errors={errors}
          type={"file"}
        />
        <Input
          label="Rating"
          name="rating"
          placeholder="Rate between 0-5"
          register={register}
          errors={errors}
          type={"number"}
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

export default CreateCommunity;
