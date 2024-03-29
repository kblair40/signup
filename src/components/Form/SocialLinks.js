import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authActions } from "../../store/authSlice";
import { providerActions } from "../../store/providerSlice";
import { socialMediaAuth } from "../../service/auth";
import {
  googleProvider,
  githubProvider,
  twitterProvider,
} from "../../config/authMethods";

const useStyles = makeStyles((theme) => ({
  socialLinksContainer: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      width: "32%",
      fontFamily: "Montserrat",
      fontSize: ".7rem",
      fontWeight: 600,
    },
  },
  iconBtnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bgGoogle: {
    "&:hover": {
      background: "rgba(219,50,54,.2)",
      color: "rgb(219,50,54)",
    },
  },
  googleIconBtn: {
    fontSize: "2.1875rem",
  },
  bgTwitter: {
    "&:hover": {
      background: "rgba(29,161,242,0.2)",
      color: "#1DA1F2",
    },
  },
  bgGithub: {
    "&:hover": {
      background: "rgba(51,51,51,0.2)",
      color: "rgb(51,51,51)",
    },
  },
  googleBtn: {
    background: "rgba(219,50,54, .9)",
    "&:hover": {
      background: "rgb(219,50,54)",
    },
  },
  githubBtn: {
    background: "rgba(51,51,51, .9)",
    "&:hover": {
      background: "rgb(51,51,51)",
    },
  },
  twitterBtn: {
    background: "rgba(29,161,242, .9)",
    "&:hover": {
      background: "rgb(29,161,242)",
    },
  },
  [theme.breakpoints.down("sm")]: {
    socialLinksContainer: {
      position: "relative",
      top: "1rem",
    },
  },
  [theme.breakpoints.down("xs")]: {
    socialLinksContainer: {
      // top: "2rem",
      justifyContent: "space-evenly",
      alignItems: "center",
      "& button": {
        width: "100%",
        fontFamily: "Montserrat",
      },
    },
  },
}));

const SocialLinks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isSignupMode = location.pathname === "/signup";

  const handleLoginClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    const { success } = res;
    if (success) {
      const { credential, token } = res;
      const provider = credential.providerId;
      dispatch(
        authActions.login({
          token: token,
        })
      );
      dispatch(providerActions.setProvider({ provider: provider }));
    } else {
      const { errorMessage } = res;
      dispatch(authActions.setError({ msg: errorMessage }));
    }
    history.replace("/success");
  };
  return (
    <div
      className={`${classes.socialLinksContainer} ${
        isSignupMode && classes.topMargin
      }`}
    >
      <Hidden xsDown>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.twitterBtn }}
          startIcon={<TwitterIcon fontSize="large" />}
          onClick={() => handleLoginClick(twitterProvider)}
          disableFocusRipple
        >
          {isSignupMode ? "Sign Up" : "Login"} with Twitter
        </Button>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.githubBtn }}
          startIcon={<GitHubIcon fontSize="large" />}
          onClick={() => handleLoginClick(githubProvider)}
          disableFocusRipple
        >
          {isSignupMode ? "Sign Up" : "Login"} with Github
        </Button>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.googleBtn }}
          startIcon={<FontAwesomeIcon fontSize="large" icon={faGoogle} />}
          onClick={() => handleLoginClick(googleProvider)}
          disableFocusRipple
        >
          {isSignupMode ? "Sign Up" : "Login"} with Google
        </Button>
      </Hidden>
      <Hidden smUp>
        <div className={classes.iconBtnContainer}>
          <IconButton
            className={classes.bgTwitter}
            onClick={() => handleLoginClick(twitterProvider)}
          >
            <TwitterIcon fontSize="large" />
          </IconButton>
        </div>
        <div className={classes.iconBtnContainer}>
          <IconButton
            className={classes.bgGithub}
            onClick={() => handleLoginClick(githubProvider)}
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
        </div>
        <div className={classes.iconBtnContainer}>
          <IconButton
            className={classes.bgGoogle}
            onClick={() => handleLoginClick(googleProvider)}
          >
            <FontAwesomeIcon
              className={classes.googleIconBtn}
              fontSize="large"
              icon={faGoogle}
            />
          </IconButton>
        </div>
      </Hidden>
    </div>
  );
};

export default SocialLinks;
