import { difficultyLabels } from "tauriprogress-constants";

import React from "react";
import { Tabs, Tab } from "@material-ui/core";

function SelectDifficulty({ difficulty, onChange }) {
    return (
        <Tabs
            onChange={onChange}
            value={difficulty}
            textColor="primary"
            variant="fullWidth"
            style={{ width: "170px" }}
        >
            <Tab
                value={5}
                indicatorColor="secondary"
                label={difficultyLabels[5]}
            />
            <Tab
                value={6}
                indicatorColor="secondary"
                label={difficultyLabels[6]}
            />
        </Tabs>
    );
}

export default SelectDifficulty;
