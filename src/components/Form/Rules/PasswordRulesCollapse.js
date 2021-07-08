import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../../store/authSlice";
import ValidIcon from "./ValidIcon";
import ErrorIcon from "./ErrorIcon";

const useStyles = makeStyles({
  collapseContainer: {
    // display: "none",
  },
  detailContainer: {
    display: "flex",
    flexDirection: "column",
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
  helpIcon: {
    marginLeft: ".25rem",
    "&:hover": {
      cursor: "help",
    },
  },
});

const PasswordRulesCollapse = (props) => {
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

  const isOpen = useSelector((state) => state.auth.passwordAccordionIsOpen);
  const validChars = "_!@$&*";
  return (
    <div className={classes.collapseContainer}>
      <Collapse in={isOpen}>
        <Paper elevation={0} className={classes.paper}>
          <List>
            <ListItem className={classes.usernameRule}>
              {passwordHasInvalidLength ? <ErrorIcon /> : <ValidIcon />}
              <p className={classes.rule}>
                Length is between 8 and 16 characters
              </p>
            </ListItem>
            <ListItem className={classes.usernameRule}>
              {passwordHasInvalidChars ? <ErrorIcon /> : <ValidIcon />}

              <p className={classes.rule}>
                {/* ADD TOOLTIP TO SPECIFY WHAT INVALID CHARACTERS ARE */}
                Password does not include any invalid characters
              </p>
              <Tooltip
                title={`Only letters, numbers and the following characters are allowed: ${validChars}`}
                plaement="right"
              >
                <HelpOutlineIcon
                  className={classes.helpIcon}
                  fontSize="small"
                />
              </Tooltip>
            </ListItem>
            <ListItem className={classes.usernameRule}>
              {!passwordHasDigit(passwordInput) ? <ErrorIcon /> : <ValidIcon />}
              <p className={classes.rule}>Password has at least one digit</p>
            </ListItem>
          </List>
        </Paper>
      </Collapse>
    </div>
  );
};

export default PasswordRulesCollapse;
