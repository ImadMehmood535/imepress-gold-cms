/** @format */

import CustomTable from "@/components/ui/Table";
import { DeleteIcon } from "@/components/ui/TableComponents/DeleteIcon";
import { Edit } from "lucide-react";

const BoxTypeTable = ({ data, getAll, handleUpdate }) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row?.id,
      sortable: true,
      grow: 0,
    },
    {
      name: "Name",
      cell: (row) => {
        return (
          <div className="text-wrap">
            <p>{row?.name}</p>
          </div>
        );
      },
      sortable: true,
      grow: 3,
    },
    {
      name: "Date and Time",
      selector: (row) =>
        new Date(row?.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      sortable: true,
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
      <CustomTable columns={columns} data={data} bool={false} getAll={getAll} />
    </>
  );
};

export default BoxTypeTable;
