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
import UpdateEvent from "@/components/screens/subcategories/UpdateModal";
import Loading from "../../loading";
import CreatePopUPGeneral from "@/components/popups/Create/CreatePopUPGeneral";
import BrandTable from "@/components/screens/categories/Table";
import CategoryTable from "@/components/screens/categories/Table";
import CreateCategory from "@/components/screens/categories/CreateModal";
import CreateSubCategory from "@/components/screens/subcategories/CreateModal";
import SubCategoryTable from "@/components/screens/subcategories/Table";

const page = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState(null);

  const getAll = async () => {
    try {
      setLoader(true);
      const res = await API.getAllSubCategory();
      setBrands(res?.data?.data);
      const response = await API.getAllCategpries();
      setCategory(response?.data?.data);
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

  return (
    <main className="w-full">
      <header className="flex items-center justify-between lg:m-8 m-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Sub Categories</h1>
          <p>Manage Sub Categories.</p>
        </div>
        <Button
          text="Add Sub Category"
          icon={<Plus className="h-4 w-4 mr-2" />}
          onClick={() => setModal(true)}
          className="flex"
        />
      </header>
      <section className="m-8">
        {brands?.length > 0 ? (
          <div className="cards_info_table">
            <SubCategoryTable
              data={brands}
              handleUpdate={handleUpdate}
              getAll={getAll}
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
        title="Create Sub Category"
        modal={modal}
        setModal={setModal}
      >
        <CreateSubCategory
          setModal={setModal}
          setBrands={setBrands}
          brands={brands}
          category={category}
        />
      </CreatePopUPGeneral>
      <CreatePopUPGeneral
        title="Update Sub Category"
        modal={updateModal}
        setModal={setUpdateModal}
      >
        <UpdateEvent
          category={category}
          item={item}
          getAll={getAll}
          setUpdateModal={setUpdateModal}
        />
      </CreatePopUPGeneral>
    </main>
  );
};

export default withAuth(page);
