import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import mainLogo from "../../assets/images/conectate_logo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import LinearProgress from "@material-ui/core/LinearProgress";
import { strengthWord, strengthIndicator } from "./PasswordStrengthMeter";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import url from "../../commons";
import axios from "axios";
import AuthService from "../../services/auth.service";
import {
  ConectaTE,
  PlazoletaW,
  ElBobo,
  EdificioML,
  PuenteML,
  CentroDeportivo,
} from "../../assets/images";
import Carousel from "react-material-ui-carousel";
import FatFooter from "../../components/Projects/Layout/FatFooter/FatFooter";

const windowHeight = 1050;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  background: {
    backgroundColor: "rgba(240,255,240, 0.8)",
    minHeight: "90vh",
  },
  appBar: {
    width: "100%",
    height: 67,
    paddingLeft: 20,
    paddingRight: 0,
  },
  mainContent: {
    marginTop: "20px",
    padding: "15px",
  },
  title: {
    flexGrow: 1,
    height: 35,
    margin: "auto",
  },
  carousel: {
    position: "absolute",
    height:windowHeight,
    display:"flex",
    minHeight:"650px",
    top:0,
    marginTop:67,
    zIndex: -2,
    backgroundColor:"black"
  },
  carouselImage:{
    objectFit:"cover",
    height:windowHeight,
    width:"202.5vh",
    minHeight:"650px",
  },
  contentsubtitle: {
    marginTop: "10px",
    fontSize: "22px",
    margin: "auto",
    color: "#888888",
  },
  confirmation: {
    fontSize: "18px",
  },
  mainlogo: {
    marginTop: "30px",
    maxWidth: "30%",
    height: "auto",
    margin: "auto",
  },
  logo: {
    height: 35,
  },
  marginAutoItem: {
    margin: "auto",
  },
  marginAutoLeft: {
    marginLeft: "auto",
    marginRight: "10px",
  },
  marginAutoRight: {
    marginLeft: "10px",
    marginRight: "auto",
  },
  formcontainer: {
    margin: "15px",
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "25ch",
  },
}));

const verifyLength = (lower, upper, length) => {
  if (length < lower || length > upper) {
    return true;
  } else {
    return false;
  }
};

const verifyLettersAndSpaces = (value) => {
  return !new RegExp(/^[a-zA-Z\s]*$/).test(value);
};

const verifyOnlyNumbers = (value) => {
  return !new RegExp(/^\d+$/).test(value);
};

const verifyLettersAndNumbers = (value) => {
  return !new RegExp(/^[a-z0-9]+$/i).test(value);
};

const verifyEmail = (value) => {
  return !new RegExp(/(.+)@(.+){2,}\.(.+){2,}/).test(value);
};

const verify = (prop, values) => {
  switch (prop) {
    case "name":
      return (
        verifyLength(1, 25, values.name.length) ||
        verifyLettersAndSpaces(values.name)
      );
    case "email":
      return (
        verifyLength(1, 50, values.email.length) || verifyEmail(values.email)
      );
    case "mobile":
      return (
        verifyLength(1, 20, values.mobile.length) ||
        verifyOnlyNumbers(values.mobile)
      );
    case "office":
      return (
        verifyLength(1, 20, values.office.length) ||
        verifyLettersAndNumbers(values.office)
      );
    case "role":
      return values.role === "";
    case "birthdate":
      return values.birthdate === "";
    case "password":
      return verifyLength(8, 20, values.password.length);
    case "confirmpassword":
      return values.password !== values.confirmpassword;
    default:
      return false;
  }
};

const disableNext = (step, errors, values) => {
  if (step === 0) {
    return errors.name || errors.email || errors.mobile || errors.office;
  } else if (step === 1) {
    return values.password !== values.confirmpassword;
  } else {
    return false;
  }
};

const changeDateFormat = (date) => {
  var array = date.split("-");
  return array[0] + "/" + array[1] + "/" + array[2];
};

function getSteps() {
  return ["Basic Information", "Set a Password", "Confirmation"];
}

function getStepContent(
  stepIndex,
  values,
  errors,
  roles,
  classes,
  handleChange,
  handleClickShowPassword,
  handleMouseDownPassword
) {
  switch (stepIndex) {
    case 0:
      return (
        <div>
          <TextField
            id="name"
            label="Name"
            placeholder="John Doe"
            error={errors.name}
            variant="outlined"
            margin="normal"
            color="primary"
            helperText="Enter your full name using only letters (without accents) and spaces. Max. 25 characters."
            onChange={handleChange("name")}
            fullWidth
            required
          />
          <TextField
            id="email"
            label="Email"
            placeholder="j.doe1@uniandes.edu.co"
            error={errors.email}
            variant="outlined"
            margin="normal"
            color="primary"
            helperText="Use your Uniandes Email"
            onChange={handleChange("email")}
            fullWidth
            required
          />
          <TextField
            id="mobile"
            label="Mobile Number"
            placeholder="3101001010"
            error={errors.mobile}
            variant="outlined"
            margin="normal"
            color="primary"
            helperText="Enter your mobile number without spaces or special characters. Max. 20 numbers."
            onChange={handleChange("mobile")}
            fullWidth
            required
          />
          <TextField
            id="office"
            label="Office"
            placeholder="ML340"
            error={errors.office}
            variant="outlined"
            margin="normal"
            color="primary"
            helperText="Enter your office code"
            onChange={handleChange("office")}
            fullWidth
            required
          />
          <FormControl variant="outlined" fullWidth required margin="normal">
            <InputLabel id="rolelabel">Role</InputLabel>
            <Select
              labelId="rolelabel"
              id="role"
              value={values.role}
              onChange={handleChange("role")}
              label="Role"
            >
              {roles.map((role) => (
                <MenuItem value={role.id} key={role.id}>
                  {role.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="birthdate"
            label="Birthdate"
            type="date"
            variant="outlined"
            margin="normal"
            color="primary"
            defaultValue="1990-01-01"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange("birthdate")}
            fullWidth
            required
          />
        </div>
      );
    case 1:
      return (
        <div style={{height:windowHeight}}>
          <FormControl variant="outlined" fullWidth required margin="normal">
            <InputLabel htmlFor="outlinepassword">Password</InputLabel>
            <OutlinedInput
              id="outlinepassword"
              label="Password"
              error={errors.password}
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              fullWidth
              required
            />
          </FormControl>

          <LinearProgress
            variant="determinate"
            value={
              values.password === ""
                ? 0
                : (strengthIndicator(values.password) / 6) * 100
            }
          />
          <Typography>
            {values.password === ""
              ? "Use capital letters, numbers and symbols. Min. 8 characters long."
              : strengthWord(strengthIndicator(values.password))}
          </Typography>

          <FormControl
            variant="outlined"
            fullWidth
            required
            margin="normal"
            error={values.password !== values.confirmpassword}
          >
            <InputLabel htmlFor="outlinerepeatpassword">
              Repeat Password
            </InputLabel>
            <OutlinedInput
              id="outlinerepeatpassword"
              label="Repeat Password"
              type={values.showPassword ? "text" : "password"}
              value={values.confirmpassword}
              onChange={handleChange("confirmpassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              fullWidth
              required
            />
          </FormControl>
        </div>
      );
    case 2:
      return (
        <div>
          <Typography className={classes.confirmation}>
            Please verify that your data is correct:
          </Typography>
          <Grid container direction="row">
            <Grid item xs={6}>
              <Grid container direction="column">
                <Typography>Name</Typography>
                <Typography>Email</Typography>
                <Typography>Mobile Number</Typography>
                <Typography>Office</Typography>
                <Typography>Role</Typography>
                <Typography>Birthdate</Typography>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column">
                <Typography>{values.name}</Typography>
                <Typography>{values.email}</Typography>
                <Typography>{values.mobile}</Typography>
                <Typography>{values.office}</Typography>
                <Typography>
                  {
                    roles[roles.findIndex((role) => role.id === values.role)]
                      .title
                  }
                </Typography>
                <Typography>{values.birthdate}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    default:
      return "Unknown stepIndex";
  }
}

const Signup = (props) => {
  const classes = useStyles();

  const [roles, setRoles] = React.useState([]);

  useEffect(() => {
    axios.get(url + "/roles").then((result) => {
      const temproles = [];
      result.data.data.forEach((role) => {
        temproles.push(role);
      });
      setRoles(temproles);
      setValues({ ...values, ["role"]: temproles[0].id });
    });
  }, []);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [values, setValues] = React.useState({
    name: "",
    email: "",
    mobile: "",
    office: "",
    role: "",
    birthdate: "1990/01/01",
    password: "",
    confirmpassword: "",
    showPassword: false,
  });

  const [errors, setErrors] = React.useState({
    name: true,
    email: true,
    mobile: true,
    office: true,
    role: true,
    birthdate: true,
    password: true,
    confirmpassword: true,
  });

  const handleChange = (prop) => (event) => {
    if (prop === "birthdate") {
      setValues(
        { ...values, [prop]: changeDateFormat(event.target.value) },
        setErrors({ ...errors, [prop]: verify(prop, values) })
      );
    } else {
      setValues(
        { ...values, [prop]: event.target.value },
        setErrors({ ...errors, [prop]: verify(prop, values) })
      );
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      AuthService.register(
        values.name,
        values.email,
        values.password,
        values.mobile,
        values.office,
        values.birthdate,
        values.role
      )
        .then((response) => {
          console.log(response);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          props.loginHandler();
          props.history.push("/projects");
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const gotoLogin = () => {
    props.history.push("/login");
  };

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

  return (
    <div className={classes.root} style={{height:windowHeight}}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item xs={12} className={classes.title}>
              <img className={classes.logo} src={mainLogo} alt="Project Logo" />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container justify="center" className={classes.background}>
      <CarouselBackground/>
        <Grid item xs={6}>
          <Grid container justify="center" direction="column">
            <img
              className={classes.mainlogo}
              src={ConectaTE}
              alt="Project Logo"
            />
            <Typography className={classes.contentsubtitle}>
              Register with your Uniandes email. It only takes a minute.
            </Typography>
          </Grid>
          <Card elevation={3} className={classes.mainContent}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className={classes.formcontainer}>
              {activeStep === steps.length ? (
                <Grid container direction="column">
                  <Typography align="center">
                    Registration complete. You will be redirected shortly.
                  </Typography>
                  <Button
                    onClick={gotoLogin}
                    variant="contained"
                    color="primary"
                    className={classes.marginAutoItem}
                  >
                    Log In
                  </Button>
                </Grid>
              ) : (
                <div>
                  {getStepContent(
                    activeStep,
                    values,
                    errors,
                    roles,
                    classes,
                    handleChange,
                    handleClickShowPassword,
                    handleMouseDownPassword
                  )}
                  <br />
                  <Grid container alignContent="center">
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.marginAutoLeft}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled={disableNext(activeStep, errors, values)}
                      className={classes.marginAutoRight}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Grid>
                </div>
              )}
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} style={{marginTop:110,backgroundColor: "rgb(240,255,240)"}} >
        <FatFooter/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
