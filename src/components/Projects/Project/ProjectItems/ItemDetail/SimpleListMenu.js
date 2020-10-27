import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (status) => {
    props.update(status);
    setAnchorEl(null);
  };

  return (
    <div>
      <Card
        elevation={3}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <CardContent align="center">
          <Typography variant="overline" gutterBottom>
            state
          </Typography>
          <br />
          <Typography variant="caption" gutterBottom>
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
            handleClose("Pending");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Pending
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("On platform");
          }}
        >
          <Typography variant="caption" gutterBottom>
            On platform
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Editing");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Editing
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Under construction");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Under construction
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("Ready to upload");
          }}
        >
          <Typography variant="caption" gutterBottom>
            Ready to upload
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose("For review");
          }}
        >
          <Typography variant="caption" gutterBottom>
            For review
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
