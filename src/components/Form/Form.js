import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { useSelector } from "react-redux";

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
    width: "90%",
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
        <form className={classes.form}>
          <div className={classes.formRow}>
            <InputLabel>Username</InputLabel>
            <Input />
          </div>
          <div className={classes.formRow}>
            <InputLabel>Email Address</InputLabel>
            <Input />
          </div>
          <div className={classes.formRow}>
            <InputLabel>Password</InputLabel>
            <Input />
          </div>
          <div className={classes.formRow}>
            <InputLabel>Confirm Password</InputLabel>
            <Input />
          </div>
          <div className={classes.formRow}>
            <Button type="submit" variant="contained" color="primary">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </AuthCard>
  );
};

export default Form;
