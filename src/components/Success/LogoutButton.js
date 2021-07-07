import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  logoutBtnRoot: (colors) => ({
    fontFamily: "Roboto",
    color: "white",
    width: "50%",
    minWidth: "20rem",
    maxWidth: "30rem",
    backgroundColor: colors.red,
    "&:hover": {
      backgroundColor: colors.red,
    },
  }),
}));

const LogoutButton = ({ colors, handleLogout }) => {
  const classes = useStyles(colors);
  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      classes={{ root: classes.logoutBtnRoot }}
      fullWidth
    >
      LOGOUT
    </Button>
  );
};

export default LogoutButton;
