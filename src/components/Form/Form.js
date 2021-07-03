import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";

import AuthCard from "../UI/AuthCard";
import FormPopper from "./FormPopper";
import { authActions } from "../../store/authSlice";
import { setClasses } from "../../helpers";

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
    justifyContent: "space-between",
  },
  formRow: {
    margin: ".75rem 0",
  },
  submitBtnRoot: {
    background: "#ff4244",
    fontFamily: "Montserrat",
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

const Form = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [targetName, setTargetName] = useState("");

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

  const passwordInput = useSelector((state) => state.auth.passwordInput);
  const passwordHasInvalidChars = useSelector(
    (state) => state.auth.passwordHasInvalidChars
  );
  const passwordHasInvalidLength = useSelector(
    (state) => state.auth.passwordHasInvalidLength
  );
  const confirmPasswordInput = useSelector(
    (state) => state.auth.confirmPasswordInput
  );
  const passwordsMatch = useSelector((state) => state.auth.passwordsMatch);

  const handleKeyPress = (event) => {
    // console.log("TARGET:", event.currentTarget);
    setAnchorEl(event.currentTarget);
    setTargetName(event.target.name);
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

  const handlePasswordChange = (e) => {
    dispatch(authActions.handlePasswordChange({ password: e.target.value }));
  };

  const handleConfirmPasswordChange = (e) => {
    dispatch(
      authActions.handleConfirmPasswordChange({
        confirmPassword: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.clearForm());
  };

  const setClasses = (target) => {
    if (target === "username") {
      console.log("username");
      console.log(
        !usernameHasInvalidLength && !usernameHasInvalidChars
          ? "Error"
          : "Valid"
      );
      return !usernameHasInvalidLength && !usernameHasInvalidChars
        ? "Error"
        : "Valid";
    }
  };

  return (
    <AuthCard>
      <FormPopper open={open} anchorEl={anchorEl} targetName={targetName} />
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formRow}>
            <InputLabel>Username</InputLabel>
            <Input
              onChange={handleUsernameChange}
              name="username"
              classes={{
                root:
                  !usernameHasInvalidLength && !usernameHasInvalidChars
                    ? classes.inputValid
                    : classes.inputError,
              }}
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
              name="email"
              classes={{
                root: emailHasError ? classes.inputValid : classes.inputError,
              }}
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
            <InputLabel>Password</InputLabel>
            <Input
              name="password"
              onChange={handlePasswordChange}
              classes={{ root: classes.inputValid }}
              type="text"
              inputProps={{
                onKeyPress: handleKeyPress,
                onBlur: handleInputblur,
              }}
              value={passwordInput}
              fullWidth
            />
          </div>
          <div className={classes.formRow}>
            <InputLabel>Confirm Password</InputLabel>
            <Input
              name="confirmPassword"
              onChange={handleConfirmPasswordChange}
              classes={{ root: classes.inputValid }}
              type="text"
              inputProps={{
                onKeyPress: handleKeyPress,
                onBlur: handleInputblur,
              }}
              value={confirmPasswordInput}
              fullWidth
            />
          </div>

          <div className={`${classes.formRow} ${classes.submitBtn}`}>
            <Button
              classes={{ root: classes.submitBtnRoot }}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </AuthCard>
  );
};

export default Form;
