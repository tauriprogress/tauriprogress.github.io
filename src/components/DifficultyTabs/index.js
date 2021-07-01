import React from "react";
import { useSelector } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function DifficultyTabs({ options, selected, onChange }) {
    const difficultyNames = useSelector(
        state => state.environment.difficultyNames
    );

    return (
        <Tabs
            onChange={onChange}
            value={selected}
            variant="fullWidth"
            style={{
                width: `${80 * options.length}px`,
                maxWidth: `calc(100vw)`
            }}
        >
            {options.map(difficulty => (
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
