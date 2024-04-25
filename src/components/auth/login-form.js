/** @format */

"use client";
import { loginSchema } from "@/lib/yup-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
 

const LogInForm = ({ login, loader }) => {
  const [modal, setModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const formSubmit = (data) => {
    login(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Input
          label="EMAIL"
          name="email"
          placeholder="john-deo@mail.com"
          register={register}
          errors={errors}
        />
        <Input
          label="PASSWORD"
          name="password"
          type="password"
          placeholder="**************"
          register={register}
          errors={errors}
        />

        <Button
          text={"Login"}
          onClick={() => {}}
          type="submit"
          isLoading={loader}
 
          className="w-full mt-2"
        />
      </form>
 
    </>
  );
};

export default LogInForm;
