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
import Container from "@material-ui/core/Container";

import { withTheme, withStyles } from "@material-ui/core/styles";

let realmNames = [];
for (let realmKey in realms) {
    realmNames.push(realms[realmKey]);
}

function styles(theme) {
    return {
        formControl: {
            margin: `0 ${theme.spacing(1)}px`
        },
        container: {
            padding: 0,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
        }
    };
}

function Filters({
    classes,
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
        <Container className={classes.container}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="realm">Server</InputLabel>
                <Select
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
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {realmNames.map(realm => (
                        <MenuItem key={realm} value={realm}>
                            {realm}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="faction">Faction</InputLabel>
                <Select
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
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="class">Class</InputLabel>
                <Select
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
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="spec">Spec</InputLabel>
                <Select
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
                </Select>
            </FormControl>
        </Container>
    );
}

export default withStyles(styles)(withTheme(Filters));
