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
}));

const PeoplePeople = (props) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Teams</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Mobile</StyledTableCell>
                <StyledTableCell align="center">Office</StyledTableCell>
                <StyledTableCell align="center">Role</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.datosBack.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell>
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
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.role + "s"}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.mobile}</StyledTableCell>
                  <StyledTableCell align="center">{row.office}</StyledTableCell>
                  <StyledTableCell align="center">{row.role}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default PeoplePeople;
