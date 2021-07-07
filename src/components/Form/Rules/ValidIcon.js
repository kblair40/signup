import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";

const useStyles = makeStyles({
  validIcon: {
    color: "#5dca36",
    margin: 0,
    padding: 0,
  },
});

const ValidIcon = () => {
  const classes = useStyles();

  return (
    <CheckCircleOutlinedIcon className={classes.validIcon} fontSize="small" />
  );
};

export default ValidIcon;
