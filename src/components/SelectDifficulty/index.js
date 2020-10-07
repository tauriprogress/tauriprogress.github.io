import React from "react";

import { withStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function styles(theme) {
    return {
        tabs: {
            width: "160px"
        }
    };
}

function SelectDifficulty({ classes, difficulty, onChange }) {
    return (
        <Tabs
            onChange={onChange}
            value={difficulty}
            variant="fullWidth"
            className={classes.tabs}
        >
            <Tab value={5} label={"10 HC"} className={classes.tab} />
            <Tab value={6} label={"25 HC"} className={classes.tab} />
        </Tabs>
    );
}

export default withStyles(styles)(SelectDifficulty);
