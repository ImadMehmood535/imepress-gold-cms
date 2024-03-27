"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import withAuth from "@/components/hocs/withAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { smtpValidationSchema } from "@/lib/yup-validations";
import { useAuth } from "@/store/AuthContext";
import { useToast } from "@/hooks/useToast";

const Page = () => {
  const { resolveToast, rejectToast } = useToast();
  const { authState } = useAuth();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(smtpValidationSchema),
  });

  // const fetchSmtpData = async () => {
  //   try {
  //     const res = await API.getSMTPData();
  //     reset({
  //       host: res.data.data.host,
  //       email: res.data.data.email,
  //       password: res.data.data.password,
  //       port: res.data.data.port,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onSubmit = async (data) => {
    // try {
    //   setIsUpdating(true);
    //   await API.updateSMTP(data);
    //   alert("SMTP UPDATED SUCCESSFULLY");
    // } catch (err) {
    //   if (!err.response.data.success) {
    //     alert(
    //       err.response.data.message ||
    //         err.response.data.error ||
    //         "There was an error Updating OTP"
    //     );
    //   } else {
    //     alert(err.message);
    //   }
    // } finally {
    //   setIsUpdating(false);
    // }
  };

  // useEffect(() => {
  //   // fetchSmtpData();
  // }, []);

 
  const formSubmit = (data) => {
    resolveToast("Your changes has been saved");
  };

  return (
    <main className="w-full">
      <section className="flex items-center justify-center h-screen">
        <div className="rounded-lg bg-white shadow-sm w-[45rem] p-8">
          <h2 className="text-xl font-bold mb-4">MAIL SETTING</h2>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-2 gap-x-4">
              <Input
                label="HOST"
                name="host"
                placeholder="smtp.google.com"
                register={register}
                errors={errors}
              />
              <Input
                label="PORT"
                name="port"
                type="number"
                placeholder="576"
                register={register}
                errors={errors}
              />
            </div>
            <Input
              label="EMAIL"
              name="email"
              placeholder="John Deo"
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
            <div className="mt-8 float-right">
              <Button
                type="submit"
                text="Save Changes"
                className="flex items-center justify-center"
                onClick={() => {}}
                isLoading={isUpdating}
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default withAuth(Page);
