/** @format */

import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./SearchFilter";
import ExpndablesUserRow from "./ExpandableUserRows";
import ExpndableBoxRow from "./ExpandableBoxRows";
import ExpndablesOrdersRow from "./ExpndablesOrderRows";
import ExpndablesSubscriptionRow from "./ExpandableSubscriptionRows";
import ExpndableCommunityRow from "./ExpandableCommunityRows";

const CustomTable = ({ data, columns, title, setRows, bool, getAll }) => {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const handleChange = ({ selectedRows }) => {
    if (setRows) {
      setRows(selectedRows);
    }
  };

  const filteredItems = data?.filter(
    (item) =>
      JSON.stringify(
        item?.name ? item?.name : item?.user ? item?.User?.name : item?.email
      )
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const expandableRowsComponent = (props) => {
    return (
      <>
        {bool == "category" ? (
          <ExpndableBoxRow data={props?.data} getAll={getAll} />
        ) : bool == "orders" ? (
          <ExpndablesOrdersRow data={props?.data} getAll={getAll} />
        ) : bool == "community" ? (
          <ExpndableCommunityRow data={props?.data} getAll={getAll} />
        ) : bool == "product" ? (
          <ExpndablesUserRow data={props?.data} getAll={getAll} />
        ) : (
          bool == "subscription" && (
            <ExpndablesSubscriptionRow data={props?.data} getAll={getAll} />
          )
        )}
      </>
    );
  };

  return (
    <DataTable
      title={title}
      expandableRows={bool ? true : false}
      columns={columns}
      data={filteredItems}
      defaultSortFieldId={0}
      striped="true"
      pagination="true"
      subHeader="true"
      paginationPerPage={15}
      dense="true"
      expandableRowsComponent={expandableRowsComponent}
      subHeaderComponent={subHeaderComponent}
      selectableRows={setRows ? true : false}
      onSelectedRowsChange={handleChange}
    />
  );
};

export default CustomTable;
