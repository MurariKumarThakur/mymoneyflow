import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import moment from "moment";
import "./viewTransaction.css";
import CloseIcon from "@material-ui/icons/Close";
import AddTransaction from "./AddTransaction";
import { db } from "../firebase/Firebase";
import AlertMessage from "../alert/AlertMessage";
import utility from "../utility";
import { getQueriesForElement } from "@testing-library/react";
import DeleteTransaction from "./DeleteTransaction";
import EditHistory from "./EditHistory";

const ViewTransaction = (props) => {
  const { TransactionPopup, setTransactionPoupup, firebaseId, record } = props;
  const [openAddTransaction, setOpenAddTransaction] = useState(false);
  const [history, setHistory] = useState([]);
  const [openTransactionPopup, setTransactionHistoryPopup] = useState(false);
  const [openDeleteHistoryConfirmation, setDeleteHistoryConfirmation] =
    useState(false);
  const [history_rec, setHistory_rec] = useState({});
  const [_firebaseId, _setFirebaseId] = useState(null);
  const [buttonText, setButtonText] = useState("");
  const loadData = () => {
    let response = [];
    response = history.filter(
      (rec) => rec.id.trim().split("_")[0] == firebaseId
    );

    return response;
  };

  const getAmountData = () => {
    let amount = 0;
    loadData().map((rec) => {
      amount = amount + rec.data.amount;
    });

    return amount;
  };
  const youGave = (e) => {
    setOpenAddTransaction(true);
    setButtonText(e.target.innerText);
  };
  const youGot = (e) => {
    setOpenAddTransaction(true);
    setButtonText(e.target.innerText);
  };

  useEffect(() => {
    db.collection("history").onSnapshot((snapshot) => {
      setHistory(
        snapshot.docs.map((rec) => ({
          id: rec.id,
          data: rec.data(),
        }))
      );
    });
  }, []);

  const columns = [
    {
      title: "Amount",
      field: "amount",
    },
    {
      title: "Date",
      field: "date",
      render: (row) => <div>{utility.getFormatedDate(row.date)}</div>,
    },
    {
      title: "Comment",
      field: "comment",
    },
  ];

  return (
    <div>
      {openTransactionPopup ? (
        <EditHistory
          openTransactionPopup={openTransactionPopup}
          setTransactionHistoryPopup={setTransactionHistoryPopup}
          history_rec={history_rec}
          _firebaseId={_firebaseId}
          buttonText={buttonText}
        />
      ) : null}
      {openDeleteHistoryConfirmation ? (
        <DeleteTransaction
          openDeleteHistoryConfirmation={openDeleteHistoryConfirmation}
          setDeleteHistoryConfirmation={setDeleteHistoryConfirmation}
          _firebaseId={_firebaseId}
        />
      ) : null}
      {openAddTransaction ? (
        <AddTransaction
          openAddTransaction={openAddTransaction}
          setOpenAddTransaction={setOpenAddTransaction}
          firebaseId={firebaseId}
          buttonText={buttonText}
        />
      ) : null}
      <Dialog fullScreen open={TransactionPopup}>
        <div className='transactionHistory'>
          <span> TransactionHistory </span>
          <span onClick={() => setTransactionPoupup(false)}>
            <CloseIcon />
          </span>
        </div>
        <div className='createTransaction'>
          <button
            style={{ background: "red", color: "white" }}
            onClick={(e) => youGave(e)}
          >
            {" "}
            + You Gave
          </button>
          <button
            style={{ background: "green", color: "white" }}
            onClick={(e) => youGot(e)}
          >
            {" "}
            - You Got
          </button>
        </div>

        <DialogContent>
          <MaterialTable
            title={
              record.name + "[ Total Transaction = " + getAmountData() + "]"
            }
            data={loadData().map((rec) => rec.data)}
            columns={columns}
            options={{
              headerStyle: {
                backgroundColor: "#e0bfbf",
              },

              paging: true,
              exportButton: true,
              search: false,
            }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit transaction record",
                onClick: (a, b) => {
                  setHistory_rec(b);
                  _setFirebaseId(history[b.tableData.id].id);
                  setTransactionHistoryPopup(true);
                },
              },
              {
                icon: "delete",
                tooltip: "Delete User",
                onClick: (a, b) => {
                  _setFirebaseId(history[b.tableData.id].id);
                  setDeleteHistoryConfirmation(true);
                },
              },
            ]}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewTransaction;
