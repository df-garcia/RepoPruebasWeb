import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import mainLogo from "../../../../assets/images/conectate_logo.png";
import avatarImg from "../../../../assets/images/avatar.jpg";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import NotificationsIcon from "@material-ui/icons/Notifications";

import AuthService from "../../../../services/auth.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    width: "100%",
    height: 67,
    paddingLeft: 20,
    paddingRight: 0,
  },
  title: {
    flexGrow: 1,
    height: 35,
  },
  logo: {
    height: 35,
  },
  icon: {
    margin: 10,
    fontSize: 28,
  },
  avatar: {
    margin: 10,
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  menuItems: {
    marginRight: 10,
    flexGrow: 1,
  },
  menuAvatarButton: {
    margin: 5,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

const LayoutToolbar = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [stateMenu, setStateMenu] = useState({
    isOpen: false,
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setStateMenu({
      isOpen: true,
    });
  };

  const handleClose = () => {
    setStateMenu({
      isOpen: false,
    });
  };

  const handleRoute = (route) => {
    props.history.push(route);
  };

  const handleLogout = () => {
    AuthService.logout();
    props.history.go(0);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.title}>
            <img className={classes.logo} src={mainLogo} alt="Project Logo" />
          </div>
          {/*<SearchIcon className={classes.icon} />*/}
          <AddIcon className={classes.icon} />
          <NotificationsIcon className={classes.icon} />
          <IconButton
            className={classes.menuAvatarButton}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar
              alt="User Avatar"
              className={classes.avatar}
              src={avatarImg}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            getContentAnchorEl={null}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={stateMenu.isOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleRoute("/profile")}>
              <Typography className={classes.menuItems}>Profile</Typography>
              <AccountCircleIcon />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <Typography className={classes.menuItems}>Logout</Typography>
              <ExitToAppIcon />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(LayoutToolbar);
