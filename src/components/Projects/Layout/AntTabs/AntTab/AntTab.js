import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 15,
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    paddingBottom: theme.spacing(0),
    marginRight: theme.spacing(1),
    fontFamily: ["Roboto", "sans-serif"].join(","),

    "&$selected": {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  selected: {},
}))((props) => <Tab {...props} />);

export default AntTab;
