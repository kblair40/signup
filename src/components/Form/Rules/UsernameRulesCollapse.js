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

const UsernameRulesCollapse = (props) => {
  const classes = useStyles();

  const usernameHasInvalidLength = useSelector(
    (state) => state.auth.usernameHasInvalidLength
  );
  const usernameHasInvalidChars = useSelector(
    (state) => state.auth.usernameHasInvalidChars
  );

  const isOpen = useSelector((state) => state.auth.usernameAccordionIsOpen);

  return (
    <div className={classes.collapseContainer}>
      <Collapse in={isOpen}>
        <Paper elevation={0} className={classes.paper}>
          <List>
            <ListItem className={classes.usernameRule}>
              {usernameHasInvalidLength ? <ErrorIcon /> : <ValidIcon />}
              <p className={classes.rule}>
                Length is between 7 and 15 characters
              </p>
            </ListItem>
            <ListItem className={classes.usernameRule}>
              {usernameHasInvalidChars ? <ErrorIcon /> : <ValidIcon />}
              <p className={classes.rule}>
                Username does not include any invalid characters
              </p>
            </ListItem>
          </List>
        </Paper>
      </Collapse>
    </div>
  );
};

export default UsernameRulesCollapse;
