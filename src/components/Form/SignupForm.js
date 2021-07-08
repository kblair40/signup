import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AuthCard from "../UI/AuthCard";
import FormPopper from "./FormPopper";
import SocialLinks from "./SocialLinks";
import { authActions } from "../../store/authSlice";
import UsernameRulesCollapse from "./Rules/UsernameRulesCollapse";
import EmailRulesCollapse from "./Rules/EmailRulesCollapse";
import PasswordRulesCollapse from "./Rules/PasswordRulesCollapse";
import ConfirmPasswordRulesCollapse from "./Rules/ConfirmPasswordRulesCollapse";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: "30rem",
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
    margin: "1rem 0",
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
    background: "rgba(29,109,134,.9)",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 600,
    "&:hover": {
      background: "rgb(29,109,134)",
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
  [theme.breakpoints.down("sm")]: {
    formRow: {
      margin: ".4rem 0",
      width: "90%",
      "& p": {
        position: "static",
      },
    },
    form: {
      position: "relative",
      top: "1rem",
    },
    switchMode: {
      position: "relative",
      top: "1rem",
    },
  },
  [theme.breakpoints.down("xs")]: {
    formRow: {
      margin: ".75rem 0",
      width: "90%",
    },
    switchMode: {
      position: "relative",
      top: "2rem",
    },
    form: {
      position: "relative",
      top: "2rem",
    },
  },
}));

const SignupForm = ({ handleFormSubmit }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [targetName, setTargetName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasBeenTouched, setHasBeenTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

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
  const passwordHasDigit = useSelector((state) => state.auth.passwordHasDigit);
  const confirmPasswordInput = useSelector(
    (state) => state.auth.confirmPasswordInput
  );
  const passwordsMatch = useSelector((state) => state.auth.passwordsMatch);

  const handleKeyPress = (event) => {
    setAnchorEl(event.currentTarget);
    setTargetName(event.target.name);
    setOpen(true);
  };

  const handleInputblur = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(false);
    dispatch(authActions.closeAccordions());
  };

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setHasBeenTouched((state) => ({ ...state, username: true }));
    dispatch(authActions.handleUsernameChange({ username: username }));
    dispatch(authActions.openUsernameAccordion());
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setHasBeenTouched((state) => ({ ...state, email: true }));

    dispatch(authActions.handleEmailChange({ email: email }));
    dispatch(authActions.openEmailAccordion());
  };

  const handlePasswordChange = (e) => {
    console.log("password input changed");
    setHasBeenTouched((state) => ({ ...state, password: true }));
    const password = e.target.value;
    console.log(password, confirmPasswordInput);

    dispatch(authActions.handlePasswordChange({ password: password }));
    dispatch(authActions.openPasswordAccordion());
    dispatch(
      authActions.comparePasswords({
        pwd1: password,
        pwd2: confirmPasswordInput,
      })
    );
  };

  const handleConfirmPasswordChange = (e) => {
    setHasBeenTouched((state) => ({ ...state, confirmPassword: true }));
    dispatch(
      authActions.handleConfirmPasswordChange({
        confirmPassword: e.target.value,
      })
    );
    dispatch(authActions.openConfirmPasswordAccordion());
  };

  const handleClickShowPassword = () => {
    setShowPassword((state) => !state);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((state) => !state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorMsg = "";
    if (usernameInput.trim() === "" || usernameHasInvalidLength) {
      errorMsg =
        "Please enter a username between 7 and 15 characters in length, consisting only of letters and numbers";
    } else if (usernameHasInvalidChars) {
      errorMsg = "Username can only contain letters and numbers";
    } else if (emailInput.trim() === "") {
      errorMsg = "Please enter an email address";
    } else if (!emailHasError) {
      errorMsg = "That is not a valid email address";
    } else if (passwordInput.trim() === "" || passwordHasInvalidLength) {
      errorMsg =
        "Please enter a password between 8 and 16 characters in length, consisting only of letters and numbers";
    } else if (passwordHasInvalidChars) {
      errorMsg =
        "Your password contains invalid characters.  Valid characters include letters, numbers and the following symbols: ?!@#$%^&*-_";
    } else if (!passwordsMatch) {
      errorMsg = "Passwords do not match";
    }

    handleFormSubmit(emailInput, passwordInput, "signup", errorMsg);
  };

  return (
    <AuthCard>
      <Hidden mdDown>
        <FormPopper open={open} anchorEl={anchorEl} targetName={targetName} />
      </Hidden>
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formRow}>
            <InputLabel
              className={
                !hasBeenTouched.username || usernameInput === ""
                  ? classes.labelNotTouched
                  : !usernameHasInvalidLength && !usernameHasInvalidChars
                  ? classes.labelValid
                  : classes.labelError
              }
            >
              Username
            </InputLabel>
            <Input
              onChange={handleUsernameChange}
              name="username"
              classes={{
                root:
                  !hasBeenTouched.username || usernameInput === ""
                    ? classes.inputNotTouched
                    : !usernameHasInvalidLength && !usernameHasInvalidChars
                    ? classes.inputValid
                    : classes.inputError,
              }}
              type="text"
              inputProps={{
                onKeyPress: handleKeyPress,
                onBlur: handleInputblur,
                autoComplete: "off",
              }}
              value={usernameInput}
            />
            <Hidden lgUp>
              <UsernameRulesCollapse />
            </Hidden>
          </div>
          <div className={classes.formRow}>
            <InputLabel
              className={
                !hasBeenTouched.email || emailInput === ""
                  ? classes.labelNotTouched
                  : emailHasError
                  ? classes.labelValid
                  : classes.labelError
              }
            >
              Email Address
            </InputLabel>
            <Input
              onChange={handleEmailChange}
              name="email"
              classes={{
                root:
                  !hasBeenTouched.email || emailInput === ""
                    ? classes.inputNotTouched
                    : emailHasError
                    ? classes.inputValid
                    : classes.inputError,
              }}
              type="text"
              inputProps={{
                onKeyPress: handleKeyPress,
                onBlur: handleInputblur,
                autoComplete: "off",
              }}
              value={emailInput}
            />
            <Hidden lgUp>
              <EmailRulesCollapse />
            </Hidden>
          </div>
          <div className={classes.formRow}>
            <InputLabel
              className={
                !hasBeenTouched.password || passwordInput === ""
                  ? classes.labelNotTouched
                  : !passwordHasInvalidLength && !passwordHasInvalidChars
                  ? classes.labelValid
                  : classes.labelError
              }
            >
              Password
            </InputLabel>
            <Input
              name="password"
              onChange={handlePasswordChange}
              onKeyDown={handlePasswordChange}
              classes={{
                root:
                  !hasBeenTouched.password || passwordInput === ""
                    ? classes.inputNotTouched
                    : !passwordHasInvalidLength &&
                      !passwordHasInvalidChars &&
                      passwordHasDigit
                    ? classes.inputValid
                    : classes.inputError,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              type={showPassword ? "text" : "password"}
              inputProps={{
                onKeyDown: handleKeyPress,
                onBlur: handleInputblur,
              }}
              value={passwordInput}
            />
            <Hidden lgUp>
              <PasswordRulesCollapse />
            </Hidden>
          </div>
          <div className={classes.formRow}>
            <InputLabel
              className={
                !hasBeenTouched.confirmPassword || confirmPasswordInput === ""
                  ? classes.labelNotTouched
                  : passwordsMatch
                  ? classes.labelValid
                  : classes.labelError
              }
            >
              Confirm Password
            </InputLabel>
            <Input
              name="confirmPassword"
              onChange={handleConfirmPasswordChange}
              classes={{
                root:
                  !hasBeenTouched.confirmPassword || confirmPasswordInput === ""
                    ? classes.inputNotTouched
                    : passwordsMatch
                    ? classes.inputValid
                    : classes.inputError,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              type={showConfirmPassword ? "text" : "password"}
              inputProps={{
                onKeyUp: handleKeyPress,
                onBlur: handleInputblur,
              }}
              value={confirmPasswordInput}
            />
            <Hidden lgUp>
              <ConfirmPasswordRulesCollapse />
            </Hidden>
          </div>

          <div className={classes.formRow}>
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
        <div className={`${classes.formRow} ${classes.switchMode}`}>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </AuthCard>
  );
};

export default SignupForm;
