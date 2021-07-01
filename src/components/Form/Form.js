import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";

import AuthCard from "../UI/AuthCard";
import FormPopper from "./FormPopper";
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
  },
  formRow: {
    // width: "100%",
    margin: ".8rem 0",
  },
  usernameInputRoot: {
    width: "100%",
  },

  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.down("xs")]: {},
}));
// usernameInput: "",
//   usernameHasInvalidLength: false,
//   usernameHasInvalidChars: false,
//   emailInput: "",
//   emailHasError: false,
//   passwordInput: "",
//   passwordHasInvalidLength: false,
//   passwordHasInvalidChars: false,
//   confirmPasswordInput: "",
//   confirmPasswordHasInvalidLength: false,
//   confirmPasswordHasInvalidChars: false,
const Form = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const usernameInput = useSelector((state) => state.auth.usernameInput);
  const usernameHasInvalidLength = useSelector(
    (state) => state.auth.usernameHasInvalidLength
  );
  const usernameHasInvalidChars = useSelector(
    (state) => state.auth.usernameHasInvalidChars
  );
  const emailInput = useSelector((state) => state.auth.emailInput);
  const emailHasError = useSelector((state) => state.auth.emailHasError);

  const handleKeyPress = (event) => {
    console.log("TARGET:", event.currentTarget);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleInputblur = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(false);
  };

  const handleUsernameChange = (e) => {
    dispatch(authActions.handleUsernameChange({ username: e.target.value }));
  };

  const handleEmailChange = (e) => {
    dispatch(authActions.handleEmailChange({ email: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.clearForm());
  };

  return (
    <AuthCard>
      <FormPopper open={open} anchorEl={anchorEl} />
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formRow}>
            <InputLabel>Username</InputLabel>
            <Input
              onChange={handleUsernameChange}
              classes={{ root: classes.usernameInputRoot }}
              type="text"
              inputProps={{
                onKeyPress: handleKeyPress,
                onBlur: handleInputblur,
              }}
              value={usernameInput}
              fullWidth
            />
          </div>
          <div className={classes.formRow}>
            <InputLabel>Email Address</InputLabel>
            <Input
              onChange={handleEmailChange}
              classes={{ root: classes.emailInputRoot }}
              type="text"
              inputProps={{
                onKeyPress: handleKeyPress,
                onBlur: handleInputblur,
              }}
              value={emailInput}
              fullWidth
            />
          </div>

          <div className={classes.formRow}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </AuthCard>
  );
};

export default Form;
