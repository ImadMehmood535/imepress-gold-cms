"use client";
import React, { useEffect, useState } from "react";
import { Blocks, Plus } from "lucide-react";
import { API } from "@/Api";
import NoContent from "@/components/ui/NoContent";
import withAuth from "@/components/hocs/withAuth";
import { useAuth } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "../../loading";
import CategoryTable from "@/components/screens/categories/Table";
import NewsLetterTable from "@/components/screens/newsletter/Table";

const page = () => {
  const { authState } = useAuth();
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const getAll = async () => {
    try {
      setLoader(true);
      const res = await API.getNewsLetter();
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
          <h1 className="text-3xl font-bold mb-2">All News Letters</h1>
        </div>
      </header>
      <section className="m-8">
        {brands?.length > 0 ? (
          <div className="cards_info_table">
            <NewsLetterTable data={brands} getAll={getAll} />
          </div>
        ) : loader ? (
          <Loading />
        ) : (
          <NoContent
            type="News Letters"
            onClick={() => setModal(true)}
            icon={<Blocks className="w-[5rem] h-[5rem] stroke-[1.3]" />}
          />
        )}
      </section>
    </main>
  );
};

export default withAuth(page);
