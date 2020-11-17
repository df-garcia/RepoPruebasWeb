import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import mainLogo from "../../../../assets/images/conectate_logo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    margin: "auto",
  },
  logo: {
    height: 35,
  },
  marginAutoItem: {
    margin: "auto",
  },
}));

const SimpleToolbar = (props) => {
  const classes = useStyles();

  const signup = () => {
    props.history.push("/signup");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item xs={11} className={classes.title}>
              <img className={classes.logo} src={mainLogo} alt="Project Logo" />
            </Grid>
            <Grid item xs={1}>
              <Button
                className={classes.marginAutoItem}
                onClick={signup}
                variant="contained"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(SimpleToolbar);
