import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  addButton: {
    width: "200px",
    marginBottom: 20,
    marginLeft: 28,
    backgroundColor: "#2F365F",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#FFF",
      color: "#2F365F",
    },
  },
  addIcon: {
    paddingRight: 5,
    paddingBottom: 2,
    marginBottom: 1,
  },
}));

const FormDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const [status, setStatus] = React.useState("");

  const [statName, setStatName] = React.useState("");
  const [statNumber, setStatNumber] = React.useState(0);
  const [statStatus, setStatStatus] = React.useState("");
  const [statGoals, setStatGoals] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log(event);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  let newWeek = {
    number: -1,
    name: "",
    status: "",
    objectives: [],
  };

  const handleClose = (accion) => {
    if (accion === 1) {
      newWeek.number = parseInt(statNumber);
      newWeek.name = statName;
      let newObjective = { description: "" };
      newObjective.description = statGoals;
      newWeek.objectives.push(newObjective);
      newWeek.status = statStatus;

      props.func(newWeek);
    }
    setOpen(false);
  };

  const handleChangeNumber = (event) => {
    setStatNumber(event.target.value);
  };

  const handleChangeName = (event) => {
    setStatName(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatStatus(event.target.value);
  };

  const handleChangeGoals = (event) => {
    setStatGoals(event.target.value);
  };

  return (
    <div>
      <Button
        className={classes.addButton}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        type="submit"
      >
        <AddIcon className={classes.addIcon} /> Add Week
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <DialogTitle id="form-dialog-title">Add New Week</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new week you must enter the information required in the
            fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="number"
            label="Week number"
            type="text"
            fullWidth
            onChange={handleChangeNumber}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={handleChangeName}
          />
          <Select
            value={status}
            onChange={handleChangeStatus}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>
              Status
            </MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
          </Select>
          <TextField
            autoFocus
            margin="dense"
            id="goals"
            label="Goals"
            type="text"
            fullWidth
            onChange={handleChangeGoals}
          />
        </DialogContent>
        <br></br>
        <DialogActions>
          <Button onClick={() => handleClose(2)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(1)} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
