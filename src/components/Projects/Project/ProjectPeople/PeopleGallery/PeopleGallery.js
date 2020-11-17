import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
//import tileData from "./tileData";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

// The example data is structured as follows:

const tileData = [
  {
    img:
      "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396__340.jpg",
    title: "Image",
    author: "author",
    cols: 2,
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2016/01/19/17/53/writing-1149962__340.jpg",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2016/02/07/21/03/computer-1185626__340.jpg",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2017/08/01/00/38/laptop-2562325__340.jpg",
    title: "Image",
    author: "author",
    cols: 1,
  },

  {
    img:
      "https://media.istockphoto.com/photos/office-responsive-devices-web-design-website-picture-id1201166649?b=1&k=6&m=1201166649&s=170667a&w=0&h=vVKqI4JKcOWJQhVEFzkCH6egqoArWKOdBNZMGcvm5lo=",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://media.istockphoto.com/photos/code-picture-id157527725?b=1&k=6&m=157527725&s=170667a&w=0&h=n8yOOoA-18eiFWeAZp8WWUAV4LmFxz6FPDlL8x_ZS78=",
    title: "Image",
    author: "author",
    cols: 1,
  },
  {
    img:
      "https://media.istockphoto.com/photos/web-development-picture-id520707642?b=1&k=6&m=520707642&s=170667a&w=0&h=NdB4_01sPpMBPzlPVI5DWCkLR4lP3TbiWpTQSKc4_24=",
    title: "Image",
    author: "author",
    cols: 2,
  },
];

export default function PeopleGallery() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
