import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useSelector } from "react-redux";

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
  const classes = useStyles(props);
  const provider = useSelector((state) => state.provider.authProvider);

  return (
    <div className={classes.backdropContainer}>
      <ProviderIcon provider={provider} />
      {props.children}
      <ErrorModal />
    </div>
  );
};

export default Backdrop;
