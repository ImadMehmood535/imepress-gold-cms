"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import withAuth from "@/components/hocs/withAuth";
import Button from "@/components/ui/Button";
import { useAuth } from "@/store/AuthContext";
import { useToast } from "@/hooks/useToast";

import ChangePasword from "@/components/auth/ChangePasword";
import CreatePopUPGeneral from "@/components/popups/Create/CreatePopUPGeneral";
import ChangeProfile from "@/components/auth/ChangeProfile";

const Page = () => {
  const { authState } = useAuth();
  const [modal, setModal] = useState(false);

  return (
    <main className="w-full">
      <section className="flex items-center justify-center h-screen">
        <div className="rounded-lg bg-white shadow-sm w-[45rem] p-8">
          <h2 className="text-xl font-bold mb-4">ADMIN</h2>
          <div
            className={` mt-4 px-4 relative py-2 rounded-lg bg-gray-200/95 flex flex-col gap-4`}
          >
            <p className="text-sm">Name</p>
            <p className="bg-white/90 text-sm py-2 px-3 rounded-lg">
              {authState?.name}
            </p>
            <p className="text-sm">EMAIl</p>
            <p className="bg-white/90 text-sm py-2 px-3 rounded-lg">
              {authState?.email}
            </p>
            <Button
              type="submit"
              text="Update Profile"
              className="self-end"
              onClick={() => {
                setModal(true);
              }}
              isLoading={modal}
            />
          </div>
           
          <CreatePopUPGeneral modal={modal} setModal={setModal}>
            <ChangeProfile setModal={setModal} modal={modal} />
          </CreatePopUPGeneral>
        </div>
      </section>
    </main>
  );
};

export default withAuth(Page);
