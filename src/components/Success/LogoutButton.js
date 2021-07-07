import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";

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

const LogoutButton = ({
  // colors,
  handleLogout,
}) => {
  // const colors = useSelector((state) => state.provider.colors);
  // const font = useSelector((state) => state.provider.font);
  // const colors = useSelector((state) => state.provider.colors);
  const colors = JSON.parse(localStorage.getItem("colors"));
  console.log("local storage", localStorage.getItem("colors"));
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
