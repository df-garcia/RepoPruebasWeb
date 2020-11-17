import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ProjectsCard from "./ProjectsCard/ProjectsCard";
import url from "../../../commons";
import axios from "axios";

import authHeader from "../../../services/auth-header";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  content: {
    width: "100%",
  },
  icon: {
    marginTop: "10px",
  },
  categoriesmenu: {
    background: "#f3f3f3",
    padding: "10px",
    minHeight: "100vh",
  },
  categoriesheader: {
    textAlign: "center",
    marginTop: "15px",
    marginBottom: "5px",
    paddingTop: "5px",
    paddingBottom: "25px",
    fontSize: 30,
  },
  category: {
    background: "#f3f3f3",
    "&:hover": {
      background: "#2f365f",
      color: "#ffffff",
    },
  },
  categorytext: {
    fontSize: 20,
    marginLeft: "10px",
  },
  coursetitle: {
    fontSize: 40,
    paddingTop: "15px",
    paddingLeft: "15px",
  },
  courselist: {
    padding: "15px",
  },
}));

const ProjectsGrid = (props) => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(url + "/courses/userCourses", {
        headers: authHeader(),
      })
      .then((result) => {
        //console.log(result.data.data);
        setData(result.data.data);
        const tempcategories = [];
        result.data.data.forEach((course) => {
          //console.log(course);
          if (
            tempcategories.filter((e) => e.name === course.Program.code)
              .length === 0
          ) {
            tempcategories.push({ name: course.Program.code, quantity: 1 });
          } else {
            tempcategories.find(
              (e) => e.name === course.Program.code
            ).quantity += 1;
          }
        });
        //console.log(tempcategories);
        setCategories(tempcategories);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container direction="row" alignItems="stretch">
        <Grid item xs={2} className={classes.categoriesmenu}>
          <Typography variant="h5" className={classes.categoriesheader}>
            Categories
          </Typography>
          {categories.map((category) => (
            <Grid container className={classes.category} key={category.name}>
              <Grid item xs={10}>
                <Typography variant="body1" className={classes.categorytext}>
                  {category.name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" className={classes.categorytext}>
                  {category.quantity}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={10}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.coursetitle}>
                Courses
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.courselist}>
            {data.map((course) => (
              <ProjectsCard data={course} parentprops={props} key={course.id} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectsGrid;
