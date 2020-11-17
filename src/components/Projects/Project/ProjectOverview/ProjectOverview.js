import React, { useState, useEffect } from "react";
import axios from "axios";
import backendURL from "../../../../commons";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import AntTab from "../../Layout/AntTabs/AntTab/AntTab";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import OverviewActivity from "./OverviewActivity/OverviewActivity";
import OverviewSummary from "./OverviewSummary/OverviewSummary";

import authHeader from "../../../../services/auth-header";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ProjectOverview = (props) => {
  // Styles for the page
  const classes = useStyles();

  // Value for the appbar
  const [tabValue, setTabValue] = useState(0);

  // Value for the backdrop
  const [isLoading, setIsLoading] = useState(false);

  // Values for the itemStatus categories
  const [itemStatus, setItemStatus] = useState({
    titles: [],
    colors: [],
  });

  // Values for the weekStatus categories
  const [weekStatus, setWeekStatus] = useState({
    titles: [],
    colors: [],
  });

  // Value for the project weeks
  const [allWeeksData, setAllWeeksData] = useState({});

  // Value for the project weeks
  const [myWeeksData, setMyWeeksData] = useState({});

  // Value for all items section
  const [allItemsData, setAllItemsData] = useState({});

  // Value for my items section
  const [myItemsData, setMyItemsData] = useState({});

  // Value for breakdown section
  const [breakdownData, setBreakdownData] = useState([]);

  // Value for the activity section
  const [activityData, setActivityData] = useState([]);

  // Default value for activityData
  const defaultActivityData = [
    {
      date: "Monday, 16 November",
      logItems: [
        {
          hour: "5:30 pm",
          eventLogPrimaryText:
            "José Marín added an Item - Item 3: Video Bootstrap",
          eventLogSecondaryText:
            "Description: This is the first video of Bootstrap",
        },
        {
          hour: "4:00 pm",
          eventLogPrimaryText:
            "José Marín edited an Week - Week 1: Week 1 (HTML)",
          eventLogSecondaryText: "Description: First Week of the course",
        },
        {
          hour: "2:00 pm",
          eventLogPrimaryText: "José Marín added an Item - Item 4: Video React",
          eventLogSecondaryText:
            "Description: This is the first video of React",
        },
      ],
    },
    {
      date: "Friday, 14 November",
      logItems: [
        {
          hour: "6:30 am",
          eventLogPrimaryText: "José Marín added an Item - Item 1: Video HTML",
          eventLogSecondaryText: "Description: This is the first video of HTML",
        },
        {
          hour: "8:00 am",
          eventLogPrimaryText:
            "Martín Huertas added an Item - Item 2: Video CSS",
          eventLogSecondaryText: "Description: This is the first video of CSS",
        },
      ],
    },
  ];

  // Get itemStatus data
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(backendURL + "/itemstatus/", {
        headers: authHeader(),
      })
      .then((result) => {
        const itemTitles = [];
        const itemColors = [];
        result.data.data.forEach((iStatus) => {
          itemTitles.push(iStatus.title);
          itemColors.push(iStatus.color);
        });
        setItemStatus({
          titles: itemTitles,
          colors: itemColors,
        });
      });
  }, []);

  // Get weekStatus data
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(backendURL + "/weekstatus/", {
        headers: authHeader(),
      })
      .then((result) => {
        const weekTitles = [];
        const weekColors = [];
        result.data.data.forEach((wStatus) => {
          weekTitles.push(wStatus.title);
          weekColors.push(wStatus.color);
        });
        setWeekStatus({
          titles: weekTitles,
          colors: weekColors,
        });
      });
  }, []);

  // Get user items data
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        backendURL + "/items/courses/" + props.match.params.id + "/useritems",
        {
          headers: authHeader(),
        }
      )
      .then((result) => {
        const itemStatusCount = [];
        itemStatus.titles.forEach((title, index) => {
          let currentItemStatusCount = 0;
          result.data.data.forEach((item) => {
            if (item.ItemStatus.title === title) {
              currentItemStatusCount++;
            }
          });
          itemStatusCount[index] = currentItemStatusCount;
        });

        setMyItemsData({
          labels: itemStatus.titles,
          datasets: [
            {
              data: itemStatusCount,
              backgroundColor: itemStatus.colors,
              hoverBackgroundColor: itemStatus.colors,
            },
          ],
        });
      });
  }, [props, itemStatus]);

  // Get all items data
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        backendURL + "/items/courses/" + props.match.params.id + "/allitems",
        {
          headers: authHeader(),
        }
      )
      .then((result) => {
        const itemStatusCount = [];
        itemStatus.titles.forEach((title, index) => {
          let currentItemStatusCount = 0;
          result.data.data.forEach((item) => {
            if (item.ItemStatus.title === title) {
              currentItemStatusCount++;
            }
          });
          itemStatusCount[index] = currentItemStatusCount;
        });

        setAllItemsData({
          labels: itemStatus.titles,
          datasets: [
            {
              data: itemStatusCount,
              backgroundColor: itemStatus.colors,
              hoverBackgroundColor: itemStatus.colors,
            },
          ],
        });
      });
  }, [props, itemStatus]);

  // Get user weeks data
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        backendURL + "/weeks/courses/" + props.match.params.id + "/userweeks",
        {
          headers: authHeader(),
        }
      )
      .then((result) => {
        const weekStatusCount = [];
        weekStatus.titles.forEach((title, index) => {
          let currentWeekStatusCount = 0;
          result.data.data.forEach((week) => {
            if (week.WeekStatus.title === title) {
              currentWeekStatusCount++;
            }
          });
          weekStatusCount[index] = currentWeekStatusCount;
        });

        setMyWeeksData({
          labels: weekStatus.titles,
          datasets: [
            {
              data: weekStatusCount,
              backgroundColor: weekStatus.colors,
              hoverBackgroundColor: weekStatus.colors,
            },
          ],
        });
      });
  }, [props, weekStatus]);

  // Get all weeks data
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        backendURL + "/weeks/courses/" + props.match.params.id + "/allweeks",
        {
          headers: authHeader(),
        }
      )
      .then((result) => {
        const weekStatusCount = [];
        weekStatus.titles.forEach((title, index) => {
          let currentWeekStatusCount = 0;
          result.data.data.forEach((week) => {
            if (week.WeekStatus.title === title) {
              currentWeekStatusCount++;
            }
          });
          weekStatusCount[index] = currentWeekStatusCount;
        });

        setAllWeeksData({
          labels: weekStatus.titles,
          datasets: [
            {
              data: weekStatusCount,
              backgroundColor: weekStatus.colors,
              hoverBackgroundColor: weekStatus.colors,
            },
          ],
        });
      });
  }, [props, weekStatus]);

  // Get breakdown data
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        backendURL + "/items/courses/" + props.match.params.id + "/breakdown",
        {
          headers: authHeader(),
        }
      )
      .then((result) => {
        const breakdownArray = [];
        result.data.data.slice(0, 5).forEach((row, index) => {
          breakdownArray[index] = {
            name: row.user.name,
            items: row.assignedItems.length,
          };
        });
        setBreakdownData(breakdownArray);

        setIsLoading(false);
      });
  }, [props]);

  // Get activityData
  // useEffect(() => {
  //   setActivityData(defaultActivityData);
  // }, [defaultActivityData]);

  //Function to handle the changes on the appbar
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBackdropClose = () => {
    setIsLoading(false);
  };

  return (
    <React.Fragment>
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
              myWeeksData={myWeeksData}
              allWeeksData={allWeeksData}
            />
          ) : (
            <OverviewActivity activityData={defaultActivityData} />
          )}
        </Grid>
      </Grid>
      <Backdrop
        className={classes.backdrop}
        open={isLoading}
        onClick={handleBackdropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default ProjectOverview;
