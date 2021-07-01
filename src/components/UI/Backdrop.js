import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  backdropContainer: {
    backgroundColor: "#0c0c0d",
    height: "100vh",
    position: "relative",
    width: "100vw",
  },
}));

const Backdrop = (props) => {
  const classes = useStyles();

  return <div className={classes.backdropContainer}>{props.children}</div>;
};

export default Backdrop;
