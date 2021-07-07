import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";

import ValidIcon from "./ValidIcon";
import ErrorIcon from "./ErrorIcon";
import RulesContainer from "./RulesContainer";
import { authActions } from "../../../store/authSlice";

const useStyles = makeStyles({
  passwordRule: {
    display: "flex",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  rule: {
    fontSize: ".7rem",
    margin: 0,
    marginLeft: ".5rem",
  },
});

const PasswordRule = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const passwordHasInvalidChars = useSelector(
    (state) => state.auth.passwordHasInvalidChars
  );
  const passwordHasInvalidLength = useSelector(
    (state) => state.auth.passwordHasInvalidLength
  );
  const passwordInput = useSelector((state) => state.auth.passwordInput);

  const passwordHasDigit = (pwd) => {
    const hasDigit = /[0-9]/.test(pwd);
    if (hasDigit) {
      dispatch(authActions.setPasswordHasDigit());
    }
    return hasDigit;
  };

  return (
    <RulesContainer>
      <div className={classes.passwordRule}>
        {passwordHasInvalidLength ? <ErrorIcon /> : <ValidIcon />}
        <p className={classes.rule}>Length is between 8 and 16 characters</p>
      </div>
      <div className={classes.passwordRule}>
        {passwordHasInvalidChars ? <ErrorIcon /> : <ValidIcon />}
        <p className={classes.rule}>
          Password does not include any invalid characters
        </p>
      </div>
      <div className={classes.passwordRule}>
        {!passwordHasDigit(passwordInput) ? <ErrorIcon /> : <ValidIcon />}
        <p className={classes.rule}>Password has at least one digit</p>
      </div>
    </RulesContainer>
  );
};

export default PasswordRule;
