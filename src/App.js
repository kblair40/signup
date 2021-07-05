import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Switch, Route, Redirect } from "react-router-dom";

import SignupForm from "./components/Form/SignupForm";
import FormContainer from "./components/Form/FormContainer";

// COLORS:
// Success: #5dca36
// error: #ff4244
// Others - aqua spring: #effaf6, elm: #1d6d86, black: #0c0c0d, grey: #a0a1a1, piston blue: #4ebeef, copper: #af8536, brown/sepia: #6c3510

// FONTS - COMFORTAA & MONTSERRAT

const useStyles = makeStyles((theme) => ({
  appContainer: {},
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signup" />
          {/* <SignupForm /> */}
        </Route>
        <Route to="/signup" exact>
          <FormContainer />
        </Route>
        <Route to="/login" exact>
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
