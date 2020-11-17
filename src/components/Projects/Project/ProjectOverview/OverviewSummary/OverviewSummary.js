import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Badge from "@material-ui/core/Badge";

import { Doughnut } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 40,
    marginTop: 25,
    marginRight: 30,
  },
  courseText: {
    fontWeight: 500,
  },
  tabs: {
    marginLeft: 40,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  tasks: {
    order: 2,
    [theme.breakpoints.up("lg")]: {
      order: 1,
      borderRight: "2px solid #e8e8e8",
    },
  },
  digest: {
    order: 1,
    [theme.breakpoints.up("lg")]: {
      order: 2,
    },
  },
  weeks: {
    order: 3,
    [theme.breakpoints.up("lg")]: {
      borderRight: "2px solid #e8e8e8",
    },
  },
}));

const OverviewSummary = (props) => {
  //Styles for the page
  const classes = useStyles();

  //Donut config
  const options = {
    title: {
      display: false,
    },

    legend: {
      labels: {
        boxWidth: 13,
      },
      display: true,
      position: "left",
      fontSize: 20,
      onClick: (e, item) => {
        //alert(`Item with text ${item.text} and index ${item.index} clicked`);
      },
      onHover: (e, item) => {
        if (e && e.target) {
          e.target.style.cursor = "pointer";
        }
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6} className={classes.tasks}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Items
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Mine
                    </Typography>
                    <Doughnut
                      data={props.myItemsData}
                      options={options}
                      width={100}
                      height={60}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      All Items
                    </Typography>
                    <Doughnut
                      data={props.allItemsData}
                      options={options}
                      width={100}
                      height={60}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={6} className={classes.digest}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Digest
                </Typography>
                <Paper elevation={3}>
                  <List>
                    <ListItem
                      button
                      onClick={() => {
                        props.handleChange(null, 1);
                      }}
                    >
                      <ListItemText primary="Items created recently" />
                      <Badge color="secondary" badgeContent={3}>
                        <AssignmentIcon color="action" />
                      </Badge>
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        props.handleChange(null, 1);
                      }}
                    >
                      <ListItemText primary="Items updated recently" />
                      <Badge color="secondary" badgeContent={4}>
                        <AssignmentTurnedInIcon color="action" />
                      </Badge>
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        props.handleChange(null, 1);
                      }}
                    >
                      <ListItemText primary="Unreaded notifications" />
                      <Badge color="secondary" badgeContent={0}>
                        <NotificationsActiveIcon color="action" />
                      </Badge>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Breakdown
                </Typography>
                <Paper elevation={3}>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>User</TableCell>
                          <TableCell align="right">Registered Items</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.breakdownData.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.items}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={6} className={classes.weeks}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Weeks
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Mine
                    </Typography>
                    <Doughnut
                      data={props.myWeeksData}
                      options={options}
                      width={100}
                      height={60}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      All Weeks
                    </Typography>
                    <Doughnut
                      data={props.allWeeksData}
                      options={options}
                      width={100}
                      height={60}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OverviewSummary;
