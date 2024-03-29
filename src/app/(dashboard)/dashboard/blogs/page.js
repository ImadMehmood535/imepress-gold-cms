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
import CreatePopUPGeneral from "@/components/popups/Create/CreatePopUPGeneral";
import BlogsTable from "@/components/screens/blogs/Table";
import CreateBlogs from "@/components/screens/blogs/CreateModal";
import UpdateBlog from "@/components/screens/blogs/UpdateModal";
import { useToast } from "@/hooks/useToast";

const page = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(false);
  const { resolveToast, rejectToast } = useToast();

  const getAll = async () => {
    try {
      setLoader(true);
      const res = await API.getAllBlogs();
      setBrands(res?.data?.data);
    } catch (err) {
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

  const handleDelete = async (id) => {
    try {
      await API.deleteBlogs(id);
      setBrands(brands.filter((item) => item?.id != id));
      resolveToast("Successfully deleted");
    } catch (error) {
      rejectToast("Can not delete");
    }
  };

  return (
    <main className="w-full">
      <header className="flex items-center justify-between lg:m-8 m-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">All blogs</h1>
          <p>Manage blogs.</p>
        </div>
        <Button
          text="Add blogs"
          icon={<Plus className="h-4 w-4 mr-2" />}
          onClick={() => setModal(true)}
          className="flex"
        />
      </header>
      <section className="m-8">
        {brands?.length > 0 ? (
          <div className="cards_info_table">
            <BlogsTable
              data={brands}
              handleUpdate={handleUpdate}
              getAll={getAll}
              handleDelete={handleDelete}
            />
          </div>
        ) : loader ? (
          <Loading />
        ) : (
          <NoContent
            type="Brands"
            onClick={() => setModal(true)}
            icon={<Blocks className="w-[5rem] h-[5rem] stroke-[1.3]" />}
          />
        )}
      </section>
      <CreatePopUPGeneral
        title="Create Brand"
        modal={modal}
        setModal={setModal}
      >
        <CreateBlogs
          setModal={setModal}
          setBrands={setBrands}
          brands={brands}
        />
      </CreatePopUPGeneral>
      <CreatePopUPGeneral
        title="Update Brands"
        modal={updateModal}
        setModal={setUpdateModal}
      >
        <UpdateBlog
          item={item}
          getAll={getAll}
          setUpdateModal={setUpdateModal}
        />
      </CreatePopUPGeneral>
    </main>
  );
};

export default withAuth(page);
