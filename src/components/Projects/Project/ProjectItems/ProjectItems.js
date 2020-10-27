import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import AddLesson from "../../utils/Modals/ModalAgregarLesson";
import Lesson from "./Lesson";
import url from "../../../../commons";
import Axios from "axios";

export default function Items(props) {

   useEffect(() => {
     Axios.get(url+"/courses/"+props.match.params.id+"/weeks").then((res) => {
      const getWeeks = res.data;
      const getLessons = [];
      getWeeks.map((week, i) => {
        let actualLessons = week.lessons
        actualLessons.map((lesson,i)=>{
          getLessons.push(lesson);
        })
      });
      console.log(getLessons);
      setLessons(getLessons);
      });
   }, [])

    const [lessons, setLessons] = useState([]);

    const funcNewLesson = (newLesson) => {
      let actualLessons = [...lessons];
      newLesson.id = lessons.length+1;
      actualLessons.push(newLesson);
      actualLessons.sort(function (a, b) {
        return a.id - b.id;
      });
      setLessons(actualLessons);
    };
    

  function TabPanel(props) {
    const { children, value, index } = props;

    return (
      <React.Fragment>
        {value === index && <Grid container>{children}</Grid>}
      </React.Fragment>
    );
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      marginLeft: 10,
      paddingRight: 10,
      height: "auto",
      minWidth: "250px",
    },
    title: {
      textAlign: "center",
      fontWeight: 500,
      marginBottom: 8,
      marginTop: 20,
    },
    modalContainer: {
      textAlign: "center",
    },
    textField: {
      marginBottom: 30,
    },
    indicator: {
      backgroundColor: "#2F365F",
      left: "0px",
    },
    addButton: {
      marginBottom: 20,
      backgroundColor: "#2F365F",
      color: "#FFF",
      "&:hover": {
        backgroundColor: "#FFF",
        color: "#2F365F",
      },
    },
    addIcon: {
      paddingRight: 5,
      paddingBottom: 2,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    fluid: {
      flexGrow: 1,
      margin: 20,
      width: "100vh",
    },
    tabPanel: {
      margin: 20,
    },
    lesson: {
      flexGrow: 1,
      padding: 25,
    },
    titleLesson: {
      textAlign: "center",
      fontWeight: 500,
      marginBottom: 40,
      marginTop: 20,
    },
  }));

  const LessonsTitle = () => {
    const classes = useStyles();
    return (
      <Typography className={classes.title} variant="h4">
        Lessons
      </Typography>
    );
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let lessonsTab = [];
  let lessonssTabPanel = [];
    lessons.map((lesson, i) => {
      lessonsTab.push(<Tab key={i} label={lesson.title} />);
      lessonssTabPanel.push(
        <TabPanel key={i} value={value} index={i + 2}>
        <Typography key={i} className={classes.titleLesson} variant="h4">
        {"Lesson: "+lesson.title}
        </Typography >
          <Lesson lesson={lesson} />
        </TabPanel>
      );
    });

  return (
    <Grid className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        classes={{
          indicator: classes.indicator,
        }}
      >
        <LessonsTitle />
        <Grid style={{paddingLeft:70}}>
        <AddLesson func={funcNewLesson}/>
        </Grid>
        {lessonsTab}
      </Tabs>
      <Grid className={classes.tabPanel}>
          <Card className={classes.lesson}>
          {lessonssTabPanel}
          </Card>
      </Grid>
    </Grid>
  );
}
