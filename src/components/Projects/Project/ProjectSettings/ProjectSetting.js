import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import AntTab from "../../Layout/AntTabs/AntTab/AntTab";

import NotificationsSettings from "./NotificationsSettings/NotificationsSettings";
import GeneralSettings from "./GeneralSettings/GeneralSettings";

const InnerTabs = withStyles({
  indicator: {
    backgroundColor: "#FEBE80",
  },
})((props) => <Tabs {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 40,
    marginTop: 25,
    width: "100%",
  },
  courseText: {
    fontWeight: 500,
  },
  tabs: {
    marginLeft: 40,
  },
  content: {
    width: "100%",
  },
}));

const ProjectSetting = () => {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        <Typography variant="h5" className={classes.courseText}>
          Settings
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <AppBar position="static" color="transparent" elevation={0}>
          <InnerTabs
            className={classes.tabs}
            value={tabValue}
            onChange={handleChange}
            aria-label="Options"
          >
            <AntTab label="General" />
            <AntTab label="Notifications" />
          </InnerTabs>
        </AppBar>
      </Grid>
      <Grid item xs={12} className={classes.content}>
        {tabValue === 0 ? <GeneralSettings /> : <NotificationsSettings />}
      </Grid>
    </Grid>
  );
};

export default ProjectSetting;
