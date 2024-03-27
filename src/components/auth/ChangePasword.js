import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { changePasswordSchema } from "@/lib/yup-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
export default function ChangePasword({ setModal, modal }) {
  const { resolveToast, rejectToast } = useToast();
  const [isloading, setIsloading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await API.changePassword(data);
      if (res?.data?.status?.success) {
        setIsloading(false);
        setModal(false);
        resolveToast("Your password has been changed Successfully");
      }
    } catch (err) {
      rejectToast(err?.response?.data?.message);
    }
  };

  return (
    <main className="w-full">
      <section className="flex items-center justify-center">
        <div className="rounded-lg bg-white shadow-sm  w-full p-10">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="OLD PASSWORD"
              name="oldPassword"
              type="password"
              placeholder="**************"
              register={register}
              errors={errors}
            />
            <Input
              label="ENTER NEW PASSWORD"
              name="newPassword"
              type="password"
              placeholder="**************"
              register={register}
              errors={errors}
            />
            <div className="mt-8 float-right">
              <Button
                type="submit"
                text="Change Password"
                className="flex items-center justify-center"
                onClick={() => {}}
                isLoading={isloading}
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
