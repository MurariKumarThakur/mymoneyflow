import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

import AddCustomer from "../operation/AddCustomer";
import { db } from "../firebase/Firebase";
import ReceiptIcon from "@material-ui/icons/Receipt";
import "./interest.css";
import EditCustomer from "../operation/EditCustomer";
import DeleteRecord from "../operation/DeleteRecord";
import ViewTransaction from "../operation/ViewTransaction";
import { TablePagination } from "@material-ui/core";

import utility from "../utility";
const Interest = (props) => {
  const [customer, setCustomer] = useState([]);
  const [EditPopup, setEditPopup] = useState(false);
  const [DeletePopup, setDeletePopup] = useState(false);
  const [TransactionPopup, setTransactionPoupup] = useState(false);
  const [firebaseId, setFirebaseId] = useState(null);
  const [record, setRecord] = useState({});
  const [historyData, setHistoryData] = useState([]);
  const { showAlertMessage } = props;
  const [totalInterest, setTotalInterest] = useState(null);
  useEffect(() => {
    db.collection("customer").onSnapshot((snapshot) => {
      setCustomer(
        snapshot.docs.map((rec) => ({
          id: rec.id,
          data: rec.data(),
        }))
      );
    });
  }, []);
  useEffect(() => {
    db.collection("history").onSnapshot((snapshot) => {
      setHistoryData(
        snapshot.docs.map((rec) => ({
          id: rec.id,
          data: rec.data(),
        }))
      );
    });
  }, []);

  const getHistoryDataBasedOnId = (id) => {
    let response = [];
    let amount = 0;
    response = historyData.filter((rec) => rec.id.trim().split("_")[0] == id);
    if (response.length) {
      response.map((rec) => {
        amount = amount + rec.data.amount;
      });
    }
    return amount;
  };
  const getDayDiffWithCurrent = (date) => {
    var date1 = new Date();
    var date2 = date;

    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2;

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.floor(Difference_In_Days);
  };
  const getMonthDiffWithCurrent = (date) => {
    var date1 = new Date();
    var date2 = date;

    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2;

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    var Month = Difference_In_Days / 30.417;
    var exectMonth = Month;

    return exectMonth;
  };
  const getInterest = (amount, rate, date, id) => {
    let transactionHistory = getHistoryDataBasedOnId(id);
    //  console.log(amount +" "+rate+" "+date);
    const month = getMonthDiffWithCurrent(date);
    const interest = (amount * rate * month) / 100;
    const totalMoney = amount + interest - transactionHistory;
    console.table(
      "ActualAmount =" +
        amount +
        " interest = " +
        interest +
        " transaction History = " +
        transactionHistory
    );
    return totalMoney;
  };

  const getOnlyInterest = (amount, rate, date) => {
    //  console.log(amount +" "+rate+" "+date);
    const month = getMonthDiffWithCurrent(date);
    const interest = (amount * rate * month) / 100;

    return interest;
  };
  const getTotalEarnedInterest = () => {
    let sum = 0;

    customer.map((rec) => {
      sum =
        sum + getOnlyInterest(rec.data.amount, rec.data.rate, rec.data.date);
    });
    return sum;
  };
  const getDailyIncome = () => {
    let total_amount = getTotalInvestedMoney();
    let r = 3;
    let t = 1 / 30.44;
    let total_earning_daily = (total_amount * r * t) / 100;
    return total_earning_daily;
  };
  const getMonthlyIncome = () => {
    let total_amount = getTotalInvestedMoney();
    let r = 3;
    let t = 1;
    let total_earning_Monthly = (total_amount * r * t) / 100;
    return total_earning_Monthly;
  };
  const getYearlyIncome = () => {
    let total_amount = getTotalInvestedMoney();
    let r = 3;
    let t = 12;
    let total_earning_yearly = (total_amount * r * t) / 100;
    return total_earning_yearly;
  };
  const getTotalInvestedMoney = () => {
    let sum = 0;

    customer.map((rec) => {
      sum = sum + rec.data.amount;
    });
    return sum;
  };

  const getDynamicId = (ref) => {
    let id_ref = ref.tableData.id;
    let database_id = customer[id_ref].id;
    return database_id;
  };

  /* Table Column */

  const columns = [
    {
      title: "Name",
      field: "name",
    },

    {
      title: "Amount",
      field: "amount",
    },
    {
      title: "Rate",
      field: "rate",
      sorting: false,
    },
    {
      title: "Month",
      field: "date",
      render: (row) => (
        <div>
          {getMonthDiffWithCurrent(row.date) < 1
            ? getDayDiffWithCurrent(row.date) + " days"
            : getMonthDiffWithCurrent(row.date).toFixed(1)}
        </div>
      ),
    },
    {
      title: "PhoneNumber",
      field: "phoneNumber",
      sorting: false,
    },
    {
      title: "Date",
      field: "date",
      sorting: false,

      render: (row) => <div>{utility.getFullDate(row.date)}</div>,
    },

    {
      title: "Total Money",
      sorting: false,
      field: "amount",
      render: (row) => (
        <div className='current_amount'>
          {getInterest(
            row.amount,
            row.rate,
            row.date,
            customer[row.tableData.id].id
          ).toFixed(0)}
        </div>
      ),
    },
    {
      title: "Only Interest ",
      sorting: false,
      field: "amount",
      render: (row) => (
        <div className='current_amount'>
          {getOnlyInterest(row.amount, row.rate, row.date).toFixed(0)}
        </div>
      ),
    },
    {
      title: "Tansaction History ",
      sorting: false,
      field: "amount",
      render: (row) => (
        <div className='current_amount'>
          {getHistoryDataBasedOnId(customer[row.tableData.id].id)}
        </div>
      ),
    },
  ];
  return (
    <div>
      <AddCustomer showAlertMessage={showAlertMessage} />
      {EditPopup ? (
        <EditCustomer
          EditPopup={EditPopup}
          setEditPopup={setEditPopup}
          firebaseId={firebaseId}
          record={record}
          showAlertMessage={showAlertMessage}
        />
      ) : null}
      <DeleteRecord
        DeletePopup={DeletePopup}
        setDeletePopup={setDeletePopup}
        firebaseId={firebaseId}
        showAlertMessage={showAlertMessage}
      />
      <ViewTransaction
        TransactionPopup={TransactionPopup}
        setTransactionPoupup={setTransactionPoupup}
        firebaseId={firebaseId}
        record={record}
      />
      <div className='overallInformati'>
        <div className='totalInvestedMoney'>
          Total Invested Money | {getTotalInvestedMoney().toFixed(0)}
        </div>
        <div className='totalInvestedMoney'>
          Total Earned Money | {getTotalEarnedInterest().toFixed(0)}
        </div>
        <div className='totalInvestedMoney'>
          Total Earned Daily | {getDailyIncome().toFixed(0)}
        </div>
        <div className='totalInvestedMoney'>
          Total Earned Monthly | {getMonthlyIncome().toFixed(0)}
        </div>
        <div className='totalInvestedMoney'>
          Total Earned Yearly | {getYearlyIncome().toFixed(0)}
        </div>
      </div>
      <div className='meterialTable'>
        <MaterialTable
          title={"Interest Table"}
          data={customer.map((rec) => rec.data)}
          columns={columns}
          options={{
            headerStyle: {
              height: "3px",
              background: "#7b766b",
              color: "#fff",
            },
            paging: false,
            pageSizeOptions: [5, 10, 25],
            pageSize: 8,
            pagine: true,
            exportButton: true,
          }}
          actions={[
            {
              icon: ReceiptIcon,
              tooltip: "ViewTransaction",
              onClick: (a, b) => {
                setRecord(b);
                setTransactionPoupup(true);
                let dataRecord = getDynamicId(b);
                setFirebaseId(dataRecord);
              },
            },
            {
              icon: "edit",
              tooltip: "Save User",
              onClick: (a, b) => {
                setRecord(b);
                setEditPopup(true);
                let dataRecord = getDynamicId(b);
                setFirebaseId(dataRecord);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete User",
              onClick: (a, b) => {
                let dataRecord = getDynamicId(b);
                console.log(dataRecord);
                setDeletePopup(true);
                setFirebaseId(dataRecord);
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Interest;
