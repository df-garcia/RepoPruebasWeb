import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import EditIcon from "@material-ui/icons/Edit";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import { indigo } from "@material-ui/core/colors";
import Link from "@material-ui/core/Link";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const data = {
  projectname: "ISIS3710 - Seguimiento Proyecto Coursera",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  projectowner: "Andrés Fernando Velásquez Andrade",
  contactinfo: "Visible",
  defaultprivacy: "Open",
  state: "Active",
  checkedTasks: false,
  checkedMessages: true,
  checkedComments: true,
  checkedAlerts: false,
  checkedTime: true,
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

const GeneralSettings = () => {
  const classes = useStyles();
  const [switchState, setSwitchState] = React.useState({
    checkedTasks: data.checkedTasks,
    checkedMessages: data.checkedMessages,
    checkedComments: data.checkedComments,
    checkedAlerts: data.checkedAlerts,
    checkedTime: data.checkedTime,
  });
  const [dataState, setDataState] = React.useState(data);
  const [disabledState, setDisabledState] = React.useState(true);

  const handleSwitchChange = (event) => {
    setDataState({
      ...dataState,
      [event.target.name]: event.target.checked,
    });
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDisableChange = (event) => {
    setDisabledState(!disabledState);
  };

  const handleDataChange = (event) => {
    setDataState({
      ...dataState,
      [event.target.name]: event.target.value,
    });
  };

  const preventDefault = (event) => event.preventDefault();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={4}>
        <Card elevation={3} className={classes.settingscard}>
          <CardHeader
            className={classes.courseheader}
            action={
              <IconButton aria-label="settings" onClick={handleDisableChange}>
                <EditIcon />
              </IconButton>
            }
            title="General Settings"
          />
          <form>
            <Grid container className={classes.cardcontent}>
              <Grid item xs={3}>
                <label htmlFor="projectname">
                  <Typography variant="subtitle2" className={classes.cardtext}>
                    Project Name
                  </Typography>
                </label>
              </Grid>
              <Grid item xs={9}>
                <Input
                  type="text"
                  id="projectname"
                  name="projectname"
                  value={dataState.projectname}
                  fullWidth={true}
                  onChange={handleDataChange}
                  disabled={disabledState}
                  className={classes.cardtext}
                ></Input>
              </Grid>
              <Grid item xs={3}>
                <label htmlFor="description">
                  <Typography variant="subtitle2" className={classes.cardtext}>
                    Description
                  </Typography>
                </label>
              </Grid>
              <Grid item xs={9}>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={dataState.description}
                  fullWidth={true}
                  multiline={true}
                  onChange={handleDataChange}
                  disabled={disabledState}
                  className={classes.cardtext}
                ></Input>
              </Grid>
              <Grid item xs={3}>
                <label htmlFor="projectowner">
                  <Typography variant="subtitle2" className={classes.cardtext}>
                    Project Owner
                  </Typography>
                </label>
              </Grid>
              <Grid item xs={9}>
                <Input
                  type="text"
                  id="projectowner"
                  name="projectowner"
                  value={dataState.projectowner}
                  fullWidth={true}
                  onChange={handleDataChange}
                  disabled={disabledState}
                  className={classes.cardtext}
                ></Input>
              </Grid>
              <Grid item xs={3}>
                <label htmlFor="contactinfo">
                  <Typography variant="subtitle2" className={classes.cardtext}>
                    Contact Info
                  </Typography>
                </label>
              </Grid>
              <Grid item xs={9}>
                <Select
                  labelId="contactinfo"
                  id="contactinfo"
                  name="contactinfo"
                  onChange={handleDataChange}
                  value={dataState.contactinfo}
                  disabled={disabledState}
                  className={classes.cardtext}
                >
                  <MenuItem value={"Visible"}>Visible</MenuItem>
                  <MenuItem value={"Hidden"}>Hidden</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={3}>
                <label htmlFor="defaultprivacy">
                  <Typography variant="subtitle2" className={classes.cardtext}>
                    Default Privacy
                  </Typography>
                </label>
              </Grid>
              <Grid item xs={9}>
                <Select
                  labelId="defaultprivacy"
                  id="defaultprivacy"
                  name="defaultprivacy"
                  onChange={handleDataChange}
                  value={dataState.defaultprivacy}
                  disabled={disabledState}
                  className={classes.cardtext}
                >
                  <MenuItem value={"Open"}>Open</MenuItem>
                  <MenuItem value={"Private"}>Private</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={3}>
                <label htmlFor="state">
                  <Typography variant="subtitle2" className={classes.cardtext}>
                    State
                  </Typography>
                </label>
              </Grid>
              <Grid item xs={9}>
                <Select
                  labelId="state"
                  id="state"
                  name="state"
                  onChange={handleDataChange}
                  value={dataState.state}
                  disabled={disabledState}
                  className={classes.cardtext}
                >
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Ended"}>Ended</MenuItem>
                </Select>
              </Grid>
              <hr />
              <hr />
              <Grid item xs={12} className={classes.submitarea}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  disabled={disabledState}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card elevation={3} className={classes.settingscard}>
          <CardHeader
            className={classes.courseheader}
            title="Project Settings"
          />
          <Grid container className={classes.cardcontent}>
            <Grid item xs={10}>
              <Typography variant="subtitle2" className={classes.cardtext}>
                Tasks
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedTasks}
                onChange={handleSwitchChange}
                name="checkedTasks"
                inputProps={{ "aria-label": "tasks checkbox" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="subtitle2" className={classes.cardtext}>
                Messages
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedMessages}
                onChange={handleSwitchChange}
                name="checkedMessages"
                inputProps={{ "aria-label": "messages checkbox" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="subtitle2" className={classes.cardtext}>
                Comments
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedComments}
                onChange={handleSwitchChange}
                name="checkedComments"
                inputProps={{ "aria-label": "comments checkbox" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="subtitle2" className={classes.cardtext}>
                Alerts
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedAlerts}
                onChange={handleSwitchChange}
                name="checkedAlerts"
                inputProps={{ "aria-label": "alerts checkbox" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="subtitle2" className={classes.cardtext}>
                Time Left
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <BlueSwitch
                checked={switchState.checkedTime}
                onChange={handleSwitchChange}
                name="checkedTime"
                inputProps={{ "aria-label": "time checkbox" }}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card elevation={3} className={classes.settingscard}>
          <CardHeader className={classes.courseheader} title="Project Logo" />
          <Grid container className={classes.cardcontent}>
            <Grid item xs={9}>
              <Typography variant="body1" className={classes.cardtext}>
                No logo specified
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Link
                href="#"
                onClick={preventDefault}
                color="textSecondary"
                variant="body2"
                className={classes.cardtext}
              >
                Upload a logo
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GeneralSettings;
