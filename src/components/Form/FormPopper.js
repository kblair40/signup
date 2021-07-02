import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
// import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

import FormPopperContent from "./FormPopperContent";

const useStyles = makeStyles((theme) => ({
  popperContainer: {},
  paperRoot: {
    minWidth: "10rem",
    minHeight: "auto",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
  },
}));

const FormPopper = ({ anchorEl, open, targetName }) => {
  const classes = useStyles();
  return (
    // <div className={classes.popperContainer}>
    <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
      <Paper classes={{ root: classes.paperRoot }}>
        <FormPopperContent anchorEl={anchorEl} targetName={targetName} />
      </Paper>
    </Popper>
    // {/* </div> */}
  );
};

export default FormPopper;
