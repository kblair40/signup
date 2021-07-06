import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../store/authSlice";
import { socialMediaAuth, socialMediaLogout } from "../../service/auth";
import {
  googleProvider,
  githubProvider,
  twitterProvider,
} from "../../config/authMethods";

const useStyles = makeStyles((theme) => ({
  socialLinksContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  bgGoogle: {
    fontSize: "2.1875rem",
    "&:hover": {
      background: "rgba(219,50,54,.2)",
      color: "rgb(219,50,54)",
    },
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
}));

const SocialLinks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // return { credential, token, user };
  const handleLoginClick = async (provider) => {
    // const res = await socialMediaAuth(provider);
    const { credential, token, user } = await socialMediaAuth(provider);
    // console.log("IN SOCIAL LINKS...");
    // console.log("RES:", res);
    console.log("credential:", credential);
    console.log("token:", token);
    console.log("user:", user);
    dispatch(authActions.login({ token: token, expTime: 4565198475 }));
    history.replace("/success");
  };
  return (
    <div className={classes.socialLinksContainer}>
      <div className={classes.linkContainer}>
        {/* <Link to="/social"> */}
        <IconButton className={classes.bgTwitter}>
          <TwitterIcon
            fontSize="large"
            onClick={() => handleLoginClick(twitterProvider)}
          />
        </IconButton>
        {/* </Link> */}
      </div>
      <div className={classes.linkContainer}>
        {/* <Link to="/social"> */}
        <IconButton
          className={classes.bgGithub}
          onClick={() => handleLoginClick(githubProvider)}
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
        {/* </Link> */}
      </div>
      <div className={classes.linkContainer}>
        {/* <Link to="/social"> */}
        <IconButton
          className={classes.bgGoogle}
          onClick={() => handleLoginClick(googleProvider)}
        >
          <FontAwesomeIcon fontSize="large" icon={faGoogle} />
        </IconButton>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default SocialLinks;
