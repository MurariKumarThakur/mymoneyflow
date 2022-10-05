import React, { useState } from "react";
import "./addCustomer.css";
import { db } from "../firebase/Firebase";
import triggerAlert from "../router/RouterManager";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RouterManager from "../router/RouterManager";
import firebase from "firebase";
const AddCustomer = (props) => {
  const [openAddNavigataion, setOpenAddNavigation] = useState(
    props.ispopupOpen
  );
  const { showAlertMessage } = props;

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState("");

  const closeAddCustomerPopup = () => {
    setOpenAddNavigation(false);
    clearInputBox();
  };
  const AddCustomer = (event) => {
    event.preventDefault();
    db.collection("customer")
      .doc()
      .set({
        name: name,
        phoneNumber: phoneNumber,
        amount: amount,
        rate: rate,
        date: new Date(date).getTime(),
        serverTime: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        closeAddCustomerPopup();
        console.log("successfully added");

        showAlertMessage("success", "Record Created");

        // setInputChange("")
      })
      .catch((err) => {
        showAlertMessage("error", err.message);
      });
  };

  const clearInputBox = () => {
    setName("");
    setPhoneNumber("");
    setAmount("");
    setRate("");
    setDate("");
  };
  console.log(props);
  return (
    <>
      <div className='addcustomer'>
        <button class='icon' onClick={() => setOpenAddNavigation(true)}>
          <AddIcon />
          Add Customer
        </button>
      </div>

      <div className='AddCustomer_popup'>
        <Dialog open={openAddNavigataion}>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogContent>
            <form className='add_contact_form'>
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
                  value={date}
                  type='date'
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </form>
          </DialogContent>

          <div className='actionButton_addCustomer'>
            <Button
              variant='contained'
              color='primary'
              onClick={(event) => AddCustomer(event)}
            >
              Save
            </Button>
            <Button variant='contained' onClick={clearInputBox}>
              Reset
            </Button>
            <Button onClick={closeAddCustomerPopup} variant='contained'>
              Close
            </Button>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default AddCustomer;
