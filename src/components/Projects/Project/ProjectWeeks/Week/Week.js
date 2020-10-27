import React, { useState } from "react";
import AddItem from "../../../utils/Modals/ModalAgregarItem";
import AddLesson from "../../../utils/Modals/ModalAgregarLesson";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import axios from "axios";
import urlBackend from "../../../../../commons";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  weekTitle: {
    marginTop: 10,
    fontSize: 55,
  },
  root: {
    width: "100%",
    flexGrow: 1,
  },
  weekObjectives: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    marginTop: 20,
    fontSize: 20,
    border: "2px solid lightgray",
    borderRadius: "8px",
    marginRight: 100,
    marginLeft: 100,
  },
  labelItems: {
    ...theme.typography.button,
    fontSize: 20,
    marginTop: 30,
    borderBottom: "2px solid lightgray",
    marginRight: 550,
    marginLeft: 550,
  },
  btnGroup: {
    marginTop: 10,
    backgroundColor: "#FFF",
    color: "#2F365F",
    "&:hover": {
      backgroundColor: "#2F365F",
      color: "#FFF",
    },
    marginBottom: 20,
  },
  weekCard: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    marginTop: 30,
    height: "auto",
  },
  itemCardTitle: {
    backgroundColor: "#2F365F",
    color: "#FFF",
    marginLeft: 100,
    borderLeft: "1px solid black",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderTopLeftRadius: "5px",
    height: 150,
  },
  itemCardDesc: {
    borderRight: "1px solid black",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderTopRightRadius: "5px",
    marginRight: 100,
    height: 150,
    position: "relative",
  },
  itemTitle: {
    marginTop: 50,
    fontSize: 22,
  },
  itemDesc: {
    marginTop: 10,
    fontSize: 25,
    marginBottom: 20,
  },
  descFooter: {
    position: "absolute",
    top: 0,
    right: 0,
    textAlign: "right",
    left: "46%",
  },
  lessonFooter: {
    fontSize: 20,
    textDecoration: "none",
    position: "absolute",
    color: "black",
    marginLeft: 5,
  },
  iconFooter: {
    cursor: "pointer",
    marginRight: 5,
  },
  respCard: {
    backgroundColor: "#FFF",
    marginLeft: 100,
    marginRight: 100,
    borderLeft: "1px solid black",
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    height: 100,
    marginBottom: 30,
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  },
  respAvatars: {
    display: "flex",
    textAlign: "center",
  },
  respTitle: {
    marginBottom: 15,
    fontSize: 25,
  },
  imgAvatar: {
    margin: "auto",
    backgroundColor: "#3D5A5B",
  },
  textItemDesc: {
    fontSize: 20,
  },
  itemLesson: {
    fontSize: 20,
    marginTop: 10,
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    marginLeft: 100,
    marginRight: 100,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#3D5A5B",
  },
}))(LinearProgress);

const AvatarTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const GroupItemCards = (props) => {
  const classes = useStyles();
  const [lessons, setLessons] = useState(props.lessons);
  const [open, setOpen] = React.useState(false);

  var globalItem;
  var globalLesson;

  const deleteItem = (lesson, item) => {
    let newLessons = lessons;
    let newLesson = lesson;
    newLesson.items = newLessons[newLessons.indexOf(lesson)].items.filter(
      (x) => x._id !== item._id
    );
    newLessons[newLessons.indexOf(lesson)] = newLesson;
    setLessons(newLessons);
  };

  const handleClickOpen = (lesson, item) => {
    window.globalItem = item;
    window.globalLesson = lesson;
    setOpen(true);
  };

  const handleClose = (action) => {
    if (action === 1) {
      {
        deleteItem(window.globalLesson, window.globalItem);
      }
    }
    setOpen(false);
  };

  let cardItems = [];
  if (lessons != null) {
    lessons.map((lesson, j) => {
      cardItems = [];
      if (lesson.items != null) {
        lesson.items.map((item, i) => {
          let weekResp = item.responsables;
          let respAvatarsCode = [];
          weekResp.map((resp, i) => {
            respAvatarsCode.push(
              <AvatarTooltip
                key={i}
                title={
                  <React.Fragment>
                    <Typography color="inherit">{resp.name}</Typography>
                    <br />
                    <em>{resp.role}</em>
                  </React.Fragment>
                }
              >
                <Avatar className={classes.imgAvatar}>
                  {resp.name.substring(0, 2)}
                </Avatar>
              </AvatarTooltip>
            );
          });
          cardItems.push(
            <React.Fragment key={i}>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to permanently delete the item?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    It will be removed from all places.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button color="primary" onClick={() => handleClose(2)}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={() => handleClose(1)}>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
              <Grid item xs={4}>
                <div className={classes.itemCardTitle}>
                  <Typography variant="h4" className={classes.itemTitle}>
                    Item: {item.title}
                  </Typography>
                  <Typography variant="h5" className={classes.itemLesson}>
                    Lesson: {lesson.title}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className={classes.itemCardDesc} id="itemDesc">
                  <Typography variant="h4" className={classes.itemDesc}>
                    Description
                  </Typography>
                  <Typography variant="body1" className={classes.textItemDesc}>
                    {item.description}
                  </Typography>
                  <div className={classes.descFooter}>
                    <Tooltip title={"Detail"}>
                      <AspectRatioIcon
                        onClick={() => showAlert()}
                        className={classes.iconFooter}
                      />
                    </Tooltip>
                    <Tooltip
                      title={"Delete"}
                      onClick={() => handleClickOpen(lesson, item)}
                    >
                      <DeleteIcon className={classes.iconFooter} />
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} id="itemResp">
                <div className={classes.respCard}>
                  <Typography variant="h4" className={classes.respTitle}>
                    In charge
                  </Typography>
                  <div className={classes.respAvatars}>{respAvatarsCode}</div>
                </div>
              </Grid>
            </React.Fragment>
          );
        });
      }
    });
  }

  return (
    <Grid container align="center">
      {cardItems}
    </Grid>
  );
};

const showAlert = () => {
  alert("se lleva a detail de item");
};

const Week = (props) => {
  const [lessons, setLessons] = useState(props.week.lessons);

  const funcNewItem = (newItem) => {
    axios
      .post(
        urlBackend +
          "/courses/" +
          props.match.params.id +
          "/weeks/" +
          props.week._id +
          "/lessons/" +
          lessons[0]._id +
          "/items",
        newItem
      )
      .then((response) => {
        let newItemX = response.data;
        let oldItems = lessons[0].items;
        oldItems.push(newItemX);
        lessons[0].items = oldItems;
        let lessonsActuales = lessons;
        setLessons(lessonsActuales);
      });
  };

  {
    /**let propsFilter = [];
  const chargeFilter = (charge) => {
    items.map((item, i) => {
      let count = 0;
      item.resp.map((resp, j) => {
        if (charge == resp.charge) {
          count++;
        }
      });
      if (count === item.resp.length) {
        propsFilter.push(props.week.items[i]);
      }
    });
    setItems(propsFilter);
  };*/
  }

  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    let charge = event.target.value;
    setAge(event.target.value);
    {
      /**chargeFilter(charge);*/
    }
  };
  const classes = useStyles();
  return (
    <Grid container align="center">
      <Grid item xs={12} className={classes.root}>
        <Card elevation={3} className={classes.weekCard}>
          <CardContent>
            <Typography variant="h1" className={classes.weekTitle}>
              Week {props.week.number}: {props.week.name}
            </Typography>
            <BorderLinearProgress variant="determinate" value={40} />
            <Typography className={classes.weekObjectives} variant="h2">
              Objectives: {props.week.objectives[0].description}
            </Typography>
            <Typography className={classes.labelItems} variant="h3">
              Lessons-Items
            </Typography>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <AddLesson />
              <AddItem func={funcNewItem} />
            </ButtonGroup>
            <br />
            {/**<FormControl className={classes.margin}>
              <InputLabel id="demo-customized-select-label">
                <FilterListIcon />
              </InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={age}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                <MenuItem value={"None"}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Professor"}>Professors</MenuItem>
                <MenuItem value={"Pedagogue"}>Pedagogues</MenuItem>
              </Select>
            </FormControl>*/}
          </CardContent>
          <GroupItemCards lessons={lessons} />
        </Card>
      </Grid>
    </Grid>
  );
};
export default withRouter(Week);
