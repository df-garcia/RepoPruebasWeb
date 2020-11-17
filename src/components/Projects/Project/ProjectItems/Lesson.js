import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import videoImg from "../../../../assets/images/video.png";
import textImg from "../../../../assets/images/text.png";
import audioImg from "../../../../assets/images/audio.png";
import AddItem from "../../utils/Modals/ModalAgregarItem";

const Lesson = (props) => {
  const [items, setItems] = useState(props.lesson.items);
  const [open, setOpen] = React.useState(false);

  const useStyles = makeStyles((theme) => ({
    title: {
      textAlign: "center",
      fontWeight: 500,
      marginBottom: 8,
      marginTop: 20,
    },
    accordion: {
      padding: 20,
    },
  }));

  const funcNewItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const classes = useStyles();

  let cardItems = [];
  let videoType = "";

  if (items != null) {
    items.map((item, i) => {
      let img = textImg;
      if (item.itemType.itemType === "Video") {
        videoType = "Video type: " + item.itemType.additionalInfo;
        img = videoImg
      }
      if (item.itemType.itemType === "Audio") {
        img = audioImg
      }
      cardItems.push(
        <div key={i}>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
                <img src={img} width="80" style={{marginRight:"2%", objectFit:"cover"}}/>
              <Typography className={classes.title} variant="h5">
                { (i+1) + "." + item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container>
            <Grid item xs={6}>
              <Typography>{item.description}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography color="textSecondary">
                  {"Type: " + item.itemType.itemType}
                </Typography>
                <Typography color="textSecondary">{videoType}</Typography>
                <Typography color="textSecondary">
                  {"Expected length: " + item.duration + " minutes"}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography color="textSecondary">
                  {"Expected dedication time: " + item.dedication + " minutes"}
                </Typography>
                <Typography color="textSecondary">
                  {"Status: " + item.status}
                </Typography>
              </Grid>
            </Grid>
            </AccordionDetails>
            <AccordionDetails>
              <Grid container >
                <Typography variant="h6" style={{ marginBottom: 20 }}>
                  {"In charge: "}
                </Typography>
                <Grid container justify="center" alignItems="center" direction="row" spacing={2}>
                  <Typography key={i} color="textSecondary">
                    {item.responsables.map((p, i) => (
                        <span style={{padding:20}} key={i}>{"⚫"+p.name}</span>
                    ))}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
      );
      videoType = "";
    });
  }
  return <Container maxWidth="xl"> <AddItem func={funcNewItem}/>{cardItems}</Container>;
};
export default Lesson;
