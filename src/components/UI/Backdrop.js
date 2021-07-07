import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import ErrorModal from "../Fail/ErrorModal";

const useStyles = makeStyles((theme) => ({
  backdropContainer: (props) => ({
    backgroundColor: props.color ? props.color : "#0c0c0d",
    height: "100vh",
    position: "relative",
    width: "100vw",
  }),
}));

const Backdrop = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.backdropContainer}>
      {props.children}
      <ErrorModal />
    </div>
  );
};

export default Backdrop;
