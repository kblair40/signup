import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useSelector } from "react-redux";

import ValidIcon from "./ValidIcon";
import ErrorIcon from "./ErrorIcon";
import RulesContainer from "./RulesContainer";

const useStyles = makeStyles({
  confirmPasswordRule: {
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

const ConfirmPasswordRule = () => {
  const classes = useStyles();
  const passwordsMatch = useSelector((state) => state.auth.passwordsMatch);

  return (
    <RulesContainer>
      <div className={classes.confirmPasswordRule}>
        {!passwordsMatch ? <ErrorIcon /> : <ValidIcon />}
        <p className={classes.rule}>Passwords must match</p>
      </div>
    </RulesContainer>
  );
};

export default ConfirmPasswordRule;
