import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useSelector } from "react-redux";

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
});

const EmailRulesCollapse = (props) => {
  const classes = useStyles();
  const emailHasError = useSelector((state) => state.auth.emailHasError);

  const isOpen = useSelector((state) => state.auth.emailAccordionIsOpen);

  return (
    <div className={classes.collapseContainer}>
      <Collapse in={isOpen}>
        <Paper elevation={0} className={classes.paper}>
          <List>
            <ListItem className={classes.usernameRule}>
              {!emailHasError ? <ErrorIcon /> : <ValidIcon />}
              <p className={classes.rule}>Email is a valid email format</p>
            </ListItem>
          </List>
        </Paper>
      </Collapse>
    </div>
  );
};

export default EmailRulesCollapse;
