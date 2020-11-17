import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar1 from "../../../../../assets/images/img_avatar.png";
import Avatar2 from "../../../../../assets/images/img_avatar2.png";
import { Edit, Delete, RateReview, PinDropRounded } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import {
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import axios from "axios";
import urlBackend from "../../../../../commons";
import authHeader from "../../../../../services/auth-header";
import { withRouter } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2F365F",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    marginRight: 20,
    marginBottom: 0,
    paddingBottom: 0,
    width: "100%",
  },
  table: {
    minWidth: 700,
  },
  avatar: {
    height: "35px",
    width: "35px",
    borderRadius: "50%",
    margin: "5px",
    padding: 0,
  },
  button: {
    margin: theme.spacing(1),
    backGroundColor: "#2F365F",
    marginLeft: "auto",
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const PeoplePeople = (props) => {
  const classes = useStyles();

  const [roles, setRoles] = useState([]);

  const [role, setRole] = useState("");

  const [modalEditar, setModalEditar] = useState(false);

  const [modalInsertar, setModalInsertar] = useState(false);

  const [idPersona, setIdPersona] = useState("");

  const [modalEliminar, setModalEliminar] = useState(false);

  const [participantesCurso, setParticipantesCurso] = useState([]);

  useEffect(() => {
    // GET ROLES: urlBackend + "/roles"
    axios
      .get(urlBackend + "/roles", {
        headers: authHeader(),
      })
      .then((response) => {
        const responseRoles = response.data.data;
        setRoles(responseRoles);
      });
  }, []);

  useEffect(() => {
    const currentParticipants = props.datosBack.map(
      (participant) => participant.id
    );
    setParticipantesCurso(currentParticipants);
  }, []);

  const peticionGetCursos = () => {
    abrirCerrarModalEliminar();
    axios
      .get(urlBackend + "/courses/" + props.match.params.id, {
        headers: authHeader(),
      })
      .then((response) => {
        const cursos = response.data;
        peticionPutCursos(cursos);
      });
  };

  const peticionPutCursos = (cursos) => {
    let cursoModificado = {
      name: cursos.name,
      code: cursos.code,
      description: cursos.description,
      participantsIds: participantesCurso.filter(
        (participante) => participante !== idPersona
      ),
      courseStatusId: cursos.courseStatusId,
      programId: cursos.programId,
    };
    axios
      .put(urlBackend + "/courses/" + props.match.params.id, cursoModificado, {
        headers: authHeader(),
      })
      .then((response) => {
        const newdatosBack = props.datosBack.filter(
          (participant) => participant.id !== idPersona
        );
        props.setDatosBack(newdatosBack);
      });
  };

  const peticionModificarRol = () => {
    abrirCerrarModalEditar();
    const datosTemp = props.datosBack;
    const datosTempFiltradoPorIdUsuario = datosTemp.filter(
      (persona) => persona.id === idPersona
    );
    const rolesFiltrados = roles.filter((rol) => rol.title === role);
    let personaRolModificado = {
      name: datosTempFiltradoPorIdUsuario.name,
      email: datosTempFiltradoPorIdUsuario.email,
      mobile: datosTempFiltradoPorIdUsuario.mobile,
      office: datosTempFiltradoPorIdUsuario.office,
      birthdate: datosTempFiltradoPorIdUsuario.birthdate,
      roleId: rolesFiltrados[0].id,
    };
    axios
      .put(urlBackend + "/users/" + idPersona, personaRolModificado, {
        headers: authHeader(),
      })
      .then((response) => {
        const datosTempActualizar = props.datosBack;
        datosTempActualizar.forEach((usuario) => {
          //console.log(usuario.email);
          if (usuario.email === datosTempFiltradoPorIdUsuario[0].email) {
            usuario.Role.title = rolesFiltrados[0].title;
          }
        });
        console.log(datosTempActualizar);
        props.setDatosBack([...datosTempActualizar]);
      });
  };

  const handleChangeIdPersona = (pIdPersona) => {
    setIdPersona(pIdPersona);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        <Button
          onClick={abrirCerrarModalInsertar}
          style={{ display: "flex" }}
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<GroupAddIcon />}
        >
          Add people
        </Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Mobile</StyledTableCell>
                <StyledTableCell align="center">Office</StyledTableCell>
                <StyledTableCell align="center">Role</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.datosBack.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">
                    {row.name === "Luisa Martinez" ? (
                      <img
                        src={Avatar2}
                        className={classes.avatar}
                        alt="Logo"
                      />
                    ) : (
                      <img
                        src={Avatar1}
                        className={classes.avatar}
                        alt="Logo"
                      />
                    )}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.mobile}</StyledTableCell>
                  <StyledTableCell align="center">{row.office}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Role.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Edit
                      id={row.Role.id}
                      className={classes.iconos}
                      onClick={() => {
                        abrirCerrarModalEditar();
                        handleChangeIdPersona(row.id);
                      }}
                    />
                    &nbsp;&nbsp;
                    <Delete
                      className={classes.iconos}
                      id={row.Role.id}
                      onClick={() => {
                        abrirCerrarModalEliminar();
                        handleChangeIdPersona(row.id);
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Dialog
        aria-labelledby="form-dialog-title"
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        <DialogTitle id="form-dialog-title">Add People</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new people you must enter the information required below.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            label="Search people by email"
          />
        </DialogContent>
        <br></br>
        <DialogActions>
          <Button onClick={abrirCerrarModalInsertar} color="primary">
            Cancel
          </Button>
          <Button color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        aria-labelledby="form-dialog-title"
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        <DialogTitle id="form-dialog-title">Edit People</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can only edit people's roles
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              onChange={handleChangeRole}
            >
              {roles.map((rol) => (
                <MenuItem key={rol.id} value={rol.title}>
                  {rol.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <br></br>
        <DialogActions>
          <Button onClick={abrirCerrarModalEditar} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => peticionModificarRol()}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        aria-labelledby="form-dialog-title"
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        <DialogTitle id="form-dialog-title">
          Delete People from Project
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this person from the project?
          </DialogContentText>
        </DialogContent>
        <br></br>
        <DialogActions>
          <Button onClick={abrirCerrarModalEliminar} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => peticionGetCursos()}>
            Yes, I am sure
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default withRouter(PeoplePeople);
