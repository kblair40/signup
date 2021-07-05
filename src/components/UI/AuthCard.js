import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";

import Backdrop from "./Backdrop";

const useStyles = makeStyles((theme) => ({
  authCardContainer: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  authCard: {
    height: "100%",
    maxHeight: "35rem",
    minHeight: "28rem",
    width: "45vw",
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
  },
  [theme.breakpoints.down("sm")]: {
    authCard: {
      width: "75vw",
    },
  },
  [theme.breakpoints.down("xs")]: {
    authCard: {
      width: "90vw",
    },
  },
}));
const AuthCard = (props) => {
  const classes = useStyles();

  const handleFormSubmit = (url) => {
    const apiKey = "AIzaSyDzq0qel4UDBQYRFEFDJPLLS";
  };

  return (
    <Backdrop>
      <div className={classes.authCardContainer}>
        <Card elevation={24} classes={{ root: classes.authCard }}>
          <div className={classes.cardHeader}>Sign Up</div>
          <div className={classes.cardContent}>{props.children}</div>
        </Card>
      </div>
    </Backdrop>
  );
};

export default AuthCard;
