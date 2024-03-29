import CustomTable from "@/components/ui/Table";
import { Avatar } from "@nextui-org/react";
import { BadgeX, Edit } from "lucide-react";
import Image from "next/image";

const BlogsTable = ({ data, getAll, handleUpdate, handleDelete }) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row?.id,
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
      grow: 3,
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
            <BadgeX
              size={20}
              className="cursor-pointer text-red-500 hover:text-red-900"
              onClick={() => handleDelete(row?.id)}
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

export default BlogsTable;
