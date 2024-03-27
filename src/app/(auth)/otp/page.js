"use client";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/store/AuthContext";
import FullScreenLoader from "@/components/general/FullScreenLoader";
import { useState } from "react";
import OtpForm from "@/components/auth/OtpForm";

const { API } = require("@/Api");

const Otp = () => {
  const { resolveToast, rejectToast } = useToast();
  // const { authState, authDispatch } = useAuth();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const otp = async (data) => {
    try {
      setLoader(true);
      const res = await API.verifyOtp(data);
      if(res?.data?.status?.success){
        Cookies.set("otp_token", res?.data?.data?.token)
        setLoader(false)
        router.push('/reset')
        resolveToast("You OTP has been verified");
      }
    } catch (err) {
      rejectToast("Invalid OTP");
      setLoader(false)
      console.log(err);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="rounded-lg bg-white shadow-sm w-[35rem] p-8">
        <h2 className="text-xl font-bold mb-4">PASSWORD FORGOT OTP</h2>
        <OtpForm otp={otp} loader={loader} />
      </div>
    </section>
  );
};

export default Otp;
