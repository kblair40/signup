import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";

import Backdrop from "./Backdrop";

const useStyles = makeStyles((theme) => ({
  authCardContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  authCard: {
    height: "50vh",
    width: "40vw",
    minWidth: "20rem",
    maxWidth: "30rem",
  },
  cardHeader: {
    fontSize: "1.8rem",
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "700",
    margin: "1rem 0",
  },
  cardContent: {
    padding: "1rem 3rem",
  },
  [theme.breakpoints.down("sm")]: {
    authCard: {
      width: "65vw",
      padding: ".5rem",
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

  return (
    <Backdrop>
      <div className={classes.authCardContainer}>
        <Card className={classes.authCard}>
          <div className={classes.cardHeader}>Sign Up</div>
          <div className={classes.cardContent}>{props.children}</div>
        </Card>
      </div>
    </Backdrop>
  );
};

export default AuthCard;
