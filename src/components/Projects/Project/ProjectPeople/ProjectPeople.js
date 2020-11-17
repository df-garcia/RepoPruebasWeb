import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AntTab from "../../Layout/AntTabs/AntTab/AntTab";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import PeoplePeople from "./PeoplePeople/PeoplePeople";
import PeopleTeams from "./PeopleTeams/PeopleTeams";
import PeopleGallery from "./PeopleGallery/PeopleGallery";
import axios from "axios";
import urlBackend from "../../../../commons";
import authHeader from "../../../../services/auth-header";

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
    axios
      .get(
        urlBackend + "/users/courses/" + props.match.params.id + "/allusers",
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        const responseData = response.data.data;
        setDatosBack(responseData);
        console.log(responseData);
      });
  }, []);

  const [tabValue, setTabValue] = useState(0);

  //Function to handle the changes on the appbar
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Function to change titles shown, depending on the tab that has been clicked
  const handleTabTitles = (currentTab) => {
    let title;
    if (currentTab === 0) {
      title = (
        <Typography variant="h5" className={classes.courseText}>
          People on this project
        </Typography>
      );
    } else if (currentTab === 1) {
      title = (
        <Typography variant="h5" className={classes.courseText}>
          Teams on this project
        </Typography>
      );
    } else {
      title = (
        <Typography variant="h5" className={classes.courseText}>
          Project Gallery
        </Typography>
      );
    }
    return title;
  };

  /*const deleteUser = (userId) => {
    currentParticipants = datosBack;

    // hacer filter

    setDatosBack(currentParticipants);

    axios.get("/currentCourse");

    axios.put(currentCourse);
  };*/

  // Function to change content shown, depending on the tab that has been clicked
  const handleTabContent = (currentTab) => {
    let content;
    /*deleteUser={deleteUser}*/
    if (currentTab === 0) {
      content = (
        <PeoplePeople datosBack={datosBack} setDatosBack={setDatosBack} />
      );
    } else if (currentTab === 1) {
      content = <PeopleTeams datosBack={datosBack} />;
    } else {
      content = <PeopleGallery />;
    }
    return content;
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        {handleTabTitles(tabValue)}
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
            <AntTab label="Gallery" />
          </InnerTabs>
        </AppBar>
      </Grid>
      <Grid item xs={12} className={classes.content}>
        {handleTabContent(tabValue)}
      </Grid>
    </Grid>
  );
};

export default ProjectPeople;
