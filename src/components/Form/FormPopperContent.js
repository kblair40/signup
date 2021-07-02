import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formPopperContentContainer: {
    fontFamily: "Montserrat",
    width: "100%",
    background: "rgba(20,20,200,.2)",
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  showValidity: {
    fontSize: ".8rem",
    marginLeft: "1rem",
  },
}));
const FormPopperContent = () => {
  const classes = useStyles();
  const usernameHasInvalidLength = useSelector(
    (state) => state.auth.usernameHasInvalidLength
  );
  const usernameHasInvalidChars = useSelector(
    (state) => state.auth.usernameHasInvalidChars
  );
  // console.log("VALIDITY:", usernameHasInvalidLength);
  return (
    <div className={classes.formPopperContentContainer}>
      <div>
        <CancelOutlinedIcon />
      </div>
      <div className={classes.showValidity}>
        Valid Length: {usernameHasInvalidLength ? "False" : "True"}
      </div>
    </div>
  );
};

export default FormPopperContent;
