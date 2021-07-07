import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../../store/authSlice";
import ValidIcon from "./ValidIcon";
import ErrorIcon from "./ErrorIcon";
import RulesContainer from "./RulesContainer";

const useStyles = makeStyles({
  showUsernameValidity: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: ".2rem",
  },
  usernameRule: {
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

const UsernameRule = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const usernameHasInvalidLength = useSelector(
    (state) => state.auth.usernameHasInvalidLength
  );
  const usernameHasInvalidChars = useSelector(
    (state) => state.auth.usernameHasInvalidChars
  );
  const emailHasError = useSelector((state) => state.auth.emailHasError);
  const passwordHasInvalidChars = useSelector(
    (state) => state.auth.passwordHasInvalidChars
  );
  const passwordHasInvalidLength = useSelector(
    (state) => state.auth.passwordHasInvalidLength
  );
  const passwordsMatch = useSelector((state) => state.auth.passwordsMatch);
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
      <div className={classes.usernameRule}>
        {usernameHasInvalidLength ? <ErrorIcon /> : <ValidIcon />}
        <p className={classes.rule}>Length is between 7 and 15 characters</p>
      </div>
      <div className={classes.usernameRule}>
        {usernameHasInvalidChars ? <ErrorIcon /> : <ValidIcon />}
        <p className={classes.rule}>
          Username does not include any invalid characters
        </p>
      </div>
    </RulesContainer>
  );
};

export default UsernameRule;
