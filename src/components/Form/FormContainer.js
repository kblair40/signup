import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { authActions } from "../../store/authSlice";

const FormContainer = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("signup");
  const [user, setUser] = useState(null);

  const apiKey = "AIzaSyDzq0qel4UDBQYRFEFDJPLLS-kPSpjRIl4";
  const signupUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  const loginUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  // add to redux state to decide if in sign-in or create-account mode - or maybe useParams with react-router
  //   const mode = "signup"; // hard-coding for now

  const handleFormSubmit = (email, password, mode) => {
    dispatch(authActions.clearForm());
    const isSignupMode = mode === "signup";
    setMode(mode);
    setIsLoading(true);

    let url;
    if (isSignupMode) {
      console.log("SIGN UP");
      url = signupUrl + apiKey;
    } else {
      console.log("LOGIN");
      url = loginUrl + apiKey;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: !isSignupMode ? false : true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          if (isSignupMode) {
            console.log("RETURNING", res.json());
            return res.json();
          } else {
            console.log("RETURNING", res);
            return res.json();
          }
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (!isSignupMode) {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          console.log("ATTEMPTING LOG IN");
          dispatch(
            authActions.login({
              token: data.idToken,
              expTime: expirationTime.getTime(),
            })
          );
        }
        history.replace("/login");
      })
      .catch((err) => {
        let msg = err.message;
        console.log("CODE:", err);
        if ((msg = "INVALID_EMAIL")) {
          msg = "That is not a valid email address!";
        }
        dispatch(authActions.setError({ msg }));
        // alert(err.message);
      });
  };
  console.log("IS LOGGED IN?", isLoggedIn);
  return (
    <div>
      {location.pathname === "/signup" ? (
        <SignupForm handleFormSubmit={handleFormSubmit} />
      ) : (
        <LoginForm handleFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default FormContainer;
