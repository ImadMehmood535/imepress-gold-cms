/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { Blocks, Plus } from "lucide-react";
import { API } from "@/Api";
import CreatePopUp from "@/components/popups/Create/CreatePopup";
import Button from "@/components/ui/Button";
import NoContent from "@/components/ui/NoContent";
import withAuth from "@/components/hocs/withAuth";
import { useAuth } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import BrandTable from "@/components/screens/brands/Table";
import UpdateEvent from "@/components/screens/brands/UpdateModal";
import Loading from "../../loading";
import CreateBrands from "@/components/screens/brands/CreateModal";

const page = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(false);

  const getAll = async () => {
    try {
      setLoader(true);
      const res = await API.getForms();
      setData(res?.data?.data?.formData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const handleUpdate = (row) => {
    setItem(row);
    setUpdateModal(true);
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
          <h1 className="text-3xl font-bold mb-2">All forms</h1>
        </div>
        
      </header>
      <section className="m-8">
        {data?.length > 0 ? (
          <div className="cards_info_table">
            <BrandTable
              data={data}
              handleUpdate={handleUpdate}
              getAll={getAll}
            />
          </div>
        ) : loader ? (
          <Loading />
        ) : (
          <NoContent
            type="Feedback Forms"
            icon={<Blocks className="w-[5rem] h-[5rem] stroke-[1.3]" />}
          />
        )}
      </section>
     
    </main>
  );
};

export default withAuth(page);
