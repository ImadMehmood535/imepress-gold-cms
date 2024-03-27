import CreatePopUp from "@/components/popups/Create/CreatePopup";
import CustomTable from "@/components/ui/Table";
import { Edit } from "lucide-react";
import { useState } from "react";

const BrandTable = ({ data, getAll, handleUpdate }) => {
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
      name: "Email",
      cell: (row) => {
        return (
          <div className="break-all text-wrap max-w-[400px]">
            <p>{row?.email}</p>
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
      name: "Details",
      button: true,
      cell: (row) => {
        return (
          <div className="flex justify-around min-w-[5rem]">
            <Edit
              size={20}
              className="cursor-pointer hover:text-blue-500"
              onClick={() => {
                handleEdit(row);
                setModal(!modal);
              }}
            />
          </div>
        );
      },
    },
  ];

  const [modal, setModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const handleEdit = (row) => {
    setRowData(row);
    setModal(true);
  };
  return (
    <>
      <CustomTable columns={columns} data={data} bool={false} getAll={getAll} />
      <CreatePopUp
        modal={modal}
        setModal={setModal}
        title={"Feedback data"}
        rowData={rowData}
      />
    </>
  );
};

export default BrandTable;
