import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Slide from "@material-ui/core/Slide";

import FormPopperContent from "./FormPopperContent";

const useStyles = makeStyles((theme) => ({
  popperContainer: {
    position: "relative",
  },
  paperRoot: {
    minWidth: "10rem",
    minHeight: "auto",
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(0,0,0,0.1)",
    // background: "transparent",
  },
}));

const FormPopper = ({ anchorEl, open, targetName }) => {
  const id = open ? "transitions-popper" : undefined;
  const classes = useStyles();
  return (
    <div className={classes.popperContainer}>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="right-end"
        // placement="right-end"
        popperOptions={{
          modifiers: {
            flip: {
              enabled: false,
            },
            offset: {
              // 2nd arg pushes on x-axis
              offset: "0, 2px",
            },
            preventOverflow: {
              enabled: false,
            },
            hide: {
              enabled: false,
            },
          },
        }}
        transition
      >
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
          <Paper elevation={0} classes={{ root: classes.paperRoot }}>
            <FormPopperContent anchorEl={anchorEl} targetName={targetName} />
          </Paper>
        </Slide>
      </Popper>
    </div>
  );
};

export default FormPopper;
