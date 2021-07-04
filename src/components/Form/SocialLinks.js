import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  socialLinksContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  facebook: {
    "&:hover": {
      color: "#3b5998",
    },
  },
  twitter: {
    "&:hover": {
      color: "#1DA1F2",
    },
  },
  github: {
    "&:hover": {
      color: "rgb(51,51,51)",
    },
  },
  bgFacebook: {
    "&:hover": {
      background: "rgba(59,89,152,0.2)",
    },
  },
  bgTwitter: {
    "&:hover": {
      background: "rgba(29,161,242,0.2)",
    },
  },
  bgGithub: {
    "&:hover": {
      background: "rgba(51,51,51,0.2)",
    },
  },
}));

const SocialLinks = () => {
  const classes = useStyles();
  return (
    <div className={classes.socialLinksContainer}>
      <div className={classes.linkContainer}>
        <IconButton className={classes.bgFacebook}>
          <FacebookIcon fontSize="large" className={classes.facebook} />
        </IconButton>
      </div>
      <div className={classes.linkContainer}>
        <IconButton className={classes.bgGithub}>
          <GitHubIcon fontSize="large" className={classes.github} />
        </IconButton>
      </div>
      <div className={classes.linkContainer}>
        <IconButton className={classes.bgTwitter}>
          <TwitterIcon fontSize="large" className={classes.twitter} />
        </IconButton>
      </div>
    </div>
  );
};

export default SocialLinks;
