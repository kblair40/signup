import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { authActions } from "../../store/authSlice";

import { socialMediaLogout } from "../../service/auth";
import Backdrop from "../UI/Backdrop";
import LogoutButton from "./LogoutButton";

const useStyles = makeStyles((theme) => ({
  successContainer: (styles) => ({
    height: "100vh",
    fontFamily: styles.font,
    color: styles.colors.black,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& h1": {
      marginTop: 0,
      textAlign: "center",
    },
    "& h3": {
      textAlign: "center",
      fontFamily: "Montserrat",
    },
  }),
  successCard: {
    padding: "1rem",
    height: "80%",
    maxHeight: "40rem",
    minHeight: "35rem",
    width: "55%",
    minWidth: "22rem",
    maxWidth: "40rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  [theme.breakpoints.down("sm")]: {
    successCard: {
      width: "80vw",
    },
  },
  [theme.breakpoints.down("xs")]: {
    successCard: {
      width: "90vw",
      height: "90%",
    },
  },
}));

const Success = () => {
  const colors = useSelector((state) => state.provider.colors);
  const font = useSelector((state) => state.provider.font);
  const provider = useSelector((state) => state.provider.authProvider);
  const classes = useStyles({ colors, font });
  const [timeUntilLogout, setTimeUntilLogout] = useState(30);

  const dispatch = useDispatch();
  const history = useHistory();

  let timer, forceLogout;
  useEffect(() => {
    timer = setInterval(() => {
      setTimeUntilLogout((state) => state - 1);
    }, 1000);

    const forceLogout = setTimeout(() => {
      handleLogout();
      clearInterval(timer);
    }, 30000);
  }, []);

  const handleLogout = () => {
    socialMediaLogout();
    dispatch(authActions.logout({ font: font, colors: colors }));
    clearInterval(timer);
    clearTimeout(forceLogout);
    history.replace("/login");
  };
  return (
    <Backdrop color={colors.main}>
      <div className={classes.successContainer}>
        <Card elevation={0} classes={{ root: classes.successCard }}>
          <h1>
            YOU ARE LOGGED IN WITH {provider ? provider.toUpperCase() : "EMAIL"}
            !
          </h1>
          <h3>You will be logged out in {timeUntilLogout} seconds!</h3>
          <LogoutButton handleLogout={handleLogout} />
        </Card>
      </div>
    </Backdrop>
  );
};

export default Success;
