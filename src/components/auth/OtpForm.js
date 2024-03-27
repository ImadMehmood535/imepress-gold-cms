"use client";
import { OTPSchema } from "@/lib/yup-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";

const OtpForm = ({ otp, loader }) => {
  const [modal, setModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(OTPSchema),
  });

  const formSubmit = (data) => {
    otp(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Input
          label="OTP"
          name="otp"
          placeholder="******"
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
      {/* <CreatePopUp modal={modal} setModal={setModal}>
        <ForgetPasword modal={modal} setModal={setModal}/>
      </CreatePopUp> */}
    </>
  );
};

export default OtpForm;
