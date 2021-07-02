import React, { Fragment } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  formPopperContentContainer: {
    fontFamily: "Montserrat sans-serif",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  showValidity: {
    fontSize: ".8rem",
    fontFamily: "Montserrat sans-serif",
    width: "100%",
  },
  validationRow: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  rule: {
    marginLeft: "1rem",
    fontFamily: "Montserrat",
  },
  errorIcon: {
    color: "#ff4244",
  },
  validIcon: {
    color: "#5dca36",
  },
}));
const FormPopperContent = ({ targetName }) => {
  const classes = useStyles();

  const usernameHasInvalidLength = useSelector(
    (state) => state.auth.usernameHasInvalidLength
  );
  const usernameHasInvalidChars = useSelector(
    (state) => state.auth.usernameHasInvalidChars
  );
  const emailHasError = useSelector((state) => state.auth.emailHasError);
  const passwordHasInvalidChars = useSelector(
    (state) => state.auth.passwordHasInvalidChars
  );
  const passwordHasInvalidLength = useSelector(
    (state) => state.auth.passwordHasInvalidLength
  );
  const passwordsMatch = useSelector((state) => state.auth.passwordsMatch);

  const popperContent = () => {
    return (
      <Fragment>
        {/* USERNAME */}
        {targetName === "username" ? (
          <div className={classes.showValidity}>
            <div className={classes.validationRow}>
              {usernameHasInvalidLength ? (
                <CancelOutlinedIcon className={classes.errorIcon} />
              ) : (
                <CheckCircleOutlinedIcon className={classes.validIcon} />
              )}

              <p className={classes.rule}>
                Length is between 7 and 15 characters
              </p>
            </div>
            <div className={classes.validationRow}>
              {usernameHasInvalidChars ? (
                <CancelOutlinedIcon className={classes.errorIcon} />
              ) : (
                <CheckCircleOutlinedIcon className={classes.validIcon} />
              )}
              <p className={classes.rule}>
                Username does not include any invalid characters
              </p>
            </div>
          </div>
        ) : targetName === "email" ? (
          // EMAIL
          <div className={classes.showValidity}>
            <div className={classes.validationRow}>
              {!emailHasError ? (
                <CancelOutlinedIcon className={classes.errorIcon} />
              ) : (
                <CheckCircleOutlinedIcon className={classes.validIcon} />
              )}

              <p className={classes.rule}>Format is valid</p>
            </div>
          </div>
        ) : targetName === "password" ? (
          <div className={classes.showValidity}>
            <div className={classes.validationRow}>
              {passwordHasInvalidLength ? (
                <CancelOutlinedIcon className={classes.errorIcon} />
              ) : (
                <CheckCircleOutlinedIcon className={classes.validIcon} />
              )}

              <p className={classes.rule}>
                Length is between 7 and 15 characters
              </p>
            </div>
            <div className={classes.validationRow}>
              {!passwordHasInvalidChars ? (
                <CancelOutlinedIcon className={classes.errorIcon} />
              ) : (
                <CheckCircleOutlinedIcon className={classes.validIcon} />
              )}
              <p className={classes.rule}>
                Password does not include any invalid characters
              </p>
            </div>
          </div>
        ) : (
          <div className={classes.showValidity}>
            <div className={classes.validationRow}>
              {!passwordsMatch ? (
                <CancelOutlinedIcon className={classes.errorIcon} />
              ) : (
                <CheckCircleOutlinedIcon className={classes.validIcon} />
              )}
              <p className={classes.rule}>Both passwords are the same</p>
            </div>
          </div>
        )}
      </Fragment>
    );
  };

  console.log("targetName:", targetName);
  return (
    <div className={classes.formPopperContentContainer}>
      {/* <div>
        <CancelOutlinedIcon />
      </div> */}
      {/* <div className={classes.showValidity}>
        <p>Valid Length: {usernameHasInvalidLength ? "False" : "True"}</p>
      </div> */}
      {popperContent()}
    </div>
  );
};

export default FormPopperContent;
