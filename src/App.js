import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import Form from "./components/Form/Form";

// FONTS - COMFORTAA & MONTSERRAT

const useStyles = makeStyles((theme) => ({
  appContainer: {},
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
