import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { changePasswordSchema } from "@/lib/yup-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/store/AuthContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function ChangeProfile({ setModal, modal }) {
  const { resolveToast, rejectToast } = useToast();
  const [isloading, setIsloading] = useState(false);
  const { authState } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await API.updateProfile(data);
      if (res?.data?.status?.success) {
        setIsloading(false);
        setModal(false);
        resolveToast("Successfully Updated Profile");
        console.log(res, "response");
        Cookies.set("email", res?.data?.data?.email);
        Cookies.set("name", res?.data?.data?.name);
        window.location.reload();
      }
    } catch (err) {
      if (err?.response?.data?.message[0] !== "I") {
        rejectToast(err?.response?.data?.message[0]);
      } else {
        rejectToast(err?.response?.data?.message);
      }
    }
  };

  return (
    <main className="w-full">
      <section className="flex items-center justify-center">
        <div className="rounded-lg bg-white shadow-sm  w-full p-10">
          <h2 className="text-xl font-bold mb-4">Profile Details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Name"
              name="name"
              value={authState?.name}
              type="text"
              placeholder="**************"
              register={register}
              errors={errors}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={authState?.email}
              placeholder="**************"
              register={register}
              errors={errors}
            />
            <div className="mt-8 float-right">
              <Button
                type="submit"
                text="Update Profile"
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
