import React from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { Dialog, DialogTitle } from "@material-ui/core";
const Table = () => {
  const currentDate = moment().format("LL");
  const data = [
    {
      name: "Murari Kumar",
      amount: 34,
      phoneNumber: "9934099340",
      date: currentDate,
      CurrentMoney: 56,
    },
    {
      name: "Sanjeev Thakur",
      amount: 35,
      phoneNumber: "9934099341",
      date: currentDate,
      CurrentMoney: 56,
    },
    {
      name: "Arbind Singh",
      amount: 36,
      phoneNumber: "9934099342",
      date: currentDate,
      CurrentMoney: 56,
    },
  ];
  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "PhoneNumber",
      field: "phoneNumber",
    },
    {
      title: "Amount",
      field: "amount",
    },
    {
      title: "Date",
      field: "date",
    },
    {
      title: "Current Money",
      field: "CurrentMoney",
    },
    {
      title: "Custom Add",
      field: "internal_action",
      editable: false,
      render: () => <button>View Transaction</button>,
    },
  ];
  return (
    <div>
      <MaterialTable
        title='MyMoneyFlow'
        data={data}
        columns={columns}
        options={{
          headerStyle: {
            backgroundColor: "#e0bfbf",
          },

          paging: true,
          exportButton: true,
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Save User",
            //   onClick: (event, rowData) => alert("You saved " + rowData.name)
          },
          {
            icon: "delete",
            tooltip: "Delete User",
            //   onClick: (event, rowData) => confirm("You want to delete " + rowData.name)
          },
        ]}
      />
      <Dialog open={false}>
        <DialogTitle>Set backup account</DialogTitle>
      </Dialog>
    </div>
  );
};

export default Table;
