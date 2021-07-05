import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { authActions } from "../../store/authSlice";

const FormContainer = () => {
  const location = useLocation();
  console.log("LOCATION:", location);
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.auth.mode);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "AIzaSyDzq0qel4UDBQYRFEFDJPLLS-kPSpjRIl4";
  const signupUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  // add to redux state to decide if in sign-in or create-account mode - or maybe useParams with react-router
  //   const mode = "signup"; // hard-coding for now

  const handleFormSubmit = (username, email, password, confirmPassword) => {
    dispatch(authActions.clearForm());

    setIsLoading(true);

    let url;
    if (location.pathname === "/signup") {
      url = signupUrl + apiKey;
    } else {
      console.log("ERROR: This should not run");
      url = apiKey;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          //   console.log("RETURNING", res.json());
          return res.json();
        } else {
          // FAILED
          return res.json().then((data) => {
            // Replace later with error modal
            console.log("ERROR:", data);

            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        dispatch(
          authActions.login({
            token: data.idToken,
            expTime: expirationTime.getTime(),
          })
        );
        history.replace("/signup");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const componentToRender = () => {
    if ((location.pathname = "/signup")) {
      return <SignupForm />;
    } else {
      return <LoginForm />;
    }
  };

  return componentToRender();
};

export default FormContainer;
