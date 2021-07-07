import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Fade from "@material-ui/core/Fade";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import ErrorModal from "../Fail/ErrorModal";
import ProviderIcon from "../Success/ProviderIcon";

const useStyles = makeStyles((theme) => ({
  backdropContainer: (props) => ({
    backgroundColor: props.color ? props.color : "#0c0c0d",
    height: "100vh",
    position: "relative",
    width: "100vw",
  }),
}));

const Backdrop = (props) => {
  let color = props.color;
  if (!color) {
    color = localStorage.getItem("mainColor");
  }
  const classes = useStyles({ color });
  const location = useLocation();
  const provider = useSelector((state) => state.provider.authProvider);

  const showIcon = location.pathname === "/success" && provider !== "email";
  return (
    <Fade in={true} timeout={300}>
      <div className={classes.backdropContainer}>
        {showIcon && <ProviderIcon provider={provider} />}
        {props.children}
        <ErrorModal />
      </div>
    </Fade>
  );
};

export default Backdrop;
