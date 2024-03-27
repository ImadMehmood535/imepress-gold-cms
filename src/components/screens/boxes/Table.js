/** @format */

import { API } from "@/Api";
import CustomTable from "@/components/ui/Table";
import { DeleteIcon } from "@/components/ui/TableComponents/DeleteIcon";
import { useToast } from "@/hooks/useToast";
import { Edit } from "lucide-react";

const BoxesTable = ({ data, getAll, handleUpdate }) => {
  const { resolveToast, rejectToast } = useToast();

  const columns = [
    {
      name: "Id",
      selector: (row) => row?.id,
      sortable: true,
      grow: 0,
    },
    {
      name: "Title",
      cell: (row) => {
        return (
          <div className="break-all text-wrap">
            <p>{row?.title}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: "Name",
      cell: (row) => {
        return (
          <div className="break-all text-wrap">
            <p>{row?.item_name}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: "Type",
      cell: (row) => {
        return (
          <div className="break-all text-wrap">
            <p>{row?.type}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: "Brands",
      cell: (row) => {
        return (
          <div className="break-all text-wrap">
            <p className="flex flex-col">
              {row?.brands?.map((i) => {
                return <p>{i?.name}</p>;
              })}
            </p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: "Quantity",
      cell: (row) => {
        return (
          <div className="break-all text-wrap ">
            <p>{row?.item_quantity}</p>
          </div>
        );
      },
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
        bool={"boxes"}
        getAll={getAll}
      />
    </>
  );
};

export default BoxesTable;
