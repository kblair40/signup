import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useSelector } from "react-redux";

import ValidIcon from "./ValidIcon";
import ErrorIcon from "./ErrorIcon";
import RulesContainer from "./RulesContainer";

const useStyles = makeStyles({
  emailRule: {
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

const EmailRule = () => {
  const classes = useStyles();
  const emailHasError = useSelector((state) => state.auth.emailHasError);

  return (
    <RulesContainer>
      <div className={classes.emailRule}>
        {!emailHasError ? <ErrorIcon /> : <ValidIcon />}
        <p className={classes.rule}>Email is a valid email format</p>
      </div>
    </RulesContainer>
  );
};

export default EmailRule;
