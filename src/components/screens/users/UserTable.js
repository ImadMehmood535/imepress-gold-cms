import { API } from "@/Api";
import CustomTable from "@/components/ui/Table";
import { useToast } from "@/hooks/useToast";
import { Button, Tooltip } from "@nextui-org/react";
import { BadgeX, Edit } from "lucide-react";
import Image from "next/image";

const UsersTable = ({ data, handleUpdate }) => {
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
          <div className="w-20 h-16 rounded-xl my-1">
            <Image
              alt="user-img"
              className="rounded-full w-16 h-16"
              src={
                row?.imageUrl ||
                "https://res.cloudinary.com/dgpltd5no/image/upload/v1711705006/imepress_gold/image/wp2614327-wallpaper-red-dead-redemption-1711705003178.jpg"
              }
              width={1000}
              height={1000}
            />
          </div>
        );
      },
      grow: 0,
    },
    {
      name: "Full Name",
      cell: (row) => {
        return (
          <div className="w-20 my-1 whitespace-nowrap">
            <p>{row?.name}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: "Email",
      cell: (row) => {
        return (
          <div className="w-20 my-1">
            <p className="whitespace-nowrap">{row?.email}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },

    {
      name: "Phone Number",
      cell: (row) => {
        return (
          <div className="w-20 my-1">
            <p>{row?.phoneNumber}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1.5,
    },

    {
      name: "Joined On ",
      cell: (row) => {
        return (
          <div className="w-20 my-1">
            <p>{row?.date?.slice(0, 10)}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1.5,
    },
    {
      name: "Status",
      button: true,
      cell: (row) => {
        return (
          <div className="flex justify-around min-w-[5rem]">
            <Tooltip
              color="warning"
              content={`${
                row?.isBlocked ? "Click to Unblock" : "Click to Block"
              }`}
              className={`${
                row?.isBlocked ? "bg-green-600" : "bg-red-600"
              } p-3 rounded-lg text-white`}
            >
              <Button
                onClick={() =>
                  handleUpdate({ id: row?.id, isBlocked: !row?.isBlocked })
                }
                className={`${
                  row?.isBlocked ? "bg-red-600" : " bg-green-600"
                }    max-w-[100px] w-full py-2 text-white  rounded-md`}
              >
                {row?.isBlocked ? "Blocked" : "Active"}
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <CustomTable columns={columns} data={data} bool={false} />
    </>
  );
};

export default UsersTable;
