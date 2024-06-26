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
import UpdateEvent from "@/components/screens/products/UpdateModal";
import Loading from "../../loading";
import CreateBrands from "@/components/screens/brands/CreateModal";
import CreatePopUPGeneral from "@/components/popups/Create/CreatePopUPGeneral";
import ProductTable from "@/components/screens/products/Table";
import CreateProduct from "@/components/screens/products/CreateModal";
import { useToast } from "@/hooks/useToast";

const page = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [allBrands, setAllBrands] = useState(null);
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(false);
  const { resolveToast, rejectToast } = useToast();

  const getAll = async () => {
    try {
      setLoader(true);
      const res = await API.getProducts();
      setBrands(res?.data?.data);
    } catch (err) {
    } finally {
      setLoader(false);
    }
  };
  const getAllSelects = async () => {
    try {
      setLoader(true);
      const res = await API.getAllBrands();
      setAllBrands(res?.data?.data);

      const response = await API.getCategorirs();
      setCategories(response?.data?.data);

      const response2 = await API.getAllSubCategory();
      setSubCategories(response2?.data?.data);
    } catch (err) {
    } finally {
      setLoader(false);
    }
  };

  const handleUpdate = (row) => {
    setItem(row);
    setUpdateModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await API.deleteProduct(id);
      setBrands(brands.filter((item) => item?.id != id));
      resolveToast("Successfully deleted");
    } catch (error) {
      rejectToast("Can not delete");
    }
  };

  useEffect(() => {
    getAll();
    getAllSelects();
  }, []);

  if (!authState.loading && !authState.role === "admin") {
    return router.push("/");
  }

  return (
    <main className="w-full">
      <header className="flex items-center justify-between lg:m-8 m-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p>Manage Products.</p>
        </div>
        <Button
          text="Add Products"
          icon={<Plus className="h-4 w-4 mr-2" />}
          onClick={() => setModal(true)}
          className="flex"
        />
      </header>
      <section className="m-8">
        {brands?.length > 0 ? (
          <div className="cards_info_table">
            <ProductTable
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
            type="Products"
            onClick={() => setModal(true)}
            icon={<Blocks className="w-[5rem] h-[5rem] stroke-[1.3]" />}
          />
        )}
      </section>
      <CreatePopUPGeneral
        title="Create Product"
        modal={modal}
        setModal={setModal}
      >
        <CreateProduct
          setModal={setModal}
          getAll={getAll}
          setBrands={setBrands}
          brands={allBrands}
          categories={categories}
          subCategories={subCategories}
        />
      </CreatePopUPGeneral>
      <CreatePopUPGeneral
        title="Update Product"
        modal={updateModal}
        setModal={setUpdateModal}
      >
        <UpdateEvent
          brands={allBrands}
          categories={categories}
          subCategories={subCategories}
          item={item}
          getAll={getAll}
          setUpdateModal={setUpdateModal}
        />
      </CreatePopUPGeneral>
    </main>
  );
};

export default withAuth(page);
