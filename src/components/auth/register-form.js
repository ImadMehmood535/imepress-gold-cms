"use client";
import Input from "../ui/Input";
import { signUpSchema } from "@/lib/yup-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const formSubmit = (data) => {};

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
        <Input
          label="RE-PASSWORD"
          name="rePassword"
          type="password"
          placeholder="**************"
          register={register}
          errors={errors}
        />
        <button className="text-white bg-black rounded-lg px-6 py-4 w-full mt-8">
          Signup
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
