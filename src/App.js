import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Success from "./components/Success/Success";
import FormContainer from "./components/Form/FormContainer";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
