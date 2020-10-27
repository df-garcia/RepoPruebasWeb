import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

export default function TypesMenu(props) {
  const useStyles = makeStyles((theme) => ({
    factcard: {
      backgroundColor: "#3d5a5b",
    },
    facttext: {
      color: "#ffffff",
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (status) => {
    props.update(status);
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <div>
      <Card
        elevation={3}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.factcard}
      >
        <CardContent align="center">
          <Typography
            variant="overline"
            gutterBottom
            className={classes.facttext}
          >
            item type
          </Typography>
          <br />
          <Typography
            variant="caption"
            gutterBottom
            className={classes.facttext}
          >
            {props.state}
          </Typography>
        </CardContent>
      </Card>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose("Activity");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Activity
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Audio");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Audio
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Codelab");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Codelab
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Questionary");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Questionary
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Download");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Download
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Forum");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Forum
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("IVQ");
          }}
        >
          <Typography variant="caption" gutterBottom>
            IVQ
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Lecture");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Lecture
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("MOOC");
          }}
        >
          <Typography variant="caption" gutterBottom>
            MOOC
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Project");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Project
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Rhyme");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Rhyme
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Video");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Video
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
