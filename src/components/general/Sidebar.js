/** @format */

"use client";

import Link from "next/link";

import {
  ChevronDown,
  Settings,
  AtSign,
  UserPlus2,
  AlignJustify,
  AlignEndHorizontal,
  User,
  LogOut,
} from "lucide-react";

import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });
import withAuth from "../hocs/withAuth";
import { useAuth } from "@/store/AuthContext";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1060) {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { resolveToast, rejectToast } = useToast();
  const { authState, authDispatch } = useAuth();
  console.log(authState);
  const path = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    resolveToast("Successfully Logged out");
    router.push("/login");
  };

  return (
    <div
      style={inter.style}
      className={`   flex ${
        isOpen
          ? "max-w-[15rem] lg:sticky fixed left-0 top-0 bottom-0 lg:z-[0] z-[1] shadow-xl lg:shadow-none "
          : "sticky max-w-[3rem] left-0 top-0 bottom-0 px-4"
      }  w-full transition-all duration-300 ease-out h-screen flex-col justify-between border-e bg-white`}
    >
      <div className=" relative py-6">
        <AlignJustify
          onClick={() => setIsOpen((prev) => !prev)}
          className={`h-6 ${
            isOpen ? "right-2 top-3" : "-right-1 top-3"
          }  w-6 text-gray-400 absolute transition-all duration-300 ease-out  cursor-pointer`}
          stroke="currentColor"
        />
        <nav aria-label="Main Nav" className="mt-8 flex flex-col space-y-1">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className={`flex cursor-pointer items-center rounded-lg ${
                isOpen
                  ? "px-4 hover:bg-gray-100 justify-between"
                  : "justify-center"
              }  py-2 
                } text-gray-500 hover:text-gray-700`}
            >
              <div className="flex items-center justify-center gap-2">
                <AlignEndHorizontal
                  onClick={() => {
                    if (!isOpen) setIsOpen(true);
                  }}
                  className="h-5 w-5 opacity-75"
                  stroke="currentColor"
                />
                <span
                  className={` ${
                    isOpen ? "block" : "hidden"
                  } text-sm font-medium`}
                >
                  {" "}
                  Dashboard{" "}
                </span>
              </div>
              <span
                className={`shrink-0  group-open:-rotate-180
              ${isOpen ? "block" : "hidden"}
              `}
              >
                <ChevronDown
                  className="h-5 w-5 opacity-75"
                  stroke="currentColor"
                  strokeWidth={2.5}
                />
              </span>
            </summary>

            {authState.role === "admin" && isOpen && (
              <nav aria-label="Teams Nav" className="mt-1 flex flex-col px-4">
                <Link
                  href="/dashboard/feedback-forms"
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500  hover:bg-gray-100 hover:text-gray-700 ${
                    path == "/dashboard/feedback-forms" && "bg-gray-100"
                  }`}
                >
                  <span className="text-sm font-medium">Forms </span>
                </Link>
              </nav>
            )}
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className={`flex cursor-pointer items-center rounded-lg ${
                isOpen
                  ? "px-4 hover:bg-gray-100 justify-between"
                  : "justify-center"
              }  py-2 
                } text-gray-500 hover:text-gray-700`}
            >
              <div className="flex items-center justify-center gap-2">
                <Settings
                  onClick={() => {
                    if (!isOpen) setIsOpen(true);
                  }}
                  className="h-5 w-5 opacity-75"
                  stroke="currentColor"
                />
                <span
                  className={` ${
                    isOpen ? "block" : "hidden"
                  } text-sm font-medium`}
                >
                  {" "}
                  Account setting{" "}
                </span>
              </div>
              <span
                className={`shrink-0  group-open:-rotate-180
              ${isOpen ? "block" : "hidden"}
              `}
              >
                <ChevronDown
                  className="h-5 w-5 opacity-75"
                  stroke="currentColor"
                  strokeWidth={2.5}
                />
              </span>
            </summary>

            {authState.role === "admin" && isOpen && (
              <nav aria-label="Teams Nav" className="mt-1 flex flex-col px-4">
                <Link
                  href="/settings/adminProfile"
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500  hover:bg-gray-100 hover:text-gray-700 ${
                    path == "/settings/adminProfile" && "bg-gray-100"
                  }`}
                >
                  <span className="text-sm font-medium">Profile </span>
                </Link>
              </nav>
            )}

            {authState.role === "admin" && isOpen && (
              <nav aria-label="Teams Nav" className="mt-1 flex flex-col px-4">
                <Link
                  href="/settings/adminUser"
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500  hover:bg-gray-100 hover:text-gray-700 ${
                    path == "/settings/adminUser" && "bg-gray-100"
                  }`}
                >
                  <span className="text-sm font-medium">Change Password </span>
                </Link>
              </nav>
            )}
          </details>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div
          className={`flex items-center justify-center gap-2  ${
            isOpen ? "px-4 hover:bg-gray-100" : ""
          }  bg-white  py-6`}
        >
          <div className="min-w-6">
            <User className={`h-6 w-6 ${isOpen ? "" : "text-gray-500"} `} />
          </div>

          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } items-center justify-between w-full`}
          >
            <p className="text-xs">
              <strong className="block font-medium max-w-[150px] truncate">
                {authState.email}
              </strong>
            </p>
            <LogOut
              onClick={handleLogout}
              className="w-4 h-4 text-red-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Sidebar);
