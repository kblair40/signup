import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  accordionContainer: {
    // display: "none",
  },
  detailContainer: {
    display: "flex",
    flexDirection: "column",
  },
});

const RulesAccordion = () => {
  const classes = useStyles();
  //   const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <div className={classes.collapseContainer}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Collapse in={checked}>
        <Paper elevation={0} className={classes.paper}>
          <List>
            <ListItem>gsafsdfsafs</ListItem>
            <ListItem>gsafsdfsafs</ListItem>
            <ListItem>gsafsdfsafs</ListItem>
          </List>
        </Paper>
      </Collapse>
    </div>
  );
};

export default RulesAccordion;
