import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import Form from "./components/Form/Form";

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
      <Form />
    </div>
  );
}

export default App;
