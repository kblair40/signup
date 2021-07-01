import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

const useStyles = makeStyles((theme) => ({
  popperContainer: {},
}));

const FormPopper = ({ anchorEl, open }) => {
  const classes = useStyles();
  return (
    <div className={classes.popperContainer}>
      <Popper open={open} anchorEl={anchorEl} placement="right">
        <Paper>
          <h1> CONTENT </h1>
        </Paper>
      </Popper>
    </div>
  );
};

export default FormPopper;
