import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
    width: "100%",
  },
}));

const footers = [
  {
    title: "Uniandes",
    description: [
      "Uniandes Web Page",
      "News",
      "Multimedia",
      "Facebook",
      "Twitter",
    ],
    links: [
      "https://www.uniandes.edu.co",
      "https://uniandes.edu.co/noticias/",
      "https://uniandes.edu.co/multimedia/",
      "https://www.facebook.com/pages/Universidad-de-los-Andes/312867483159",
      "https://twitter.com/Uniandes",
    ],
  },
  {
    title: "Conecta-TE",
    description: [
      "Conecta-TE Web Page",
      "Conecta-TE News",
      "Conecta-TE Events",
    ],
    links: [
      "https://conectate.uniandes.edu.co/",
      "https://conectate.uniandes.edu.co/index.php/noticias",
      "https://conectate.uniandes.edu.co/index.php/eventos",
    ],
  },
  {
    title: "MISO",
    description: ["MISO Web Page", "ABET", "Twitter"],
    links: [
      "https://sistemas.uniandes.edu.co/es/miso",
      "https://sistemas.uniandes.edu.co/es/isis-pregrado/general-pregrado/abet",
      "https://twitter.com/DISCuniandes",
    ],
  },
  {
    title: "Coursera",
    description: ["Coursera", "Uniandes in Coursera", "MISO in Coursera"],
    links: [
      "https://es.coursera.org/",
      "https://www.coursera.org/uniandes",
      "https://www.coursera.org/degrees/maestria-ingenieria-software-uniandes",
    ],
  },
];

export default function Pricing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Footer */}
      <Container component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item, index) => (
                  <li key={item}>
                    <Link
                      href={footer.links[index]}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
