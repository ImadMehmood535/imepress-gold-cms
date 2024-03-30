/** @format */

import { API } from "@/Api";
import CustomTable from "@/components/ui/Table";
import { DeleteIcon } from "@/components/ui/TableComponents/DeleteIcon";
import { useToast } from "@/hooks/useToast";
import { Edit } from "lucide-react";
import Image from "next/image";

const ProductTable = ({ data, getAll, handleUpdate }) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row?.no,
      sortable: true,
      grow: 0,
    },
    {
      name: "Image",
      cell: (row) => {
        return (
          <div className="break-all text-wrap max-w-[400px]">
            <Image
              src={row?.imageUrl}
              alt="blog"
              width={400}
              height={400}
              className="max-w-[150px] py-3  "
            />
          </div>
        );
      },
      sortable: true,
      grow: 1.5,
    },

    {
      name: "Title",
      cell: (row) => {
        return (
          <div className="break-all text-wrap">
            <p>{row?.name}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },

    // {
    //   name: "Category",
    //   cell: (row) => {
    //     return (
    //       <div className="break-all text-wrap">
    //         <p>{row?.type}</p>
    //       </div>
    //     );
    //   },
    //   sortable: true,
    //   grow: 1,
    // },
    // {
    //   name: "Subcategory",
    //   cell: (row) => {
    //     return (
    //       <div className="break-all text-wrap ">
    //         <p>{row?.subCategory}</p>
    //       </div>
    //     );
    //   },
    //   grow: 1,
    // },
    {
      name: "Brand",
      cell: (row) => {
        return (
          <div className="break-all text-wrap">
            <p>{row?.brand}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },

    {
      name: "Price",
      cell: (row) => {
        return (
          <div className="break-all text-wrap ">
            <p>{row?.price}</p>
          </div>
        );
      },
      grow: 1,
    },
    {
      name: "Buttons",
      button: true,
      cell: (row) => {
        return (
          <div className="flex justify-around min-w-[5rem]">
            <Edit
              size={20}
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleUpdate(row)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        data={data}
        bool={"product"}
        getAll={getAll}
      />
    </>
  );
};

export default ProductTable;
