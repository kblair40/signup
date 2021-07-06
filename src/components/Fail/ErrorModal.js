import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const useStyles = makeStyles((theme) => ({
  errorDialog: {
    minWidth: "15rem",
  },
  errorDialogTitle: {
    color: "#ff4244",
    fontFamily: "Montserrat",
    fontSize: "1.6rem",
    fontWeight: 500,
  },
  errorTextRoot: {
    fontFamily: "Montserrat",
    color: "#0c0c0d",
  },
  errorDialogBtn: {
    fontFamily: "Montserrat",
    color: "white",
    background: "#ff4244",
    width: "50%",
    "&:hover": {
      background: "#ff4244",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  errorDialogActions: {
    display: "flex",
    justifyContent: "center",
  },
}));

const ErrorModal = () => {
  const classes = useStyles();
  const errorMsg = useSelector((state) => state.auth.errorMessage);
  const dispatch = useDispatch();
  const errorModalShowing = useSelector(
    (state) => state.auth.errorModalShowing
  );

  const handleClose = () => {
    dispatch(authActions.closeErrorModal());
  };

  return (
    <Dialog
      classes={{
        paper: classes.errorDialog,
      }}
      open={errorModalShowing}
    >
      <DialogTitle
        disableTypography={true}
        className={classes.errorDialogTitle}
      >
        Error
      </DialogTitle>
      <DialogContent>
        <DialogContentText classes={{ root: classes.errorTextRoot }}>
          {errorMsg}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.errorDialogActions}>
        <Button
          classes={{ root: classes.errorDialogBtn }}
          onClick={handleClose}
          variant="contained"
          // fullWidth
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
