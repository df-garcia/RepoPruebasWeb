import React from "react";
import { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddLesson from "../../utils/Modals/ModalAgregarLesson";
import Lesson from "./Lesson";
import url from "../../../../commons";
import Axios from "axios";

export default function Items(props) {
  useEffect(() => {
    Axios.get(url + "/courses/" + props.match.params.id + "/weeks").then(
      (res) => {
        const getWeeks = [...res.data];
        const getLessons = [];
        getWeeks.map((week, i) => {
          let actualLessons = week.lessons;
          actualLessons.map((lesson, i) => {
            getLessons.push({ ...lesson });
          });
        });
        setOriginal(getLessons);
        setLessons(JSON.parse(JSON.stringify(getLessons)));
      }
    );
  }, []);

  const [lessonsOriginal, setOriginal] = useState([]);
  const [lessons, setLessons] = useState([]);

  const funcNewLesson = (newLesson) => {
    setOriginal([...lessonsOriginal, newLesson]);
    setLessons([...lessonsOriginal, newLesson]);
    handleChange("",lessons.length+3);
  };

  function TabPanel(props) {
    const { children, value, index } = props;

    return (
      <React.Fragment>
        {value === index && <Grid container>{children}</Grid>}
      </React.Fragment>
    );
  }

  const drawerWidth = 260;

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
      minHeight: 750,
      minWidth: 260,
      maxWidth: 260,
    },
    title: {
      textAlign: "center",
      fontWeight: 500,
      marginBottom: 8,
      marginTop: 20,
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
    hide: {
      display: "none",
    },
    drawerPaper: {
      width: drawerWidth,
      minWidth: drawerWidth,
      position: "absolute",
      paddingLeft: 10,
      paddingRight: 10,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    filterTitles: {
      textAlign: "center",
      marginRight: 21.5,
      color: "#808080",
    },
    textInput: {
      marginTop: 10,
      marginBottom: 10,
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

  const [txtFields, setTxtFields] = useState({
    itemName: "",
    itemInCharge: "",
  });
  const [ckBoxes, setCkBoxes] = useState({
    typeVideo: { value: false, name: "Video", vName: "typeVideo" },
    typeForo: { value: false, name: "Foro", vName: "typeForo" },
    typeLectura: { value: false, name: "Lectura", vName: "typeLectura" },
    typeProyecto: { value: false, name: "Proyecto", vName: "typeProyecto" },
    typeAudio: { value: false, name: "Audio", vName: "typeAudio" },
    statusPendiente: {
      value: false,
      name: "Pendiente",
      vName: "statusPendiente",
    },
    statusEdicion: {
      value: false,
      name: "En edición",
      vName: "statusEdicion",
    },
    statusPlataforma: {
      value: false,
      name: "En Plataforma",
      vName: "statusPlataforma",
    },
    statusMontaje: {
      value: false,
      name: "Listo para montaje",
      vName: "statusMontaje",
    },
  });

  const FilterDrawer = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [textFields, setTextFields] = useState(JSON.parse(JSON.stringify(txtFields)));
    const [checkboxes, setCheckboxes] = useState(JSON.parse(JSON.stringify(ckBoxes)));

    let checkListType = [
      checkboxes.typeVideo,
      checkboxes.typeForo,
      checkboxes.typeLectura,
      checkboxes.typeProyecto,
      checkboxes.typeAudio,
    ];

    let checkListStatus = [
      checkboxes.statusPendiente,
      checkboxes.statusEdicion,
      checkboxes.statusPlataforma,
      checkboxes.statusMontaje,
    ];

    const handleChangeCheckbox = (event, pName) => {
      setCheckboxes({
        ...checkboxes,
        [event.target.name]: {
          value: event.target.checked,
          name: pName,
          vName: event.target.name,
        },
      });
    };

    const handleChangeTextField = (event) => {
      setTextFields({
        ...textFields,
        [event.target.name]: event.target.value,
      });
      console.log(event.target.name + ": " + event.target.value);
      console.log(lessons);
    };

    function createCheckboxes(pList) {
      const render = [];
      pList.map((checkbox, i) => {
        render.push(
          <Grid item xs={checkbox.name.length > 12 ? 12 : 6}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name={checkbox.vName}
                  checked={checkbox.value}
                  onChange={(event) => {
                    handleChangeCheckbox(event, checkbox.name);
                  }}
                />
              }
              label={checkbox.name}
            />
          </Grid>
        );
      });
      return <Grid container>{render}</Grid>;
    }

    const CheckboxesType = () => {
      return createCheckboxes(checkListType);
    };

    const CheckboxesStatus = () => {
      return createCheckboxes(checkListStatus);
    };

    function checkNulls(obj) {
      return obj.items.length > 0;
    }

    function checkInCharge(obj) {
      return obj.name.includes(textFields.itemInCharge);
    }

    function filterByCheckbox(pList, pFilter, pLessons) {
      let typeFilters = [];
      pList.map((checkbox) => {
        if (checkbox.value === true) {
          typeFilters.push(checkbox.name);
        }
      });
      if (typeFilters.length > 0) {
        pLessons.map((lesson) => {
          let filteredItems = [];
          lesson.items.map((item) => {
            if (pFilter === "type") {
              if (typeFilters.includes(item.itemType.itemType)) {
                filteredItems.push(item);
              }
            }
            if (pFilter === "status") {
              if (typeFilters.includes(item.status)) {
                filteredItems.push(item);
              }
            }
          });
          lesson.items = filteredItems;
        });
        pLessons = pLessons.filter(checkNulls);
      }
      return pLessons;
    }

    function filterByInput(pLessons) {
      let hasValueItemName = textFields.itemName.length > 0;
      let hasValueInCharge = textFields.itemInCharge.length > 0;
      if (hasValueItemName || hasValueInCharge) {
        pLessons.map((lesson) => {
          let filteredItems = [];
          lesson.items.map((item) => {
            if (hasValueInCharge) {
              if (item.responsables.some(checkInCharge)) {
                filteredItems.push(item);
              }
            }
            if (hasValueItemName) {
              if (item.title.includes(textFields.itemName)) {
                filteredItems.push(item);
              }
            }
          });
          lesson.items = filteredItems;
        });
        pLessons = pLessons.filter(checkNulls);
      }
      return pLessons;
    }

    const updateLesson = (e) => {
      /** Filter by item type */
      let itemFilter = filterByCheckbox(
        checkListType,
        "type",
        JSON.parse(JSON.stringify(lessonsOriginal))
      );
      /** Filter by item status */
      let statusFilter = filterByCheckbox(
        checkListStatus,
        "status",
        itemFilter
      );
      /** Filter by item name and people in charge */
      let inputFilter = filterByInput(statusFilter);
      setCkBoxes(checkboxes);
      setTxtFields(textFields);
      setLessons(inputFilter);
    };

    const resetFilters = (e) => { 
      let newCheckboxes = [...checkListType,...checkListStatus];
      let pCheckboxes = JSON.parse(JSON.stringify(checkboxes));
      newCheckboxes.map((actual)=>{
        pCheckboxes[actual.vName].value = false
      })
      setTextFields({itemName:"",itemInCharge:""});
      setCheckboxes(pCheckboxes);
    }
    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const theme = useTheme();
    return (
      <div>
        <Button
          style={{ marginLeft: 60 }}
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(open)}
        >
          <MenuIcon />
          <Typography
            style={{ textAlign: "center", paddingLeft: 16 }}
            variant="h6"
            noWrap
          >
            Filter
          </Typography>
        </Button>
        <CssBaseline />
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div
            style={{ marginRight: 20 }}
            className={(classes.drawerHeader, classes.title)}
          >
            <Typography variant="h5">Item Filter</Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h6" className={classes.filterTitles}>
            Filter by item type
          </Typography>
          <Divider />
          <CheckboxesType />
          <Divider />
          <Typography variant="h6" className={classes.filterTitles}>
            Filter by item status
          </Typography>
          <Divider />
          <CheckboxesStatus />
          <Divider />
          <Typography variant="h6" className={classes.filterTitles}>
            Filter by item name
          </Typography>
          <Divider />
          <TextField
            label="Item name"
            variant="outlined"
            name="itemName"
            value={textFields.itemName}
            className={classes.textInput}
            onChange={handleChangeTextField}
          />
          <Divider />
          <Typography variant="h6" className={classes.filterTitles}>
            Filter by people in charge
          </Typography>
          <Divider />
          <TextField
            label="In charge person"
            variant="outlined"
            name="itemInCharge"
            value={textFields.itemInCharge}
            className={classes.textInput}
            onChange={handleChangeTextField}
          />
          <Divider />
          <Button
            onClick={updateLesson}
            color="primary"
            variant="contained"
            style={{ marginTop: 10 }}
          >
            Apply Filters
          </Button>
          <Button
            onClick={resetFilters}
            color="primary"
            variant="contained"
            style={{ marginTop: 10 }}
          >
            Reset filters
          </Button>
        </Drawer>
      </div>
    );
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(3);

  const handleChange = (event, newValue) => {
    if (event.type === "change") {
      return;
    }
    setValue(newValue);
  };

  let lessonsTab = [];
  let lessonsTabPanel = [];
  lessons.map((lesson, i) => {
    lessonsTab.push(<Tab key={i} label={lesson.title} />);
    lessonsTabPanel.push(
      <TabPanel key={i} value={value} index={i + 3}>
        <Typography key={i} className={classes.titleLesson} variant="h4">
          {"Lesson: " + lesson.title}
        </Typography>
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
        <FilterDrawer />
        <Grid style={{ paddingLeft: 65 }}>
          <AddLesson func={funcNewLesson} />
        </Grid>
        {lessonsTab}
      </Tabs>
      <Grid className={classes.tabPanel} style={{ width: "100%" }}>
        <Card className={classes.lesson}>{lessonsTabPanel}</Card>
      </Grid>
    </Grid>
  );
}
