import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import { db } from "../firebase/Firebase";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const AddTransaction = (props) => {
  const { openAddTransaction, setOpenAddTransaction, firebaseId, buttonText } = props;
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");

  const addTransaction = (id) => {
    db.collection("history")
      .doc(id + "_" + new Date().getTime())
      .set({
        amount:Number(amount),
        date: new Date(date).getTime(),
        comment: comment,
      })
      .then(() => {
        setOpenAddTransaction(false);

        // setInputChange("")
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className='AddCustomer_popup'>
    
      <Dialog open={openAddTransaction}>

        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <form className='add_contact_form'>
         
         
      
            <div className='amount'>
              <label>Amount</label>
              <input
                value={amount}
                type='number'
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className='date'>
              <label>Date</label>
              <input
                value={date}
                type='date'
                onChange={(e) => setDate(e.target.value)}
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
            onClick={() => addTransaction(firebaseId)}
          >
            Save
          </Button>
          <Button variant='contained'>Reset</Button>
          <Button
            variant='contained'
            onClick={() => setOpenAddTransaction(false)}
          >
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AddTransaction;
