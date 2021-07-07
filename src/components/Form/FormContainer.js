import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { authActions } from "../../store/authSlice";

const FormContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "AIzaSyDzq0qel4UDBQYRFEFDJPLLS-kPSpjRIl4";
  const signupUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  const loginUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  const handleFormSubmit = (email, password, mode, errorMsg = null) => {
    if (errorMsg && errorMsg !== "") {
      dispatch(authActions.setError({ msg: errorMsg }));
      return;
    }
    dispatch(authActions.clearForm());
    const isSignupMode = mode === "signup";
    setIsLoading(true);

    let url;
    if (isSignupMode) {
      url = signupUrl + apiKey;
    } else {
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
            console.log("RETURNING", res);
            return res;
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
          dispatch(
            authActions.login({
              token: data.idToken,
            })
          );
          history.replace("/success");
        } else {
          history.replace("/login");
        }
      })
      .catch((err) => {
        let msg = err.message;
        if ((msg = "INVALID_EMAIL")) {
          msg = "That is not a valid email address!";
        }
        dispatch(authActions.setError({ msg }));
      });
  };

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
