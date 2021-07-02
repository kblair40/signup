import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

import FormPopperContent from "./FormPopperContent";

const useStyles = makeStyles((theme) => ({
  popperContainer: {},
  paperRoot: {
    minWidth: "10rem",
    minHeight: "5rem",
    // padding: ".5rem",
  },
}));

const FormPopper = ({ anchorEl, open }) => {
  const classes = useStyles();
  return (
    <div className={classes.popperContainer}>
      <Popper open={open} anchorEl={anchorEl} placement="right">
        <Paper classes={{ root: classes.paperRoot }}>
          <FormPopperContent />
        </Paper>
      </Popper>
    </div>
  );
};

export default FormPopper;
