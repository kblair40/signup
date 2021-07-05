import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";

import AuthCard from "../UI/AuthCard";
import FormPopper from "./FormPopper";
import SocialLinks from "./SocialLinks";
import { authActions } from "../../store/authSlice";

const LoginForm = () => {
  return <div>LOGIN</div>;
};

export default LoginForm;
