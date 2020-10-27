import React,{useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  btnGroup2: {
    marginTop: 10,
    backgroundColor: "#FFF",
    color: "#2F365F",
    "&:hover": {
      backgroundColor: "#2F365F",
      color: "#FFF",
    },
    marginBottom: 20,
  },
  margenDropdown: {
    marginBottom: "20px",
  },
}));

const FormDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  let newLesson = {
    id: -1,
    name: "",
    items: [],
  };


  const handleClose = (accion) => {
      if (accion === 1) {
      newLesson.id = 0;
      newLesson.name = name;
      props.func(newLesson);
    }
    setOpen(false);
  };

  const onChange = (evt) => {
    setName(evt.target.value);
  }
  const LessonName = () => {
    return name;
  }
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.btnGroup2}
        onClick={handleClickOpen}
      >
        Add Lesson
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a Lesson</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new lesson you must enter a name that identifies it.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={onChange}
          />
        </DialogContent>
        <br></br>
        <DialogActions>
          <Button onClick={() => handleClose(2)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(1)}  color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
