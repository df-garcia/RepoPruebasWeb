import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    maxWidth: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginBottom: "10px",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
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
  noLabel: {
    marginTop: theme.spacing(3),
  },
  btnGroup: {
    marginTop: 10,
    backgroundColor: "#FFF",
    color: "#2F365F",
    "&:hover": {
      backgroundColor: "#2F365F",
      color: "#FFF",
    },
    marginBottom: 20,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "José Bocanegra",
  "Carlos Marín",
  "Rubby Casallas",
  "Violeta Caro",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FormDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const theme = useTheme();
  const [responsible, setResponsible] = React.useState([]);

  const handleChangeResponsible = (event) => {
    setResponsible(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setResponsible(value);
  };

  const [itemType, setItemType] = React.useState("");

  //Function to handle the changes on the appbar
  const handleChangeItemType = (event) => {
    setItemType(event.target.value);
  };

  const [status, setStatus] = React.useState("");

  const [sCode, setSCode] = React.useState("");
  const [sName, setSName] = React.useState("");
  const [sDesc, setSDesc] = React.useState("");
  const [sType, setSType] = React.useState("");
  const [sLength, setSLength] = React.useState("");
  const [sDed, setSDed] = React.useState("");
  const [sStatus, setSStatus] = React.useState("");
  const [sPeople, setSPeople] = React.useState([]);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  let newItem = {
    itemType: {
      itemType: "",
    },
    responsables: [],
    code: "",
    title: "",
    description: "",
    duration: 0,
    dedication: 0,
    status: "",
  };

  const handleClose = (accion) => {
    if (accion === 1) {
      newItem.itemType.itemType = sType;
      let resp = {
        name: sPeople[0],
      };
      newItem.responsables.push(resp);
      newItem.code = sCode;
      newItem.title = sName;
      newItem.description = sDesc;
      newItem.duration = sLength;
      newItem.dedication = sDed;
      newItem.status = sStatus;

      console.log(newItem);
      props.func(newItem);
    }
    setOpen(false);
  };

  const handleChangeCode = (event) => {
    setSCode(event.target.value);
  };

  const handleChangeName = (event) => {
    setSName(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setSDesc(event.target.value);
  };

  const handleChangeType = (event) => {
    setSType(event.target.value);
  };

  const handleChangeLength = (event) => {
    setSLength(event.target.value);
  };

  const handleChangeDed = (event) => {
    setSDed(event.target.value);
  };

  const handleChangeStatus2 = (event) => {
    setSStatus(event.target.value);
  };

  const handleChangePeople = (event) => {
    setSPeople(event.target.value);
  };

  return (
    <div>
      <Button
        className={classes.btnGroup2}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Add Item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new item you must enter the information required below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Code"
            type="text"
            fullWidth
            onChange={handleChangeCode}
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
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            onChange={handleChangeDesc}
          />
          <Select
            value={itemType}
            onChange={handleChangeType}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>
              Item type
            </MenuItem>
            <MenuItem value={"Reading"}>Reading</MenuItem>
            <MenuItem value={"Video"}>Video</MenuItem>
          </Select>
          <br></br>
          <div>
            {itemType == "Video" ? (
              <TextField
                autoFocus
                margin="dense"
                id="videoType"
                label="Video Type"
                type="text"
                fullWidth
              />
            ) : null}
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="expectedLength"
            label="Expected Item Length"
            type="text"
            fullWidth
            onChange={handleChangeLength}
          />
          <TextField
            autoFocus
            margin="dense"
            id="expectedDedication"
            label="Expected Student Dedication time"
            type="text"
            fullWidth
            onChange={handleChangeDed}
          />
          <Select
            value={status}
            onChange={handleChangeStatus2}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="" disabled>
              Status
            </MenuItem>
            <MenuItem value={"Remove from Coursera"}>
              Remove from Coursera
            </MenuItem>
            <MenuItem value={"En edición"}>En edición</MenuItem>
            <MenuItem value={"En Plataforma"}>En Plataforma</MenuItem>
            <MenuItem value={"Escaleta en construccion"}>
              Escaleta en construccion
            </MenuItem>
            <MenuItem value={"Listo para montaje"}>Listo para montaje</MenuItem>
            <MenuItem value={"Para Revisión"}>Para Revisión</MenuItem>
            <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
            <MenuItem value={"Escaleta en construcción"}>
              Escaleta en construcción
            </MenuItem>
          </Select>
          <br></br>
          <Select
            multiple
            displayEmpty
            className={classes.selectEmpty}
            value={responsible}
            onChange={handleChangePeople}
            input={<Input />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return "People in Charge";
              }

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              People in Charge
            </MenuItem>
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, responsible, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
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
