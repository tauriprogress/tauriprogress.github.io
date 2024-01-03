import React from "react";
import { useSelector } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { environmentDifficultyNamesSelector } from "../../redux/selectors";

function DifficultyTabs({ options, selected, onChange, ...props }) {
    const difficultyNames = useSelector(environmentDifficultyNamesSelector);

    return (
        <Tabs
            onChange={onChange}
            value={selected}
            variant="scrollable"
            textColor="secondary"
            indicatorColor="secondary"
            {...props}
        >
            {options.map((difficulty) => (
                <Tab
                    key={difficulty}
                    value={difficulty}
                    label={difficultyNames[difficulty]}
                />
            ))}
        </Tabs>
    );
}

export default DifficultyTabs;
