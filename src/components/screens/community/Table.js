/** @format */

import CustomTable from "@/components/ui/Table";
import { DeleteIcon } from "@/components/ui/TableComponents/DeleteIcon";
import { Edit } from "lucide-react";

const CommunityTable = ({ data, getAll, handleUpdate }) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row?.id,
      sortable: true,
      grow: 0,
    },
    {
      name: "First Name",
      selector: (row) => row?.first_name,
      sortable: true,
      grow: 3,
    },
    {
      name: "Last Name",
      selector: (row) => row?.last_name,
      sortable: true,
      grow: 3,
    },
    {
      name: "Rating",
      selector: (row) => row?.rating,
      sortable: true,
      grow: 3,
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
        bool={"community"}
        getAll={getAll}
      />
    </>
  );
};

export default CommunityTable;
