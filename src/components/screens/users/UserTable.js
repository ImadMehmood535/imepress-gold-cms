import { API } from "@/Api";
import CustomTable from "@/components/ui/Table";
import Image from "next/image";

const UsersTable = ({ data, getUsers }) => {
  console.log(data);
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
          <div className="w-20 h-16 rounded-xl my-1">
            <Image
              alt="user-img"
              className="rounded-xl w-20 h-16"
              src={
                (row?.image.startsWith("https://") && row?.image) ||
                "/images/placeholder.png"
              }
              width={1000}
              height={1000}
            />
          </div>
        );
      },
      grow: 1,
    },
    {
      name: "Email",
      cell: (row) => {
        return (
          <div className="w-20 my-1">
            <p>{row?.email}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: "Full Name",
      cell: (row) => {
        return (
          <div className="w-20 my-1">
            <p>{row?.firstname + " " + row?.lastname}</p>
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
            <p>{row?.phone}</p>
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
            <p>{row?.createdAt?.slice(0, 10)}</p>
          </div>
        );
      },
      sortable: true,
      grow: 1.5,
    },
    {
      name: "Address",
      cell: (row) => {
        return (
          <div className="w-20 my-1">
            <p>
              {row?.address +
                "annd shand lamddd, " +
                row?.postal_code +
                ", " +
                row?.city}
            </p>
          </div>
        );
      },

      sortable: true,
      grow: 1,
    },
  ];

  return (
    <>
      <CustomTable columns={columns} data={data} bool={false} />
    </>
  );
};

export default UsersTable;
