import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import { indigo } from "@material-ui/core/colors";

const data = {
    checkedProjectProfessor: false,
    checkedProjectPedagogue: true,
    checkedProjectWeek: false,
    checkedProjectLesson: false,
    checkedProjectItem: true,

    checkedCommentUser: true,
    checkedCommentProfessor: false,
    checkedCommentPedagogue: true,

    checkedGlobalUser: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "35px",
    width: "100%",
  },
  content: {
    marginLeft: 40,
  },
  settingscard: {
    background: "#f3f3f3",
  },
  cardcontent: {
    padding: "15px",
    paddingTop: "0px",
  },
  submitarea: {
    textAlign: "center",
    visibility: "visible",
  },
  cardtext: {
    fontSize: 16,
    padding: "5px",
  },
}));

const BlueSwitch = withStyles({
    switchBase: {
      color: indigo[300],
      "&$checked": {
        color: indigo[500],
      },
      "&$checked + $track": {
        backgroundColor: indigo[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

const NotificationSettings = () => {
  const classes = useStyles();
  const [switchState, setSwitchState] = React.useState(data);

  const handleSwitchChange = (event) => {
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={4}>
        <Card elevation={3} className={classes.settingscard}>
          <CardHeader
            className={classes.courseheader}
            title="Default Project Notifications"
          />
          <Grid container className={classes.cardcontent}>
            <Grid item xs={10}>
              <Typography variant="body1" className={classes.cardtext}>
                Allow notifications to Professors
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedProjectProfessor}
                onChange={handleSwitchChange}
                name="checkedProjectProfessor"
                inputProps={{ "aria-label": "project-professor checkbox" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1" className={classes.cardtext}>
                Allow notifications to Pedagogues
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedProjectPedagogue}
                onChange={handleSwitchChange}
                name="checkedProjectPedagogue"
                inputProps={{ "aria-label": "project-pedagogue checkbox" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1" className={classes.cardtext}>
                Notify when a new Week is created
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedProjectWeek}
                onChange={handleSwitchChange}
                name="checkedProjectWeek"
                inputProps={{ "aria-label": "project-week checkbox" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1" className={classes.cardtext}>
                Notify when a new Lesson is created
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedProjectLesson}
                onChange={handleSwitchChange}
                name="checkedProjectLesson"
                inputProps={{ "aria-label": "project-Lesson checkbox" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1" className={classes.cardtext}>
                Notify when a new Item is created
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedProjectItem}
                onChange={handleSwitchChange}
                name="checkedProjectItem"
                inputProps={{ "aria-label": "project-item checkbox" }}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card elevation={3} className={classes.settingscard}>
          <CardHeader
            className={classes.courseheader}
            title="Default Comments Notifications"
          />
          <Grid container className={classes.cardcontent}>
            <Grid item xs={10}>
              <Typography variant="body1" className={classes.cardtext}>
                Include the user who created the comment
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedCommentUser}
                onChange={handleSwitchChange}
                name="checkedCommentUser"
                inputProps={{ "aria-label": "CommentUser checkbox" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1" className={classes.cardtext}>
                Allow notifications to all Professors
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedCommentProfessor}
                onChange={handleSwitchChange}
                name="checkedCommentProfessor"
                inputProps={{ "aria-label": "CommentProfessor checkbox" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1" className={classes.cardtext}>
                Allow notifications to all Pedagogues
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedCommentPedagogue}
                onChange={handleSwitchChange}
                name="checkedCommentPedagogue"
                inputProps={{ "aria-label": "CommentPedagogue checkbox" }}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card elevation={3} className={classes.settingscard}>
          <CardHeader
            className={classes.courseheader}
            title="Global Notifications"
          />
          <Grid container className={classes.cardcontent}>
            <Grid item xs={10}>
              <Typography variant="body1" className={classes.cardtext}>
                Notify all users when a Project is created
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedGlobalUser}
                onChange={handleSwitchChange}
                name="checkedGlobalUser"
                inputProps={{ "aria-label": "GlobalUser checkbox" }}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NotificationSettings;
