import { API } from "@/Api";
import CustomTable from "@/components/ui/Table";
import { useToast } from "@/hooks/useToast";
import { CheckCheck, CheckCircle2 } from "lucide-react";
import { Edit } from "lucide-react";

const SubscriptionTable = ({ data, getAll }) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row?.id,
      sortable: true,
      grow: 0,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
      grow: 2,
    },
    {
      name: "Packs",
      selector: (row) => row?.order_details?.length,
      sortable: true,
      grow: 2,
    },
    {
      name: "Created at",
      selector: (row) => row?.created_at?.slice(0, 10),
      sortable: true,
      grow: 2,
    },
    {
      name: "Net Amount",
      selector: (row) => row?.net_amount,
      sortable: true,
      grow: 2,
    },
  ];

  return (
    <>
      <CustomTable
        columns={columns}
        data={data}
        getAll={getAll}
        bool={"subscription"}
      />
    </>
  );
};

export default SubscriptionTable;
