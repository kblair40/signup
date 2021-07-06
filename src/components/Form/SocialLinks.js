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
import { socialMediaAuth } from "../../service/auth";
import {
  googleProvider,
  githubProvider,
  twitterProvider,
} from "../../config/authMethods";

const useStyles = makeStyles((theme) => ({
  socialLinksContainer: {
    // border: "2px solid green",
    width: "100%",
    // height: "100%",
    maxHeight: "10rem",
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      width: "32%",
      fontFamily: "Montserrat",
      fontSize: ".7rem",
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-evenly",
    },
  },
  topMargin: {
    // marginTop: ".5rem",
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
      console.log("SUCCESS");
      const { credential, token, user } = res;
      console.log("credential:", credential);
      console.log("token:", token);
      console.log("user:", user);
      dispatch(authActions.login({ token: token, expTime: 4565198475 }));
    } else {
      console.log("FAIL");
      const { errorMessage } = res;
      console.log("ERROR ERROR MESSAGE...", errorMessage);
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
        >
          {isSignupMode ? "Sign Up" : "Login"} with Twitter
        </Button>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.githubBtn }}
          startIcon={<GitHubIcon fontSize="large" />}
          onClick={() => handleLoginClick(githubProvider)}
        >
          {isSignupMode ? "Sign Up" : "Login"} with Github
        </Button>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.googleBtn }}
          startIcon={<FontAwesomeIcon fontSize="large" icon={faGoogle} />}
          onClick={() => handleLoginClick(googleProvider)}
        >
          {isSignupMode ? "Sign Up" : "Login"} with Google
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton className={classes.bgTwitter}>
          <TwitterIcon
            fontSize="large"
            onClick={() => handleLoginClick(twitterProvider)}
          />
        </IconButton>
        <IconButton
          className={classes.bgGithub}
          onClick={() => handleLoginClick(githubProvider)}
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
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
      </Hidden>
    </div>
  );
};

export default SocialLinks;
