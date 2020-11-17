import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AssignmentIcon from "@material-ui/icons/Assignment";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    marginRight: 20,
    marginBottom: 0,
    paddingBottom: 0,
    width: "100%",
  },
  content: {
    marginLeft: 40,
  },
  sectionTitle: {
    marginBottom: 0,
  },
  paper: {
    padding: "6px 16px",
    display: "inline-block",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  timeLabel: {
    marginTop: 12,
    flex: 0.08,
  },
}));

const OverviewActivity = (props) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        {props.activityData.map((day, i) => {
          return (
            <React.Fragment key={day.date + i}>
              <Typography variant="subtitle1" className={classes.content}>
                {day.date}
              </Typography>
              <Timeline>
                {day.logItems.map((activityLogItem, index) => {
                  return (
                    <TimelineItem
                      key={activityLogItem.eventLogPrimaryText + index}
                    >
                      <TimelineOppositeContent className={classes.timeLabel}>
                        <Typography variant="body2" color="textSecondary">
                          {activityLogItem.hour}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color="primary">
                          <AssignmentIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper elevation={3} className={classes.paper}>
                          <Typography variant="subtitle2">
                            {activityLogItem.eventLogPrimaryText}
                          </Typography>
                          <Typography variant="body2">
                            {activityLogItem.eventLogSecondaryText !== ""
                              ? activityLogItem.eventLogSecondaryText
                              : null}
                          </Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </Timeline>
            </React.Fragment>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default OverviewActivity;
