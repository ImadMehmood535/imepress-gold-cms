"use client";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/store/AuthContext";
import FullScreenLoader from "@/components/general/FullScreenLoader";
import { useState } from "react";
import ResetForm from "@/components/auth/ResetForm";

const { API } = require("@/Api");

const Reset = () => {
  const { resolveToast, rejectToast } = useToast();
  const { authState, authDispatch } = useAuth();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const reset = async (data) => {
    try {
      setLoader(true);
      const res = await API.resetPassword(data);
      if(res?.data?.status?.success){
        setLoader(false)
        router.push('/login')
        resolveToast("Your password has been successfully Reset");
        Cookies.remove("otp_token")
      }
      
    } catch (err) {
      rejectToast("Failed to Reset password");
      setLoader(false)
      Cookies.remove("otp_token")
      console.log(err);
    }
  };

  if (authState.loading) {
    return <FullScreenLoader />;
  } else if (authState.isLoggedIn) {
    return router.push("/");
  }

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="rounded-lg bg-white shadow-sm w-[35rem] p-8">
        <h2 className="text-xl font-bold mb-4">RESET PASSWORD</h2>
        <ResetForm reset={reset} loader={loader} />
      </div>
    </section>
  );
};

export default Reset;
