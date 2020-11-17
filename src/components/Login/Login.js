import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SimpleToolbar from "../Projects/Layout/LayoutToolbar/SimpleToolbar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  ConectaTE,
  PlazoletaW,
  ElBobo,
  EdificioML,
  PuenteML,
  CentroDeportivo,
} from "../../assets/images";
import Carousel from "react-material-ui-carousel";
import AuthService from "../../services/auth.service";
import FatFooter from "../../components/Projects/Layout/FatFooter/FatFooter";
const ReactDOM = require("react-dom");

const Login = (props) => {
  let [err, setErr] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  let [userPassword, setUserPassword] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [loginError, setLoginError] = useState("none");
  let [emailError, setEmailError] = useState({ error: false, helper: "" });
  let [passwordError, setPasswordError] = useState(false);

  const handleChangeEmail = (event) => {
    setUserEmail(event.target.value);
    if (
      !RegExp(/(.+)@(.+){2,}\.(.+){2,}/).test(event.target.value) &&
      event.target.value != ""
    ) {
      setEmailError({ error: true, helper: "Invalid email" });
    } else {
      setEmailError({ error: false, helper: "" });
    }
  };

  const handleChangePassword = (event) => {
    setUserPassword(event.target.value);
    setPasswordError("");
  };

  const login = (email, password) => {
    setIsLoading(true);
    AuthService.login(email, password)
      .then((response) => {
        setIsLoading(false);
        props.loginHandler();
        props.history.push("/projects");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response.data.message);
        setLoginError("");
        setEmailError({ ...emailError, [emailError.error]: true });
        setPasswordError(true);
        setErr(error.response.data.message);
      });
  };

  const windowsHeight = 1000;
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    carousel: {
      position: "absolute",
      height:windowsHeight,
      display:"flex",
      minHeight:"650px",
      top:0,
      zIndex: -2,
    },
    rootContainer: {
      backgroundColor: "rgba(240,255,240, 0.8)",
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
      width: "50%",
      alignContent: "center",
    },
    carouselImage:{
      objectFit:"cover",
      height:windowsHeight,
      width:"202.5vh",
      minHeight:"650px",
    },
  });

  function CarouselBackground() {
    let images = [PlazoletaW,  ElBobo,
      EdificioML,
      PuenteML,
      CentroDeportivo];
    let items = []
    images.map(image=>{
      items.push(
        <img
        className={classes.carouselImage}
        src={image}
      />
      );
    })
    return (
      <Carousel
        className={classes.carousel}
        animation="fade"
        navButtonsAlwaysInvisible={true}
        indicators={false}
        timeout={2000}
      >
        {items}
      </Carousel>
    );
  }

  const classes = useStyles();
  return (
    <div>
      <Grid container alignItems="center" className={classes.rootContainer}>
      <SimpleToolbar />
      <Grid container style={{height:"100vh"}}>
      <CarouselBackground/>
      {err ? (
        <Alert variant="filled" severity="error">
          {err}
        </Alert>
      ) : null}
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center">
            <Card className={(classes.root, classes.card)}>
              <CardContent className={classes.cardContent}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Log in
                  {isLoading ? (
                    <CircularProgress size={30} style={{ marginLeft: 350 }} />
                  ) : null}
                </Typography>

                <Divider />
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ marginTop: 15 }}
                >
                  Email address
                </Typography>
                <TextField
                  className={classes.textField}
                  error={emailError.error}
                  helperText={emailError.helper}
                  name="emailField"
                  id="email"
                  label="Enter email"
                  variant="outlined"
                  fullWidth
                  value={userEmail}
                  onChange={handleChangeEmail}
                />
                <Typography variant="h5" component="h2">
                  Password
                </Typography>
                <TextField
                  error={passwordError}
                  className={classes.textField}
                  name="passwordField"
                  id="password"
                  label="Enter password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={userPassword}
                  onChange={handleChangePassword}
                />
                <CardActions>
                  <Grid container>
                    <Grid item xs={12}>
                      <Box display={loginError}>
                        <Typography color="error">
                          Invalid email or password
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid container>
                      <Grid item xs={6}>
                        <Button
                          onClick={() => login(userEmail, userPassword)}
                          variant="contained"
                          color="primary"
                          style={{ marginTop: 10 }}
                        >
                          Log In
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="h6"
                          component="h6"
                          style={{ marginTop: 10 }}
                        >
                          <a href="https://cuenta.uniandes.edu.co/Cuenta2/">
                            Forgot your password?
                          </a>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardActions>
              </CardContent>
            </Card>
            <Hidden only={["sm", "xs"]}>
              <Container className={classes.image} direction="column">
                <Grid item xs={12}>
                  <img
                    src={ConectaTE}
                    alt="ConectaTE Logo"
                    width="50%"
                    style={{ marginLeft: "20%" }}
                  />
                </Grid>
              </Container>
            </Hidden>
          </Grid>
        </Grid>
        </Grid>
        <Grid container xs={12} style={{backgroundColor: "rgb(240,255,240)"}}>
          <FatFooter />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
