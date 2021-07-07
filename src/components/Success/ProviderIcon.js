import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import Tooltip from "@material-ui/core/Tooltip";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles((theme) => ({
  iconBtnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "1rem",
    right: "1rem",
  },
  iconColor: (colors) => ({
    "&:hover": {
      background: "transparent",
    },
    "& a": {
      color: "white",
      opacity: 0.9,
      "&:hover": {
        opacity: 1,
      },
    },
  }),
  [theme.breakpoints.down("xs")]: {
    iconBtnContainer: {
      top: ".2rem",
      right: ".2rem",
    },
  },
}));

const ProviderIcon = ({ colors, provider }) => {
  const classes = useStyles(colors);

  const setIcon = (provider) => {
    return provider === "twitter" ? (
      <a href="https://www.twitter.com">
        <TwitterIcon fontSize="large" />
      </a>
    ) : provider === "github" ? (
      <GitHubIcon fontSize="large" />
    ) : (
      <p>GOOGLE</p>
    );
  };

  const toTitleCase = (provider) => {
    provider = provider[0].toUpperCase() + provider.slice(1);
    console.log("PROVIDER:", provider);
    return provider;
  };

  return (
    <div className={classes.iconBtnContainer}>
      <Tooltip title={`Go to ${toTitleCase(provider)}`} placement="left" arrow>
        <IconButton className={classes.iconColor}>
          {setIcon(provider)}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ProviderIcon;
