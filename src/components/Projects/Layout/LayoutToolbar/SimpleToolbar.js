import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import mainLogo from "../../../../assets/images/conectate_logo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    width: "100%",
    height: 67,
    paddingLeft: 20,
    paddingRight: 0,
  },
  title: {
    flexGrow: 1,
    height: 35,
  },
  logo: {
    height: 35,
  },
}));

const SimpleToolbar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.title}>
            <img className={classes.logo} src={mainLogo} alt="Project Logo" />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(SimpleToolbar);
