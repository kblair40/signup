import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

const useStyles = makeStyles({
  errorIcon: {
    color: "#ff4244",
    margin: 0,
    padding: 0,
  },
});
const ErrorIcon = () => {
  const classes = useStyles();

  return <CancelOutlinedIcon className={classes.errorIcon} fontSize="small" />;
};

export default ErrorIcon;
