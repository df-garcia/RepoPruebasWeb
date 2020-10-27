import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SimpleToolbar from "../Projects/Layout/LayoutToolbar/SimpleToolbar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import ConectaTE from "../../assets/images/ConectaTE.png";

const Login = (props) => {
  const login = () => {
    props.loginHandler();
    props.history.push("/projects");
  };

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    card: {
      width: "35%",
      marginLeft: "10%",
      marginTop: "7%",
      minWidth: 365,
    },
    cardContent: {
      padding: 30,
    },
    title: {
      fontSize: 30,
    },
    pos: {
      marginBottom: 12,
    },
    textField: {
      marginBottom: 10,
      marginTop: 10,
    },
    image: {
      width : "50%",
      alignContent: "center"
    },
    imgCenter: {
    }
  });

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div style={{backgroundColor: "rgba(240,255,240, 0.8)", height: "100vh"}}>
      <SimpleToolbar />
      <Grid container direction="row" alignItems="center">
        <Card className={(classes.root, classes.card)}>
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Log in
            </Typography>
            <hr />
            <Typography variant="h5" component="h2">
              Email address
            </Typography>
            <TextField
              className={classes.textField}
              name="lessonName"
              id="standard-helperText"
              label="Enter email"
              variant="outlined"
              fullWidth
            />
            <Typography variant="h5" component="h2">
              Password
            </Typography>
            <TextField
              className={classes.textField}
              name="lessonName"
              id="standard-helperText"
              label="Enter password"
              variant="outlined"
              fullWidth
            />
            <CardActions>
              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <Typography variant="h6" component="h6" style={{ marginTop: 4 }}>
                Stay signed
              </Typography>
              <Box>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ marginTop: 4, marginLeft: 80 }}
                >
                  <a href="https://cuenta.uniandes.edu.co/Cuenta2/">
                    Forgot your password?
                  </a>
                </Typography>
              </Box>
            </CardActions>
            <Button
              onClick={login}
              variant="contained"
              color="primary"
              style={{ marginTop: 30 }}
            >
              Log In
            </Button>
          </CardContent>
        </Card>
        <Hidden only={['sm', 'xs']}>
        <Grid className={classes.image} direction="column">
          <img src={ConectaTE} width="50%" style={{marginLeft:"20%"}}/>
        </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

export default Login;
