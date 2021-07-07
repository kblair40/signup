import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { authActions } from "../../store/authSlice";
import { socialMediaLogout } from "../../service/auth";
import Backdrop from "../UI/Backdrop";
import LogoutButton from "./LogoutButton";

const useStyles = makeStyles((theme) => ({
  successContainer: (styles) => ({
    height: "100vh",
    fontFamily: styles.font,
    color: styles.colors.black,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& h1": {
      marginTop: 0,
      textAlign: "center",
    },
    "& h3": {
      marginTop: 0,
      textAlign: "center",
    },
  }),
  successCard: {
    padding: "1rem",
    height: "80%",
    maxHeight: "40rem",
    minHeight: "35rem",
    width: "55%",
    minWidth: "22rem",
    maxWidth: "40rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  [theme.breakpoints.down("sm")]: {
    successCard: {
      width: "80vw",
    },
  },
  [theme.breakpoints.down("xs")]: {
    successCard: {
      width: "90vw",
      height: "90%",
    },
  },
}));

const Success = () => {
  const colors = useSelector((state) => state.provider.colors);
  const font = useSelector((state) => state.provider.font);
  const provider = useSelector((state) => state.provider.authProvider);
  const classes = useStyles({ colors, font });

  const dispatch = useDispatch();
  const history = useHistory();
  console.log("COLORS:", colors, "\ntype:", typeof colors);

  const handleLogout = () => {
    socialMediaLogout();
    dispatch(authActions.logout());
    history.replace("/login");
  };
  return (
    <Backdrop color={colors.main}>
      <div className={classes.successContainer}>
        <Card elevation={0} classes={{ root: classes.successCard }}>
          <h1>SUCCESSFULLY LOGGED IN!</h1>
          <LogoutButton handleLogout={handleLogout} colors={colors} />
        </Card>
      </div>
    </Backdrop>
  );
};

export default Success;
