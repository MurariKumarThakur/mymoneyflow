import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import firebase from "firebase";
import { db } from "../firebase/Firebase";
import utility from "../utility";
const EditHistory = (props) => {
  const {
    openTransactionPopup,
    setTransactionHistoryPopup,
    _firebaseId,
    history_rec,
    buttonText
  } = props;

  const [amount, setAmount] = useState(history_rec.amount);
  const [comment, setComment] = useState(history_rec.comment);
  const [date, setDate] = useState(utility.getFullDate(history_rec.date));
  const [datatype, setDataType] = useState("string");

  const updateTransaction = () => {
    db.collection("history")
      .doc(_firebaseId)
      .set({
        amount: amount,
        date: new Date(date).getTime(),
        comment: comment,
      })
      .then(() => {
        setTransactionHistoryPopup(false);

        // setInputChange("")
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const resetHistory = () => {
    setAmount(history_rec.amount);
    setComment(history_rec.comment);
    setDate(utility.getFullDate(history_rec.date));
  };
  return (
    <>
      <Dialog open={openTransactionPopup}>
        <DialogTitle>Update Transaction History</DialogTitle>
        <DialogContent>
          <form className='add_contact_form'>
            <div className='amount'>
              <label>Amount</label>

              {buttonText=="+ You Gave"? <input
                value={amount}
                type='number'
                onChange={(e) => setAmount((Number(e.target.value)))}
              />: <input
              value={amount}
              type='number'
              onChange={(e) => setAmount(-(Number(e.target.value)))}
            />}
             
            </div>

            <div className='date'>
              <label>Date</label>
              <input
                value={date}
                type={datatype}
                onChange={(e) => setDate(e.target.value)}
                onMouseOut={() => setDataType("string")}
                onMouseOver={() => setDataType("date")}
              />
            </div>
            <div className='amount'>
              <label>Comment</label>
              <input
                value={comment}
                type='text'
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </form>
        </DialogContent>

        <div className='actionButton_addCustomer'>
          <Button
            variant='contained'
            color='primary'
            onClick={updateTransaction}
          >
            Save
          </Button>
          <Button variant='contained' onClick={resetHistory}>
            Reset
          </Button>
          <Button
            onClick={() => setTransactionHistoryPopup(false)}
            variant='contained'
            // onClick={() => setOpenAddTransaction(false)}
          >
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default EditHistory;
