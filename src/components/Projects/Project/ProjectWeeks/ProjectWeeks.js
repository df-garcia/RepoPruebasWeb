import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Weeks from "./Weeks/Weeks";

const ProjectWeeks = () => {
  //Styles for the page

  return (
    <Grid container>
      <Weeks />
    </Grid>
  );
};

export default ProjectWeeks;
