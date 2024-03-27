"use client";
import { resetSchema } from "@/lib/yup-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";

const ResetForm = ({ reset, loader }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetSchema),
  });

  const formSubmit = (data) => {
    reset(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Input
          label="PASSWORD"
          name="password"
          placeholder="********"
          register={register}
          errors={errors}
        />
        {/* <span 
        onClick={()=>setModal(true)}
        className="text-red-500 text-xs cursor-pointer  hover:underline">forgot password</span> */}
        <Button
          text={"Submit"}
          onClick={() => {}}
          type="submit"
          isLoading={loader}
          className="w-full mt-2"
        />
      </form>

    </>
  );
};

export default ResetForm;
