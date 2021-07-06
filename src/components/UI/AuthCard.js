import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import { useLocation } from "react-router-dom";

import Backdrop from "./Backdrop";

const useStyles = makeStyles((theme) => ({
  authCardContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  authCard: {
    height: "80%",
    maxHeight: "38rem",
    minHeight: "32rem",
    width: "50vw",
    minWidth: "22rem",
    maxWidth: "32rem",
  },
  cardHeader: {
    fontSize: "1.8rem",
    textAlign: "center",
    fontFamily: "Comfortaa, sans-serif",
    fontWeight: "700",
    margin: "1rem 0",
  },
  cardContent: {
    padding: "1rem",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "space-between",
  },
  [theme.breakpoints.down("sm")]: {
    authCard: {
      width: "80vw",
    },
  },
  [theme.breakpoints.down("xs")]: {
    authCardContainer: {
      // height: "100vh",
    },
    authCard: {
      width: "96vw",
      // height: "100vh",
    },
  },
}));
const AuthCard = (props) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Backdrop>
      <div className={classes.authCardContainer}>
        <Card elevation={0} classes={{ root: classes.authCard }}>
          <div className={classes.cardHeader}>
            {location.pathname === "/signup" ? "Sign Up" : "Login"}
          </div>
          <div className={classes.cardContent}>{props.children}</div>
        </Card>
      </div>
    </Backdrop>
  );
};

export default AuthCard;
