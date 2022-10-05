import React, { useState } from "react";
import "./editCustomer.css";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import firebase from 'firebase'
import {db}from "../firebase/Firebase"
const EditCustomer = (props) => {
  
  let { EditPopup, setEditPopup, record,firebaseId,showAlertMessage } = props;
  let _record = { ...record };
  const [name, setName] = useState(record.name);
  const [phoneNumber, setPhoneNumber] = useState(record.phoneNumber);
  const [amount, setAmount] = useState(record.amount);
  const [rate, setRate] = useState(record.rate);
  const [date, setDate] = useState(record.date);
  const [dateType, setDateType] = useState("string");

  const getFormatedDate = (date) => {
    let _date = new Date(date);
    let _fullYear = _date.getFullYear();
    let _month = String(_date.getMonth() + 1).padStart(2, "0");
    let _day = String(_date.getDate()).padStart(2, "0");
    let _formatedDate = _day + "-" + _month + "-" + _fullYear;

    return _formatedDate;
  };
  const resetToInitialState=()=>{
    setName(record.name);
    setPhoneNumber(record.phoneNumber);
    setAmount(record.amount);
    setRate(record.rate)
    setDate(record.date)
  }
  const clearInputBox = () => {
    setName("");
    setPhoneNumber("");
    setAmount("");
    setRate("");
    setDate("");
  };
  const updateCustomer = (firebaseId) => {

    db.collection("customer")
      .doc(firebaseId)
      .set({
        name: name,
        phoneNumber: phoneNumber,
        amount: amount,
        rate: rate,
        date: new Date(date).getTime(),

        serverTime: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        showAlertMessage("success", "Record Updated");
        setEditPopup(false) 
        clearInputBox()
      })
      .catch((err) => {
        showAlertMessage("error", err.message); 
      });
  };
  return (
    <div className='AddCustomer_popup'>
      <Dialog open={EditPopup}>
        <DialogTitle>Update Customer</DialogTitle>
        <DialogContent>
          <div className='add_contact_form'>
            <div className='name'>
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autocomplete='off'
                type='text'
              />
            </div>
            <div className='phone_number'>
              <label>PhoneNumber</label>
              <input
                value={phoneNumber}
                type='text'
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className='amount'>
              <label>Amount</label>
              <input
                value={amount}
                type='number'
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className='amount'>
              <label>Rate</label>
              <input
                value={rate}
                type='number'
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
            <div className='date'>
              <label>Date</label>
              <input
                value={getFormatedDate(date)}
                type={dateType}
                onChange={(e) => setDate(e.target.value)}
                onMouseLeave={() => setDateType("string")}
                onMouseOver={() => setDateType("date")}
                // onMouseOut={()=>setDateType("string")}
              />
            </div>
          </div>
        </DialogContent>

        <div className='actionButton_addCustomer'>
          <Button variant='contained' color='primary' onClick={()=>updateCustomer(firebaseId)}>
            Save
          </Button>
          <Button variant='contained' onClick={resetToInitialState}>Reset</Button>
          <Button variant='contained' onClick={() => setEditPopup(false)}>
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default EditCustomer;
