"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import withAuth from "@/components/hocs/withAuth";
import Button from "@/components/ui/Button";
import { useAuth } from "@/store/AuthContext";
import { useToast } from "@/hooks/useToast";
import ChangePasword from "@/components/auth/ChangePasword";
import CreatePopUPGeneral from "@/components/popups/Create/CreatePopUPGeneral";

const Page = () => {
  const { resolveToast, rejectToast } = useToast();
  const { authState } = useAuth();
  const router = useRouter();
  const [modal, setModal] = useState(false);

  return (
    <main className="w-full bg-gray-100">
      <section className="flex items-center justify-center min-h-screen">
        <div className="rounded-lg bg-white shadow-lg max-w-[45rem] w-full sm:py-16 p-8">
          <h2 className="text-2xl font-bold mb-4 text-center uppercase">
            ADMIN Details
          </h2>
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm font-semibold">Email</div>
              <div className="bg-gray-200 rounded-lg py-2 px-4">
                {authState?.email}
              </div>
            </div>
            <div className="self-center w-full">
              <Button
                type="submit"
                text="Update Profile"
                onClick={() => {
                  setModal(true);
                }}
                isLoading={modal}
              />
            </div>
          </div>
          <CreatePopUPGeneral modal={modal} setModal={setModal}>
            <ChangePasword setModal={setModal} modal={modal} />
          </CreatePopUPGeneral>
        </div>
      </section>
    </main>
  );
};

export default withAuth(Page);
