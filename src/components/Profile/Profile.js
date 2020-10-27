import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Input from "@material-ui/core/Input";
import Switch from "@material-ui/core/Switch";
import avatarimg from "../../assets/images/avatar.jpg";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";

import LayoutToolbar from "../Projects/Layout/LayoutToolbar/LayoutToolbar";

const data = {
  name: "Juan Pérez",
  role: "Pedagogue",
  image: avatarimg,
  email: "juanperez@uniandes.edu.co",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur alias earum, tempora mollitia ad quas iste labore eligendi odio, eaque similique est ratione aperiam aliquid modi sit qui, pariatur neque.",
  mobile: "310-558-9945",
  office: "ML111",
  extension: "2870",
  github: "https://github.com/jpgonzales",
  slack: "https://app.slack.com/client/T018SKULWEB/C019DHRMUSG",
  deliverynotifications: false,
  activitynotifications: true,
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  content: {
    width: "100%",
  },
  profilepicture: {
    background: "#ffffff",
    height: "100vh",
    display: "flex",
  },
  changepicture: {
    visibility: "hidden",
    marginTop: "-300px",
  },
  avatar: {
    height: "300px",
    width: "300px",
    "&:hover": {
      filter: "blur(5px)",
      transitionDuration: "0.2s",
      cursor: "pointer",
    },
    "&:hover ~ $changepicture": {
      visibility: "visible",
      transitionDuration: "0.2s",
    },
  },
  account: {
    background: "#f3f3f3",
  },
  profilesettings: {
    background: "#ffffff",
    margin: "50px",
    padding: "25px",
  },
  profiletext: {
    fontSize: 20,
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [switchState, setSwitchState] = React.useState({
    deliverynotifications: data.deliverynotifications,
    activitynotifications: data.activitynotifications,
  });
  const [dataState, setDataState] = React.useState(data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSwitchChange = (event) => {
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    });
    setDataState({
      ...dataState,
      [event.target.name]: event.target.checked,
    });
  };
  const handleDataChange = (event) => {
    setDataState({
      ...dataState,
      [event.target.name]: event.target.value,
    });
  };

  const goToProject = () => {
    props.history.push("/projects");
  };

  return (
    <div className={classes.root}>
      <LayoutToolbar />
      <Grid container>
        <Grid item xs={3} className={classes.profilepicture}>
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item style={{ textAlign: "center" }}>
              <Link onClick={goToProject}>
                <Avatar
                  alt={dataState.name}
                  src={dataState.image}
                  className={classes.avatar}
                />
                <Button className={classes.changepicture}>Edit</Button>
              </Link>
              <br />
              <Typography variant="h4" align="center">
                {dataState.name}
              </Typography>
              <Typography variant="h5" align="center">
                {dataState.role}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9} className={classes.account}>
          <AppBar position="static" color="transparent">
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="profile"
            >
              <Tab label="Account" {...a11yProps(0)} />
              <Tab label="Contact Info" {...a11yProps(1)} />
              <Tab label="Preferences" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Typography variant="h4">Account</Typography>
            <Box className={classes.profilesettings}>
              <form>
                <Grid container>
                  <Grid item xs={3}>
                    <label htmlFor="firstname">
                      <Typography variant="body1" className={classes.profiletext}>Name</Typography>
                    </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={dataState.name}
                      fullWidth={true}
                      onChange={handleDataChange} className={classes.profiletext}
                    ></Input>
                  </Grid>
                  <Grid item xs={3}>
                    <label htmlFor="email">
                      <Typography variant="body1" className={classes.profiletext}>Email</Typography>
                    </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={dataState.email}
                      fullWidth={true}
                      onChange={handleDataChange} className={classes.profiletext}
                    ></Input>
                  </Grid>
                  <Grid item xs={3}>
                    <label htmlFor="description">
                      <Typography variant="body1" className={classes.profiletext}>Description</Typography>
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
                      onChange={handleDataChange} className={classes.profiletext}
                    ></Input>
                  </Grid>
                  <hr />
                  <hr />
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button type="submit" variant="outlined" color="primary">
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h4">Contact Info and Socials</Typography>
            <Box className={classes.profilesettings}>
              <form>
                <Grid container>
                  <Grid item xs={3}>
                    <label htmlFor="mobilenumber">
                      <Typography variant="body1" className={classes.profiletext}>Mobile Number</Typography>
                    </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Input
                      type="text"
                      id="mobilenumber"
                      name="mobilenumber"
                      value={dataState.mobile}
                      fullWidth={true}
                      onChange={handleDataChange} className={classes.profiletext}
                    ></Input>
                  </Grid>
                  <Grid item xs={3}>
                    <label htmlFor="office">
                      <Typography variant="body1" className={classes.profiletext}>Office</Typography>
                    </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Input
                      type="text"
                      id="office"
                      name="office"
                      value={dataState.office}
                      fullWidth={true}
                      onChange={handleDataChange} className={classes.profiletext}
                    ></Input>
                  </Grid>
                  <Grid item xs={3}>
                    <label htmlFor="extension">
                      <Typography variant="body1" className={classes.profiletext}>Extension</Typography>
                    </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Input
                      type="text"
                      id="extension"
                      name="extension"
                      value={dataState.extension}
                      fullWidth={true}
                      onChange={handleDataChange} className={classes.profiletext}
                    ></Input>
                  </Grid>
                  <Grid item xs={3}>
                    <label htmlFor="github">
                      <Typography variant="body1" className={classes.profiletext}>Github</Typography>
                    </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Input
                      type="text"
                      name="github"
                      id="github"
                      value={dataState.github}
                      fullWidth={true}
                      onChange={handleDataChange} className={classes.profiletext}
                    ></Input>
                  </Grid>
                  <Grid item xs={3}>
                    <label htmlFor="slack">
                      <Typography variant="body1" className={classes.profiletext}>Slack</Typography>
                    </label>
                  </Grid>
                  <Grid item xs={9}>
                    <Input
                      type="text"
                      name="slack"
                      id="slack"
                      value={dataState.slack}
                      fullWidth={true}
                      onChange={handleDataChange} className={classes.profiletext}
                    ></Input>
                  </Grid>
                  <hr />
                  <hr />
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button type="submit" variant="outlined" color="primary">
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant="h4">Preferences</Typography>
            <Box className={classes.profilesettings}>
              <Grid container>
                <Grid item xs={9}>
                  <Typography variant="body1" className={classes.profiletext}>
                    Delivery Notifications
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <BlueSwitch
                    checked={switchState.deliverynotifications}
                    onChange={handleSwitchChange}
                    name="deliverynotifications"
                    inputProps={{ "aria-label": "delivery checkbox" }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1" className={classes.profiletext}>
                    End of Activity Notifications
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <BlueSwitch
                    checked={switchState.activitynotifications}
                    onChange={handleSwitchChange}
                    name="activitynotifications"
                    inputProps={{ "aria-label": "activity checkbox" }}
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
