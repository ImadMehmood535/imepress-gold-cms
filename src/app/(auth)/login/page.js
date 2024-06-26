/** @format */

"use client";
import "react-toastify/dist/ReactToastify.css";
import LogInForm from "@/components/auth/login-form";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/store/AuthContext";
import FullScreenLoader from "@/components/general/FullScreenLoader";
import { useState } from "react";
import Image from "next/image";
import { logo } from "@/assets";

const { API } = require("@/Api");

const Login = () => {
  const { resolveToast, rejectToast } = useToast();
  const { authState, authDispatch } = useAuth();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const login = async (data) => {
    try {
      setLoader(true);
      const res = await API.loginUser(data);
      Cookies.set("token", res?.data?.data?.token);
      Cookies.set("email", res?.data?.data?.email);
      Cookies.set("name", res?.data?.data?.name);
      setTimeout(() => {
        router.push("/dashboard/blogs");
      }, 1000);
      resolveToast("You have successfully logged in");
    } catch (err) {
      rejectToast("Email or password is not valid");
    } finally {
      setLoader(false);
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
        <Image src={logo} alt="image" width={400} height={400} className="max-w-[200px] mb-4 mx-auto" />
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          ADMIN LOGIN IMEPRESS GOLD
        </h2>
        <LogInForm login={login} loader={loader} />
      </div>
    </section>
  );
};

export default Login;
