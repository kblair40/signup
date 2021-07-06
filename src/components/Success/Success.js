import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { authActions } from "../../store/authSlice";
import { socialMediaLogout } from "../../service/auth";
// SHOULDN'T NEED BELOW IMPORTS FOR LOGGING OUT
// import {
//   googleProvider,
//   githubProvider,
//   twitterProvider,
// } from "../../config/authMethods";

const useStyles = makeStyles((theme) => ({
  successContainer: {
    fontFamily: "Montserrat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& h1": {
      textAlign: "center",
    },
  },
  logoutBtnRoot: {
    fontFamily: "Montserrat",
    color: "white",
    backgroundColor: "#ff4244",
    "&:hover": {
      backgroundColor: "#ff4244",
    },
  },
}));

const Success = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    socialMediaLogout();
    dispatch(authActions.logout());
  };
  return (
    <div className={classes.successContainer}>
      <h1>SUCCESSFULLY LOGGED IN!</h1>
      <Button
        onClick={handleLogout}
        variant="contained"
        classes={{ root: classes.logoutBtnRoot }}
      >
        LOGOUT
      </Button>
    </div>
  );
};

export default Success;
