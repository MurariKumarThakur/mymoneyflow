import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import { db } from "../firebase/Firebase";
const DeleteTransaction = (props) => {
  const {
    openDeleteHistoryConfirmation,
    setDeleteHistoryConfirmation,
    _firebaseId,
  } = props;

  const DeleteTransactionHistory = () => {
    db.collection("history")
      .doc(_firebaseId)
      .delete()
      .then(() => {
        setDeleteHistoryConfirmation(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <Dialog open={openDeleteHistoryConfirmation}>
        <DialogTitle>Confirmation Box</DialogTitle>
        <DialogContent>
          Are you Sure You Want To Delete The Record ?
        </DialogContent>

        <div className='actionButton_addCustomer'>
          <Button
            variant='contained'
            color='primary'
            onClick={DeleteTransactionHistory}
          >
            Yes
          </Button>
          <Button
            variant='contained'
            onClick={() => setDeleteHistoryConfirmation(false)}
          >
            No
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteTransaction;
