import React, { useRef } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthCard from "../UI/AuthCard";
import SocialLinks from "./SocialLinks";
import { authActions } from "../../store/authSlice";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: "30rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem 0 1.5rem 0",
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
    width: "80%",
    fontFamily: "Montserrat, sans-serif",
    "& p": {
      textAlign: "center",
      position: "relative",
      top: "1rem",
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
    color: "white",
    background: "rgba(29,109,134,.9)",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 600,
    "&:hover": {
      background: "rgb(29,109,134)",
    },
  },
  label: {
    color: "rgba(0,0,0,0.8)",
  },
  inputRoot: {
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
  [theme.breakpoints.down("xs")]: {
    formRow: {
      margin: ".75rem 0",
      width: "90%",
      "& p": {
        position: "static",
      },
    },
  },
}));

const LoginForm = ({ handleFormSubmit }) => {
  const classes = useStyles();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    if (emailInput.trim() === "") {
      dispatch(
        authActions.setError({
          msg: "At least make an attempt at providing your email",
        })
      );
      return;
    }

    handleFormSubmit(emailInput, passwordInput, "login");
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <div className={classes.loginFormContainer}>
      <AuthCard>
        <div className={classes.formContainer}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.formRow}>
              <InputLabel className={classes.label}>Email Address</InputLabel>
              <Input
                name="email"
                type="text"
                classes={{ root: classes.inputRoot }}
                inputProps={{
                  ref: emailInputRef,
                  autocomplete: "off",
                }}
              />
            </div>
            <div className={classes.formRow}>
              <InputLabel className={classes.label}>Password</InputLabel>
              <Input
                name="password"
                type="text"
                classes={{ root: classes.inputRoot }}
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
                fullWidth
                disableFocusRipple
              >
                Sign In
              </Button>
            </div>
          </form>
          <SocialLinks />
          <div className={classes.formRow}>
            <p className={classes.linkToAccount}>
              Don't have an account?{" "}
              <Link style={{ whiteSpace: "nowrap" }} to="/signup">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </AuthCard>
    </div>
  );
};

export default LoginForm;
