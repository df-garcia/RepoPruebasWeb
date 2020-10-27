import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    display: "inline-block",
  },
  content: {
    width: "100%",
  },
  icon: {
    marginTop: "10px",
  },
  coursecard: {
    background: "#dadcec",
    margin: "5px",
  },
  coursecontent: {
    padding: "15px",
    paddingTop: "0px",
  },
  coursetitle: {
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  coursedescription: {
    marginBottom: "15px",
  },
  taglist: {
    whiteSpace: "nowrap",
    marginBottom: "15px",
  },
  tagitem: {
    display: "inline-block",
    minWidth: "100",
  },
  tagcontent: {
    marginRight: "5px",
    marginBottom: "5px",
    padding: "3px",
    background: "#ffffff",
    borderRadius: "10px",
    "&:hover": {
      background: "#778899",
      cursor: "pointer",
      color: "#ffffff",
    },
  },
  descriptiontext: {
    fontSize: 17,
  },
  avatarpurple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const ProjectsCard = (props) => {
  const classes = useStyles();
  const goToProject = () => {
    props.parentprops.history.push("/projects/" + props.data._id);
  };

  return (
    <Grid item xs={3} className={classes.root}>
      <Card elevation={3} className={classes.coursecard}>
        <CardHeader
          className={classes.courseheader}
          title={
            <Link onClick={goToProject} className={classes.coursetitle}>
              {props.data.name}
            </Link>
          }
        />
        <Grid container direction="column" className={classes.coursecontent}>
          <Grid item xs={12}>
            <Grid container direction="row" className={classes.taglist}>
              <Grid item className={classes.tagitem}>
                <Typography
                  variant="body1"
                  className={classes.tagcontent}
                  align="center"
                >
                  {props.data.program}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.coursedescription}>
            <Typography
              variant="body2"
              align="justify"
              className={classes.descriptiontext}
            >
              {props.data.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AvatarGroup max={6} spacing="medium">
              {props.data.participants.map((member) => (
                <Tooltip
                  arrow
                  title={
                    <Typography variant="caption">{member.name}</Typography>
                  }
                  key={member.name}
                >
                  <Avatar alt={member.name} className={classes.avatarpurple}>
                    {member.name.substring(0, 2)}
                  </Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ProjectsCard;
