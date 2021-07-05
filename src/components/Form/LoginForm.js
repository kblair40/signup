import React, { useState, useRef } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import AuthCard from "../UI/AuthCard";
import FormPopper from "./FormPopper";
import SocialLinks from "./SocialLinks";
import { authActions } from "../../store/authSlice";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& label": {
      fontFamily: "Montserrat, sans-serif",
    },
    "& input": {
      fontFamily: "Montserrat, sans-serif",
      color: "#0c0c0d",
    },
  },
  formRow: {
    margin: ".75rem 0",
    width: "70%",
    fontFamily: "Montserrat, sans-serif",
    "& p": {
      textAlign: "center",
    },
    "& a": {
      textDecoration: "none",
      color: "#0c0c0d",
      fontWeight: 600,
      "&:visited": {
        color: "#0c0c0d",
      },
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  submitBtnRoot: {
    background: "#ff4244",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 600,
    "&:hover": {
      background: "#ff4244",
    },
  },
  labelNotTouched: {
    color: "rgba(0,0,0,0.8)",
  },
  labelValid: {
    color: "#5dca36",
  },
  labelError: {
    color: "#ff4244",
  },
  inputNotTouched: {
    width: "100%",
    "&:before": {
      borderColor: "#0c0c0d",
    },
    "&:after": {
      borderColor: "#0c0c0d",
    },
  },
  inputValid: {
    width: "100%",
    "&:before": {
      borderColor: "#5dca36",
    },
    "&:after": {
      borderColor: "#5dca36",
    },
  },
  inputError: {
    width: "100%",
    "&:before": {
      borderColor: "#ff4244",
    },
    "&:after": {
      borderColor: "#ff4244",
    },
  },
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.down("xs")]: {},
}));

const LoginForm = ({ handleFormSubmit }) => {
  const classes = useStyles();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = (e) => {
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    console.log("email:", emailInput);
    console.log("password:", passwordInput);
    e.preventDefault();
    // handleFormSubmit();
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <AuthCard>
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formRow}>
            <InputLabel>Email Address</InputLabel>
            <Input
              name="email"
              type="text"
              inputProps={{
                ref: emailInputRef,
              }}
            />
          </div>
          <div className={classes.formRow}>
            <InputLabel>Password</InputLabel>
            <Input
              name="password"
              type="text"
              inputProps={{
                ref: passwordInputRef,
              }}
            />
          </div>

          <div className={`${classes.formRow} ${classes.submitBtn}`}>
            <Button
              classes={{ root: classes.submitBtnRoot }}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disableFocusRipple
            >
              Create Account
            </Button>
          </div>
        </form>
        <SocialLinks />
        <div className={classes.formRow}>
          <p>
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </div>
    </AuthCard>
  );
};

export default LoginForm;
