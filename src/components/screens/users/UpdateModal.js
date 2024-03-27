/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { sponsorDetailsSchema } from "@/lib/yup-validations";
import TextArea from "@/components/ui/TextArea";

const UpdateSponsorDetails = ({ item, getAll, setUpdateModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sponsorDetailsSchema),
    defaultValues: {
      requirements: item?.requirements || "",
      requirement_description: item?.requirement_description || "",
      requirement_details: item?.requirement_details || "",
    },
  });

  const { resolveToast, rejectToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = async (data) => {
    try {
      setIsLoading(true);
      const res = await API.updateTeachers(item?.id, data);
      resolveToast(res?.data?.message);
      setUpdateModal(false);
      getAll();
    } catch (err) {
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
    <div className="min-w-[400px]">
      <form onSubmit={handleSubmit(updateUser)}>
        <TextArea
          label="Requirements"
          name="requirements"
          placeholder="10 pencil box"
          register={register}
          errors={errors}
        />
        <TextArea
          label="Requirement Details"
          name="requirement_details"
          placeholder="10 pencil box"
          register={register}
          errors={errors}
        />
        <TextArea
          label="Requirement Description"
          name="requirement_description"
          placeholder="10 pencil box"
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

export default UpdateSponsorDetails;
