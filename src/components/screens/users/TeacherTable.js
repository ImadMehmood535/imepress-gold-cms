import { API } from "@/Api";
import CustomTable from "@/components/ui/Table";
import { useToast } from "@/hooks/useToast";
import { CheckCheck, CheckCircle2, X } from "lucide-react";
import Image from "next/image";

const TeacherTable = ({ data, getUsers }) => {
  const { resolveToast, rejectToast } = useToast();
  const updateDetails = async (id, type, val) => {
    try {
      const data =
        type == "featured" ? { is_featured: val } : { is_sponsored: val };
      const res = await API.updateTeachers(id, data);
      resolveToast(res?.data?.message);
      getUsers();
    } catch (err) {
      if (!err?.response?.data?.success) {
        rejectToast(err?.response?.data?.message || err?.response?.data?.error);
      } else {
        rejectToast(err?.message);
      }
    }
  };
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
                (row?.image?.startsWith("https://") && row?.image) ||
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
      name: "Name",
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
      name: "Featured",
      cell: (row) => {
        return !row?.is_featured ? (
          <div className="flex cursor-pointer justify-around items-center min-w-[5rem] flex-col ">
            <X size={20} color="red" />
            <p
              className="text-white cursor-pointer bg-green-500 px-2 py-2 rounded-lg"
              onClick={() => updateDetails(row?.id, "featured", true)}
            >
              Featured
            </p>
          </div>
        ) : (
          <div className="flex justify-around items-center min-w-[5rem] flex-col ">
            <CheckCheck size={20} color="green" />
            <p
              className="text-white cursor-pointer bg-orange-500 px-2 py-2 rounded-lg"
              onClick={() => updateDetails(row?.id, "featured", false)}
            >
              Unfeature
            </p>
          </div>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: "Sponsored",
      cell: (row) => {
        console.log(row);
        return !row?.is_sponsored ? (
          <div className="flex cursor-pointer justify-around items-center min-w-[5rem] flex-col ">
            <X size={20} color="red" />
            {row?.user_box?.length < 1 && (
              <p
                className="text-white cursor-pointer bg-green-500 px-2 py-2 rounded-lg"
                onClick={() => updateDetails(row?.id, "sponsored", true)}
              >
                Sponsor
              </p>
            )}
          </div>
        ) : (
          <div className="flex justify-around items-center min-w-[5rem] flex-col ">
            <CheckCheck size={20} color="green" />
            {row?.user_box?.length < 1 && (
              <p
                className="text-white cursor-pointer bg-orange-500 px-2 py-2 rounded-lg"
                onClick={() => updateDetails(row?.id, "sponsored", false)}
              >
                Unsponsor
              </p>
            )}
          </div>
        );
      },
      grow: 1,
    },
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        getAll={getUsers}
        data={data}
        bool={"users"}
      />
    </>
  );
};

export default TeacherTable;
