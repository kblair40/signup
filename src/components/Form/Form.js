import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

import AuthCard from "../UI/AuthCard";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formRow: {
    width: "100%",
    margin: ".8rem 0",
  },

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.down("xs")]: {},
}));
const Form = () => {
  const classes = useStyles();

  return (
    <AuthCard>
      <div className={classes.formContainer}>
        <div className={classes.formRow}>
          <TextField
            id="standard-basic"
            label="Username"
            fullWidth
            className={classes.formContained} // delete this
          />
        </div>
        <div className={classes.formRow}>
          <TextField
            id="standard-basic"
            label="Email Address"
            fullWidth
            className={classes.formContained} // delete this
          />
        </div>
        <div className={classes.formRow}>
          <TextField
            id="standard-basic"
            label="Password"
            fullWidth
            className={classes.formContained} // delete this
          />
        </div>
        <div className={classes.formRow}>
          <TextField
            id="standard-basic"
            label="Confirm Password"
            fullWidth
            className={classes.formContained} // delete this
          />
        </div>
      </div>
    </AuthCard>
  );
};

export default Form;
