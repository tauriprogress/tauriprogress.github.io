import React from "react";
import { useSelector } from "react-redux";

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

function DifficultyTabs({ classes, options, selected, onChange }) {
    const difficultyNames = useSelector(
        state => state.environment.difficultyNames
    );
    return (
        <Tabs
            onChange={onChange}
            value={selected}
            variant="fullWidth"
            className={classes.tabs}
        >
            {options.map(difficulty => (
                <Tab
                    key={difficulty}
                    value={difficulty}
                    label={difficultyNames[difficulty]}
                    className={classes.tab}
                />
            ))}
        </Tabs>
    );
}

export default withStyles(styles)(DifficultyTabs);
