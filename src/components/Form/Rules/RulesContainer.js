import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  rulesContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: ".2rem",
  },
});

const RulesContainer = (props) => {
  const classes = useStyles();

  return <div className={classes.rulesContainer}>{props.children}</div>;
};

export default RulesContainer;
