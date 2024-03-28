import CustomTable from "@/components/ui/Table";
import { Edit } from "lucide-react";

const SubCategoryTable = ({ data, getAll, handleUpdate }) => {
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
          <div className="break-all text-wrap max-w-[400px]">
            <p>{row?.name}</p>
          </div>
        );
      },
      sortable: true,
      grow: 3,
    },
    {
      name: "Main Category",
      cell: (row) => {
        return (
          <div className="break-all text-wrap max-w-[400px]">
            <p>{row?.categoryName}</p>
          </div>
        );
      },
      sortable: true,
      grow: 3,
    },
    {
      name: "Date and Time",
      selector: (row) =>
        new Date(row?.date).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
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

export default SubCategoryTable;
