import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AntTab from "../../Layout/AntTabs/AntTab/AntTab";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import PeoplePeople from "./PeoplePeople/PeoplePeople";
import PeopleTeams from "./PeopleTeams/PeopleTeams";
import axios from "axios";
import urlBackend from "../../../../commons";

const InnerTabs = withStyles({
  indicator: {
    backgroundColor: "#FEBE80",
  },
})((props) => <Tabs {...props} />);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textoAlineado: {
    paddingLeft: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  courseText: {
    fontWeight: 500,
  },
  root: {
    marginLeft: 40,
    marginTop: 25,
    width: "100%",
  },
  content: {
    marginLeft: 40,
  },
}));

const ProjectPeople = (props) => {
  const classes = useStyles();

  const [datosBack, setDatosBack] = useState([]);

  useEffect(() => {
    {
      axios
        .get(urlBackend + "/courses/" + props.match.params.id)
        .then((response) => {
          const responseData = response.data;
          const participantes = responseData.participants;
          setDatosBack(participantes);
        });
    }
  }, []);

  const [tabValue, setTabValue] = useState(0);

  //Function to handle the changes on the appbar
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        {tabValue === 0 ? (
          <Typography variant="h5" className={classes.courseText}>
            People on this project
          </Typography>
        ) : (
          <Typography variant="h5" className={classes.courseText}>
            Teams on this project
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <AppBar position="static" color="transparent" elevation={0}>
          <InnerTabs
            className={classes.tabs}
            value={tabValue}
            onChange={handleChange}
            aria-label="Options"
          >
            <AntTab label="People" />
            <AntTab label="Teams" />
          </InnerTabs>
        </AppBar>
      </Grid>
      <Grid item xs={12} className={classes.content}>
        {tabValue === 0 ? (
          <PeoplePeople datosBack={datosBack} />
        ) : (
          <PeopleTeams datosBack={datosBack} />
        )}
      </Grid>
    </Grid>
  );
};

export default ProjectPeople;
