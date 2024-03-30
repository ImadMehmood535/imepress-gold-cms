import { API } from "@/Api";
import CustomTable from "@/components/ui/Table";
import { useToast } from "@/hooks/useToast";
import { CheckCheck, CheckCircle2 } from "lucide-react";
import { Edit } from "lucide-react";

const OrdersTable = ({ data, getAll }) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row?.no,
      sortable: true,
      grow: 0,
    },
    {
      name: "Total Price",
      selector: (row) => row?.totalPrice,
      sortable: true,
      grow: 2,
    },
    {
      name: "Total Items",
      selector: (row) => row?.orderItems?.length,
      sortable: true,
      grow: 2,
    },
    {
      name: "Customer Name",
      selector: (row) => row?.User?.name,
      sortable: true,
      grow: 2,
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
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        data={data}
        getAll={getAll}
        bool={"orders"}
      />
    </>
  );
};

export default OrdersTable;
