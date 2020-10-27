import React from "react";
import { Switch, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import LayoutToolbar from "./Layout/LayoutToolbar/LayoutToolbar";
import Project from "./Project/Project";
import ProjectsGrid from "./ProjectsGrid/ProjectsGrid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  content: {
    width: "100%",
  },
}));

const Projects = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.content}>
          <LayoutToolbar />
        </Grid>
        <Grid item xs={12} className={classes.content}>
          <Switch>
            <Route path="/projects" exact component={ProjectsGrid} />
            <Route path="/projects/:id" component={Project} />
            <Route component={ProjectsGrid} />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};

export default Projects;
