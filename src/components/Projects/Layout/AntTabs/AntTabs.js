import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
    flexGrow: 1,
    width: "100%",
  },
  indicator: {
    backgroundColor: "#2F365F",
  },
})((props) => <Tabs {...props} />);

export default AntTabs;
