
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { forgotPassword } from '@/lib/yup-validations';
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { API } from '@/Api';

export default function ForgetPasword({setModal, modal}) {
    const  [isloading, setIsloading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(forgotPassword),
      });


      const onSubmit = async (data) => {
        setIsloading(true)
       try{
        console.log(data)
        const res = await API.forgotPassword(data)
        if(res?.data?.status?.success){
          Cookies.set('otp_token', res?.data?.data?.token)
          setIsloading(false)
          setModal(false)
          router.push('/otp')
        }
        // {errors ?
        //     setIsloading(true)
        //     :

        //     setIsloading(false)
        //     setModal(false)
        // }

       }catch(err){
        console.log(err)
       }
      };

  return (
    <main className="w-full">
      <section className="flex items-center justify-center">
        <div className="rounded-lg bg-white shadow-sm  w-full p-10">
          <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <Input
              label="EMAIL"
              name="email"
              type="email"
              placeholder="jhondeo@gmail.com"
              register={register}
              errors={errors}
            />
             {/* <Input
              label="ENTER NEW PASSWORD"
              name="rePassword"
              type="password"
              placeholder="**************"
              register={register}
              errors={errors}
            /> */}
            <div className="mt-8 float-right">
              <Button
                type="submit"
                text="Forgot Password"
                className="flex items-center justify-center"
                onClick={() => {}}
                isLoading={isloading}
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
