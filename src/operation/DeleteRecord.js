import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import { db } from "../firebase/Firebase";
const DeleteRecord = (props) => {
  const { DeletePopup, setDeletePopup, firebaseId, showAlertMessage } = props;
  const deleteCustomer = (firebaseId) => {
    db.collection("customer")
      .doc(firebaseId)
      .delete()
      .then(() => {
        showAlertMessage("success", "Record Deleted Successfully!");
        setDeletePopup(false)
      })
      .catch((err) => {
        showAlertMessage("error", err.message);
        setDeletePopup(false)
      });
  };
  return (
    <div>
      <Dialog open={DeletePopup}>
        <DialogTitle>Confirmation Box</DialogTitle>
        <DialogContent>
          Are you Sure You Want To Delete The Record ?
        </DialogContent>

        <div className='actionButton_addCustomer'>
          <Button
            variant='contained'
            color='primary'
            onClick={() => deleteCustomer(firebaseId)}
          >
            Yes
          </Button>
          <Button onClick={() => setDeletePopup(false)} variant='contained'>
            No
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteRecord;
