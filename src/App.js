import React, { useState } from "react";
// import makeStyles from "@material-ui/core/styles/makeStyles";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Success from "./components/Success/Success";
import FormContainer from "./components/Form/FormContainer";

// COLORS:
// Success: #5dca36 / rgb(93,202,54)
// error: #ff4244 / rgb(255,66,68)
// elm: #1d6d86 / rgb(29,109,134)
// Others - aqua spring: #effaf6, , black: #0c0c0d, grey: #a0a1a1, piston blue: #4ebeef, copper: #af8536, brown/sepia: #6c3510

// FONTS - COMFORTAA & MONTSERRAT

// const useStyles = makeStyles((theme) => ({
//   appContainer: {},
// }));

function App() {
  // const classes = useStyles();
  const remainingTime = useSelector((state) => state.auth.remainingTime);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("FROM APP - IS LOGGED IN?", isLoggedIn);
  console.log("FROM APP - REMAINING TIME?", remainingTime);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signup" />
        </Route>
        <Route path="/success" exact>
          {isLoggedIn ? <Success /> : <Redirect to="/login" />}
        </Route>
        <Route to="/signup" exact>
          <FormContainer />
        </Route>
        <Route to="/login" exact>
          <FormContainer />
        </Route>
        <Route to="/social" exact>
          <FormContainer />
        </Route>
        <Route to="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
