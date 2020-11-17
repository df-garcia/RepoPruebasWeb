import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AntTab from "../Layout/AntTabs/AntTab/AntTab";
import AntTabs from "../Layout/AntTabs/AntTabs";

import ProjectOverview from "../Project/ProjectOverview/ProjectOverview";
import ProjectWeeks from "../Project/ProjectWeeks/ProjectWeeks";
import ProjectItems from "../Project/ProjectItems/ProjectItems";
import ProjectPeople from "../Project/ProjectPeople/ProjectPeople";
import ProjectSettings from "../Project/ProjectSettings/ProjectSetting";

import ItemDetail from "../Project/ProjectItems/ItemDetail/ItemDetail";

import url from "../../../commons";
import axios from "axios";

import authHeader from "../../../services/auth-header";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 40,
    marginTop: 15,
    width: "100%",
  },
  courseText: {
    fontWeight: 500,
  },
  content: {
    width: "100%",
  },
}));

const Project = (props) => {
  //Styles for the page
  const classes = useStyles();

  //Value for the appbar
  const [course, setCourse] = useState({});

  //Value for the appbar
  const [value, setValue] = useState(0);
  //Function to handle the changes on the appbar
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Function to route to the sub-sections
  const handleRouteChange = (newRoute) => {
    props.history.push("/projects/" + props.match.params.id + newRoute);
  };

  useEffect(() => {
    const currentCourseId = props.match.params.id;
    axios
      .get(url + "/courses/" + currentCourseId, {
        headers: authHeader(),
      })
      .then((result) => {
        setCourse(result.data.data);
      });
  }, [props]);

  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        <Typography variant="h5" className={classes.courseText}>
          {course.code} - {course.name}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <AppBar position="static" color="transparent" elevation={0}>
          <AntTabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            aria-label="Options"
          >
            <AntTab
              label="Overview"
              onClick={() => handleRouteChange("/overview")}
            />
            <AntTab label="Weeks" onClick={() => handleRouteChange("/weeks")} />
            <AntTab label="Items" onClick={() => handleRouteChange("/items")} />
            <AntTab
              label="People"
              onClick={() => handleRouteChange("/people")}
            />
            <AntTab
              label="Settings"
              onClick={() => handleRouteChange("/settings")}
            />
            <AntTab
              label="Item Detail"
              onClick={() => handleRouteChange("/itemdetail")}
            />
          </AntTabs>
        </AppBar>
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <Switch>
          <Route path="/projects/:id/overview" component={ProjectOverview} />
          <Route path="/projects/:id/weeks" component={ProjectWeeks} />
          <Route path="/projects/:id/items" component={ProjectItems} />
          <Route path="/projects/:id/people" component={ProjectPeople} />
          <Route path="/projects/:id/settings" component={ProjectSettings} />
          <Route path="/projects/:id/itemdetail" component={ItemDetail} />
          <Redirect from="/projects/:id" to="/projects/:id/overview" />
        </Switch>
      </Grid>
    </Grid>
  );
};

export default Project;
