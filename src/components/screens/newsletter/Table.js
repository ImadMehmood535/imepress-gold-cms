import CustomTable from "@/components/ui/Table";

const NewsLetterTable = ({ data, getAll }) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row.no,
      sortable: true,
      grow: 0,
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
  ];

  return (
    <>
      <CustomTable columns={columns} data={data} getAll={getAll} />
    </>
  );
};

export default NewsLetterTable;
