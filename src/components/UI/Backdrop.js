import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import ErrorModal from "../Fail/ErrorModal";

const useStyles = makeStyles((theme) => ({
  backdropContainer: {
    backgroundColor: "#0c0c0d",
    height: "100vh",
    position: "relative",
    width: "100vw",
  },
  // errorModalContainer: {
  //   display: "flex",
  //   height: "100%",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   padding: "2rem",
  // },
}));

const Backdrop = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.backdropContainer}>
      {props.children}
      {/* <div className={classes.errorModalContainer}> */}
      <ErrorModal />
      {/* </div> */}
    </div>
  );
};

export default Backdrop;
