import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import SimpleListMenu from "./SimpleListMenu";
import EditIcon from "@material-ui/icons/Edit";
import ItemTypesMenu from "./ItemTypesMenu";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 40,
    marginTop: 25,
    width: "100%",
  },
  courseText: {
    fontWeight: 500,
  },
  infocards: {
    marginTop: 15,
    marginBottom: 15,
  },
  pinkcard: {
    backgroundColor: "#febeb0",
  },
  infoleft: {
    marginLeft: 15,
  },
  infotitle: {
    marginTop: 10,
  },
  reply: {
    paddingLeft: 70,
  },
  factcard: {
    backgroundColor: "#3d5a5b",
  },
  facttext: {
    color: "#ffffff",
  },
  icon: {
    height: 15,
    width: 15,
  },
  iconcover: {
    height: 30,
    width: 30,
  },
  addbtn: {
    marginLeft: 5,
    height: 30,
    width: 30,
    marginBottom: 5,
  },
}));

const ItemDetail = (props) => {
  //Styles for the page
  const classes = useStyles();

  const [item, setItem] = React.useState(props.detail);

  const setstatus = (stat) => {
    setItem({ ...item, status: stat });
  };

  const settype = (tipo) => {
    if (tipo === "Video") {
      setItem({
        ...item,
        itemType: {
          itemType: tipo,
          additionalInfo: "Chroma",
        },
      });
    } else {
      setItem({
        ...item,
        itemType: {
          itemType: tipo,
        },
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
      let data = item.comments;
      data.push({
        content: event.target.value,
        publicationDate: moment().format("MM/DD/YYYY"),
        author: {
          _id: "5f965bf1c9f94a083af3d09c",
          name: "Juan Arango",
          email: "user2@test.com",
          role: "professor",
          __v: 0,
        },
      });
      setItem({ ...item, comments: data });
      event.target.value = null;
    }
  };

  const handleEditTitle = (event) => {
    let temp = event.target;
    temp.contentEditable = true;
    setTimeout(function () {
      temp.contentEditable = false;
      setItem({ ...item, title: temp.innerText });
    }, 7000);
  };

  const handleEditDescription = (event) => {
    let temp = event.target;
    temp.contentEditable = true;
    setTimeout(function () {
      temp.contentEditable = false;
      setItem({ ...item, description: temp.innerText });
    }, 8000);
  };

  const deletelink = (link) => {
    const data = item.links.filter((l) => l !== link);
    setItem({ ...item, links: data });
  };

  const deleteparticipant = (part) => {
    const data = item.responsables.filter((l) => l.name !== part);
    setItem({ ...item, responsables: data });
  };

  const links = item.links.map((link) => {
    return (
      <ListItem key={link}>
        <Typography variant="body2">
          <Link href={link} component="button" variant="body2">
            {link}
          </Link>
        </Typography>
        <ListItemSecondaryAction>
          <IconButton
            edge="start"
            aria-label="delete"
            className={classes.iconcover}
          >
            <EditIcon className={classes.icon} />
          </IconButton>
          <IconButton
            edge="start"
            aria-label="delete"
            className={classes.iconcover}
            onClick={() => {
              deletelink(link);
            }}
          >
            <DeleteIcon className={classes.icon} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });

  const participants = item.responsables.map((participante) => {
    return (
      <ListItem key={participante._id}>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <Typography variant="body2">{participante.name}</Typography>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            className={classes.iconcover}
            onClick={() => {
              deleteparticipant(participante.name);
            }}
          >
            <DeleteIcon className={classes.icon} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });

  const comments = item.comments.map((comment) => {
    return (
      <div>
        <ListItem alignItems="flex-start" key={comment.content}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {comment.content}
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {comment.publicationDate}
                </Typography>
                {" — "}
                {comment.author.name}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    );
  });

  return (
    <Grid container>
      <Grid item xs={3} className={classes.root}>
        <Card elevation={3} className={classes.pinkcard}>
          <CardContent>
            <Typography
              variant="button"
              display="block"
              gutterBottom
              className={classes.infotitle}
            >
              created by
            </Typography>
            <div className={classes.infoleft}>
              <Typography variant="body2" display="block" gutterBottom>
                Santiago Bolaños Vega
              </Typography>
            </div>
            <Divider />
            <Typography
              variant="button"
              display="block"
              gutterBottom
              className={classes.infotitle}
            >
              date
            </Typography>
            <Typography
              variant="body2"
              display="block"
              gutterBottom
              className={classes.infoleft}
            >
              Wed 9th September 2020
            </Typography>
            <Divider />
            <Typography
              variant="button"
              display="block"
              gutterBottom
              className={classes.infotitle}
            >
              last update by
            </Typography>
            <div className={classes.infoleft}>
              <Typography variant="body2" display="block" gutterBottom>
                Nicolas Potes García
              </Typography>
            </div>
            <Divider />
            <Typography
              variant="button"
              display="block"
              gutterBottom
              className={classes.infotitle}
            >
              last update date
            </Typography>
            <Typography
              variant="body2"
              display="block"
              gutterBottom
              className={classes.infoleft}
            >
              Wed 9th September 2020
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8} className={classes.root}>
        <Typography
          variant="h5"
          className={classes.courseText}
          display="inline"
          onDoubleClick={handleEditTitle}
        >
          {item.title}
          <Typography variant="overline" gutterBottom display="inline">
            &nbsp;&nbsp;&nbsp;&nbsp;{item.code}
          </Typography>
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          onDoubleClick={handleEditDescription}
        >
          {item.description}
        </Typography>
        <Divider />
        <Grid
          container
          spacing={2}
          justify="center"
          className={classes.infocards}
        >
          <Grid item xs={2}>
            <SimpleListMenu
              className={classes.statebtn}
              state={item.status}
              update={setstatus}
            ></SimpleListMenu>
          </Grid>
          <Grid item xs={2}>
            <ItemTypesMenu
              state={item.itemType.itemType}
              update={settype}
            ></ItemTypesMenu>
          </Grid>
          {item.itemType.additionalInfo && (
            <Grid item xs={2}>
              <Card elevation={3} className={classes.factcard}>
                <CardContent align="center">
                  <Typography
                    variant="overline"
                    className={classes.facttext}
                    gutterBottom
                  >
                    video type
                  </Typography>
                  <br />
                  <Typography
                    variant="caption"
                    className={classes.facttext}
                    gutterBottom
                  >
                    {item.itemType.additionalInfo}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          <Grid item xs={2}>
            <Card elevation={3} className={classes.factcard}>
              <CardContent align="center">
                <Typography
                  variant="overline"
                  className={classes.facttext}
                  gutterBottom
                >
                  duration
                </Typography>
                <br />
                <Typography
                  variant="caption"
                  className={classes.facttext}
                  gutterBottom
                >
                  {item.duration} min
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card elevation={3} className={classes.factcard}>
              <CardContent align="center">
                <Typography
                  variant="overline"
                  className={classes.facttext}
                  gutterBottom
                >
                  dedication
                </Typography>
                <br />
                <Typography
                  variant="caption"
                  className={classes.facttext}
                  gutterBottom
                >
                  {item.dedication} min
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              className={classes.courseText}
              display="inline"
            >
              Item Links
            </Typography>
            <IconButton
              edge="start"
              aria-label="delete"
              className={(classes.iconcover, classes.addbtn)}
              display="inline"
            >
              <AddIcon className={classes.icon} />
            </IconButton>
            <div className={classes.demo}>
              <List>{links}</List>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              className={classes.courseText}
              display="inline"
            >
              Participants
            </Typography>
            <IconButton
              edge="start"
              aria-label="delete"
              className={(classes.iconcover, classes.addbtn)}
              display="inline"
            >
              <AddIcon className={classes.icon} />
            </IconButton>
            <div className={classes.demo}>
              <List>{participants}</List>
            </div>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.courseText}>
              Comments
            </Typography>
          </Grid>
        </Grid>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <TextField
              id="outlined-basic"
              label="New comment"
              variant="outlined"
              fullWidth
              onKeyPress={handleKeyPress}
            />
          </ListItem>
          {comments}
        </List>
      </Grid>
    </Grid>
  );
};

export default ItemDetail;
