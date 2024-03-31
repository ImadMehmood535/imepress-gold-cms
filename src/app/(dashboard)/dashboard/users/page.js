"use client";
import React, { useEffect, useState } from "react";
import { Blocks, Plus } from "lucide-react";
import { API } from "@/Api";
import Button from "@/components/ui/Button";
import NoContent from "@/components/ui/NoContent";
import withAuth from "@/components/hocs/withAuth";
import { useAuth } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "../../loading";

import UsersTable from "@/components/screens/users/UserTable";
import { useToast } from "@/hooks/useToast";

const page = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [modal, setModal] = useState(false);
  const { resolveToast, rejectToast } = useToast();
  const [loader, setLoader] = useState(false);

  const handleUpdate = async (row) => {
    try {
      const response = await API.updateUserByAdmin(row);
      getAll();
      resolveToast(response?.data?.message);
    } catch (error) {
      console.log(error);
      rejectToast(error?.response?.data?.message);
    }
  };

  const getAll = async () => {
    try {
      setLoader(true);
      const res = await API.getAllUsers();
      setBrands(res?.data?.data);
    } catch (err) {
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  if (!authState.loading && !authState.role === "admin") {
    return router.push("/");
  }

  return (
    <main className="w-full">
      <header className="flex items-center justify-between lg:m-8 m-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Users</h1>
          <p>Manage Users.</p>
        </div>
      </header>
      <section className="m-8">
        {brands?.length > 0 ? (
          <div className="cards_info_table">
            <UsersTable
              data={brands}
              getAll={getAll}
              handleUpdate={handleUpdate}
            />
          </div>
        ) : loader ? (
          <Loading />
        ) : (
          <NoContent
            type="Users"
            onClick={() => setModal(true)}
            icon={<Blocks className="w-[5rem] h-[5rem] stroke-[1.3]" />}
          />
        )}
      </section>

      {/* <CreatePopUPGeneral
        title="Update Category"
        modal={updateModal}
        setModal={setUpdateModal}
      >
        <UpdateEvent
          item={item}
          getAll={getAll}
          setUpdateModal={setUpdateModal}
        />
      </CreatePopUPGeneral> */}
    </main>
  );
};

export default withAuth(page);
