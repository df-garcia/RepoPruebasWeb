import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Week from "../Week/Week";
import Grid from "@material-ui/core/Grid";
import AddWeek from "../../../utils/Modals/ModalAgregarWeek";
import axios from "axios";
import urlBackend from "../../../../../commons";

let jsonWeeks = [
  {
    _id: "5f9755d2c295b811bdf26f8c",
    number: 0,
    name: "Welcome",
    status: "Completed",
    objectives: [
      {
        _id: "5f9755d2c295b811bdf26f8d",
        description: "NA",
      },
    ],
    lessons: [
      {
        _id: "5f975608c295b811bdf26f8f",
        title: "Welcome",
        items: [
          {
            itemType: {
              itemType: "Foro",
            },
            responsables: [
              {
                _id: "5f965b916a130e07f03a9078",
                name: "Pablo Perez",
                email: "user1@test.com",
                role: "professor",
                __v: 0,
              },
              {
                _id: "5f965bf1c9f94a083af3d09c",
                name: "Juan Arango",
                email: "user2@test.com",
                role: "professor",
                __v: 0,
              },
            ],
            links: [],
            _id: "5f9756690692ad11e2466159",
            code: "MT1ISW_F1",
            title: "Saludar y presentarse",
            description:
              "Cada alumno sube una entrada al foro con su nombre, profesión, empleo y expectativas.",
            duration: 22,
            dedication: 30,
            status: "Escaleta en construccion",
            comments: [],
          },
          {
            itemType: {
              itemType: "Lectura",
            },
            responsables: [
              {
                _id: "5f965b916a130e07f03a9078",
                name: "Pablo Perez",
                email: "user1@test.com",
                role: "professor",
                __v: 0,
              },
            ],
            links: [],
            _id: "5f9756770692ad11e246615b",
            code: "MT1ISW_L1",
            title: "Presentación del curso",
            description:
              "Se describen las caracteristicas, objetivos y ejes temáticos del curso.",
            duration: 10,
            dedication: 15,
            status: "En edición",
            comments: [],
          },
        ],
      },
    ],
  },
];

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
    width: "300px",
  },
  title: {
    textAlign: "center",
    fontWeight: 500,
    marginBottom: 8,
    marginTop: 20,
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
}));

const AddButton = (props) => {
  const classes = useStyles();
  return <AddWeek func={props.func} />;
};

const WeeksTitle = () => {
  const classes = useStyles();
  return (
    <Typography className={classes.title} variant="h4">
      Weeks
    </Typography>
  );
};

const Weeks = (props) => {
  const classes = useStyles();
  const [weeks, setWeeks] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log(props);
    axios
      .get(urlBackend + "/courses/" + props.match.params.id + "/weeks")
      .then((response) => {
        const responseData = response.data;
        setWeeks(responseData);
        setValue(2);
      });
  }, []);

  const funcNewWeek = (newWeek) => {
    let weeksActual = [...weeks];
    weeksActual.push(newWeek);
    weeksActual.sort(function (a, b) {
      return a.number - b.number;
    });
    axios
      .post(
        urlBackend + "/courses/" + props.match.params.id + "/weeks",
        newWeek
      )
      .then((response) => {
        let newWeekX = response.data;
        let oldWeeks = [...weeks];
        oldWeeks.push(newWeekX);
        oldWeeks.sort(function (a, b) {
          return a.number - b.number;
        });
        setWeeks(oldWeeks);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let weeksTab = [];
  let weeksTabPanel = [];
  weeks.map((item, i) => {
    weeksTab.push(<Tab key={i} label={"Week " + item.number} />);
    weeksTabPanel.push(
      <TabPanel key={i} value={value} index={i + 2}>
        <Week week={item} />
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
        <WeeksTitle />
        <AddButton func={funcNewWeek} />
        {weeksTab}
      </Tabs>
      {weeksTabPanel}
    </Grid>
  );
};

export default withRouter(Weeks);
