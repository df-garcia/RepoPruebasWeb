import React, { useState, useEffect } from "react";
import axios from "axios";
import backendURL from "../../../../commons";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import AntTab from "../../Layout/AntTabs/AntTab/AntTab";

import OverviewActivity from "./OverviewActivity/OverviewActivity";
import OverviewSummary from "./OverviewSummary/OverviewSummary";

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

const ProjectOverview = (props) => {
  // Variables para cambiar
  const userEmail = "user2@test.com";

  //Styles for the page
  const classes = useStyles();

  //Value for the appbar
  const [tabValue, setTabValue] = useState(0);

  //Value for the project weeks
  const [weeksData, setWeeksData] = useState({});

  //Value for all items section
  const [allItemsData, setAllItemsData] = useState({});

  //Value for my items section
  const [myItemsData, setMyItemsData] = useState({});

  //Value for breakdown section
  const [breakdownData, setBreakdownData] = useState([]);

  //Value for the activity section
  const [activityData, setActivityData] = useState([]);

  // Items info
  const itemsLabels = [
    "En edición",
    "En Plataforma",
    "Escaleta en construccion",
    "Listo para montaje",
    "Para Revisión",
    "Pendiente",
    "Escaleta en construcción",
  ];
  const itemsBackgroundColor = [
    "rgba(59,131, 189, 0.9)",
    "rgba(60, 160, 60, 0.9)",
    "rgba(229,190, 1, 0.9)",
    "rgba(87,35, 100, 0.8)",
    "rgba(255,128,0, 0.9)",
    "rgba(203,50, 52, 0.9)",
  ];

  // Weeks info
  const weeksLabels = ["Assigned", "Started", "Completed"];
  const weeksBackgroundColor = [
    "gray",
    "rgba(59,131, 189, 0.9)",
    "rgba(60, 160, 60, 0.9)",
    "rgba(203,50, 52, 0.9)",
  ];

  //Function to load the activity data
  useEffect(() => {
    const activityArray = [];
    axios
      .get(backendURL + "/courses/" + props.match.params.id + "/eventLog")
      .then((response) => {
        const responseData = response.data;
        for (let eventLogId in responseData) {
          let eventLog = responseData[eventLogId];
          let eventLogPrimaryText =
            eventLog.eventAuthor.name +
            " " +
            eventLog.eventAction.toString().toLowerCase() +
            " a " +
            eventLog.eventTarget.eventObjectType.toString().toLowerCase();
          let eventLogSecondaryText = "";
          if (
            eventLog.eventTarget.eventObjectType.toString() === "ITEM" ||
            eventLog.eventTarget.eventObjectType.toString() === "lesson"
          ) {
            eventLogSecondaryText = eventLog.eventTarget.eventObject.title.toString();
          }
          const activityLogItem = {
            eventLogPrimaryText: eventLogPrimaryText,
            eventLogSecondaryText: eventLogSecondaryText,
          };
          activityArray.push(activityLogItem);
        }
        setActivityData(activityArray);
      });
  }, []);

  //Function to load the breakdown data
  useEffect(() => {
    let breakdownMap = new Map();
    axios
      .get(backendURL + "/courses/" + props.match.params.id + "/weeks")
      .then((response) => {
        const responseData = response.data;
        for (let weekId in responseData) {
          let week = responseData[weekId];
          let weekLessons = week.lessons;
          for (let lessonId in weekLessons) {
            let lesson = weekLessons[lessonId];
            let lessonItems = lesson.items;
            for (let lessonItemId in lessonItems) {
              let item = lessonItems[lessonItemId];
              let itemResponsables = item.responsables;
              for (let itemResponsableId in itemResponsables) {
                let responsable = itemResponsables[itemResponsableId];
                if (!breakdownMap.has(responsable.name)) {
                  breakdownMap.set(responsable.name, 1);
                } else {
                  breakdownMap.set(
                    responsable.name,
                    breakdownMap.get(responsable.name) + 1
                  );
                }
              }
            }
          }
        }
        let breakdownArray = Array.from(breakdownMap, ([name, items]) => ({
          name,
          items,
        }));
        breakdownArray.sort((a, b) => b.items - a.items);
        if (breakdownArray.length > 5) {
          breakdownArray.length = 5;
        }
        setBreakdownData(breakdownArray);
      });
  }, []);

  //Function to load the all items data
  useEffect(() => {
    const allItemsValues = itemsLabels.reduce(
      (ac, a) => ({ ...ac, [a]: [] }),
      {}
    );
    const myItemsValues = itemsLabels.reduce(
      (ac, a) => ({ ...ac, [a]: [] }),
      {}
    );
    axios
      .get(backendURL + "/courses/" + props.match.params.id + "/weeks")
      .then((response) => {
        const responseData = response.data;
        for (let weekId in responseData) {
          let week = responseData[weekId];
          let weekLessons = week.lessons;
          for (let lessonId in weekLessons) {
            let lesson = weekLessons[lessonId];
            let lessonItems = lesson.items;
            for (let lessonItemId in lessonItems) {
              let item = lessonItems[lessonItemId];
              allItemsValues[item.status].push(item);
              let itemResponsables = item.responsables;
              for (let itemResponsableId in itemResponsables) {
                let responsable = itemResponsables[itemResponsableId];
                if (responsable.email === userEmail) {
                  if (myItemsValues[item.status].indexOf(item) === -1) {
                    myItemsValues[item.status].push(item);
                  }
                }
              }
            }
          }
        }
        // Set all items state
        const allItData = Object.values(allItemsValues).map(
          (array) => array.length
        );
        const queryAllItemsData = {
          labels: itemsLabels,
          datasets: [
            {
              data: allItData,
              backgroundColor: itemsBackgroundColor,
              hoverBackgroundColor: itemsBackgroundColor,
            },
          ],
        };
        setAllItemsData(queryAllItemsData);

        // Set my items state
        const myItData = Object.values(myItemsValues).map(
          (array) => array.length
        );
        const queryMyItemsData = {
          labels: itemsLabels,
          datasets: [
            {
              data: myItData,
              backgroundColor: itemsBackgroundColor,
              hoverBackgroundColor: itemsBackgroundColor,
            },
          ],
        };
        setMyItemsData(queryMyItemsData);
      });
  }, []);

  //Function to load the weeks data
  useEffect(() => {
    const weeksValues = weeksLabels.reduce((ac, a) => ({ ...ac, [a]: [] }), {});

    axios
      .get(backendURL + "/courses/" + props.match.params.id + "/weeks")
      .then((response) => {
        const responseData = response.data;
        responseData.forEach((week) => {
          weeksValues[week.status].push(week);
        });
        const data = Object.values(weeksValues).map((array) => array.length);
        const queryWeeksData = {
          labels: weeksLabels,
          datasets: [
            {
              data: data,
              backgroundColor: weeksBackgroundColor,
              hoverBackgroundColor: weeksBackgroundColor,
            },
          ],
        };
        setWeeksData(queryWeeksData);
      });
  }, []);

  //Function to handle the changes on the appbar
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        <Typography variant="h5" className={classes.courseText}>
          Overview
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
            <AntTab label="Summary" />
            <AntTab label="Activity" />
          </InnerTabs>
        </AppBar>
      </Grid>
      <Grid item xs={12} className={classes.content}>
        {tabValue === 0 ? (
          <OverviewSummary
            handleChange={handleChange}
            breakdownData={breakdownData}
            myItemsData={myItemsData}
            allItemsData={allItemsData}
            weeksData={weeksData}
          />
        ) : (
          <OverviewActivity activityData={activityData} />
        )}
      </Grid>
    </Grid>
  );
};

export default ProjectOverview;
