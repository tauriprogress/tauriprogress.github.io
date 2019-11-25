import {
    realms,
    specs,
    specToClass,
    characterClasses
} from "tauriprogress-constants";

import React from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import { withTheme, withStyles } from "@material-ui/core/styles";

const styles = {
    root: {
        width: "150px"
    }
};

const StyledSelect = withStyles(styles)(Select);

let realmNames = [];
for (let realmKey in realms) {
    realmNames.push(realms[realmKey]);
}

function Filters({
    filter,
    changeFilter,
    theme: {
        palette: { classColors, factionColors }
    }
}) {
    let specOptions = [];

    for (let specId in specToClass) {
        if (specToClass[specId] === Number(filter.class)) {
            specOptions.push({
                id: specId,
                label: specs[specId].label
            });
        }
    }

    let classOptions = [];
    for (let classId in characterClasses) {
        classOptions.push({
            id: classId,
            label: characterClasses[classId]
        });
    }

    return (
        <div className="globalFilterStyles">
            <FormControl className="globalFilterStylesFormControl">
                <InputLabel htmlFor="realm">Server</InputLabel>
                <StyledSelect
                    value={filter.realm}
                    onChange={e =>
                        changeFilter({
                            filterName: "realm",
                            value: e.target.value
                        })
                    }
                    inputProps={{
                        name: "realm",
                        id: "realm"
                    }}
                    className="globalFilterStylesSelect"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {realmNames.map(realm => (
                        <MenuItem key={realm} value={realm}>
                            {realm}
                        </MenuItem>
                    ))}
                </StyledSelect>
            </FormControl>
            <FormControl className="globalFilterStylesFormControl">
                <InputLabel htmlFor="faction">Faction</InputLabel>
                <StyledSelect
                    value={filter.faction}
                    onChange={e =>
                        changeFilter({
                            filterName: "faction",
                            value: e.target.value
                        })
                    }
                    style={{
                        color:
                            filter.faction === 0
                                ? factionColors.alliance
                                : factionColors.horde
                    }}
                    inputProps={{
                        name: "faction",
                        id: "faction"
                    }}
                    className="globalFilterStylesSelect"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem
                        style={{
                            color: factionColors.alliance
                        }}
                        value={0}
                    >
                        Alliance
                    </MenuItem>
                    <MenuItem
                        style={{
                            color: factionColors.horde
                        }}
                        value={1}
                    >
                        Horde
                    </MenuItem>
                </StyledSelect>
            </FormControl>

            <FormControl className="globalFilterStylesFormControl">
                <InputLabel htmlFor="class">Class</InputLabel>
                <StyledSelect
                    style={{
                        color: classColors[filter.class]
                    }}
                    value={filter.class}
                    onChange={e =>
                        changeFilter({
                            filterName: "class",
                            value: e.target.value
                        })
                    }
                    inputProps={{
                        name: "class",
                        id: "class"
                    }}
                    className="globalFilterStylesSelect"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {classOptions.map(characterClass => (
                        <MenuItem
                            key={characterClass.id}
                            value={characterClass.id}
                            style={{
                                color: classColors[characterClass.id]
                            }}
                        >
                            {characterClass.label}
                        </MenuItem>
                    ))}
                </StyledSelect>
            </FormControl>
            <FormControl className="globalFilterStylesFormControl">
                <InputLabel htmlFor="spec">Spec</InputLabel>
                <StyledSelect
                    style={{
                        color: classColors[filter.class]
                    }}
                    value={filter.spec}
                    onChange={e =>
                        changeFilter({
                            filterName: "spec",
                            value: e.target.value
                        })
                    }
                    inputProps={{
                        name: "spec",
                        id: "spec"
                    }}
                    className="globalFilterStylesSelect"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {specOptions.map(specOption => (
                        <MenuItem
                            style={{
                                color: classColors[filter.class]
                            }}
                            key={specOption.id}
                            value={specOption.id}
                        >
                            {specOption.label}
                        </MenuItem>
                    ))}
                </StyledSelect>
            </FormControl>
        </div>
    );
}

export default withTheme()(Filters);
