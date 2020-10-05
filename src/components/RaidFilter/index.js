import React from "react";

import { characterSpecToClass } from "tauriprogress-constants";
import { useSelector, useDispatch } from "react-redux";

import { withTheme, withStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import CollapseableFilterContainer from "../FilterContainer/CollapseableFilterContainer";

import { getRealmNames } from "../../helpers";

import { setRaidFilter } from "../../redux/actions";

function styles(theme) {
    return {
        capitalize: {
            textTransform: "capitalize"
        }
    };
}

function RaidFilter({ classes, theme }) {
    const {
        filter,
        realms,
        specs,
        characterClassNames,
        difficultyNames,
        difficulties
    } = useSelector(state => ({
        filter: state.raid.filter,
        realms: getRealmNames(state.environment.realms),
        specs: state.environment.specs,
        characterClassNames: state.environment.characterClassNames,
        difficultyNames: state.environment.difficultyNames,
        difficulties: state.environment.currentContent.raids.reduce(
            (acc, raid) => {
                for (const difficulty of raid.difficulties) {
                    if (!acc.includes(difficulty)) {
                        acc.push(difficulty);
                    }
                }
                return acc;
            },
            []
        )
    }));
    const dispatch = useDispatch();

    const {
        palette: { classColors, factionColors }
    } = theme;

    let specOptions = [];
    const classColor = filter.class
        ? classColors[filter.class].text
        : "inherit";
    for (let specId in characterSpecToClass) {
        if (characterSpecToClass[specId] === Number(filter.class)) {
            specOptions.push({
                value: specId,
                name: specs[specId].label,
                style: {
                    color: classColors[filter.class].text
                }
            });
        }
    }

    let classOptions = [];
    for (let classId in characterClassNames) {
        classOptions.push({
            value: classId,
            name: characterClassNames[classId],
            style: {
                color: classColors[classId].text
            }
        });
    }

    let realmOptions = [];
    for (let realm of realms) {
        realmOptions.push({
            value: realm,
            name: realm
        });
    }
    let selects = [
        {
            name: "faction",
            style: {
                color:
                    filter.faction === 0
                        ? factionColors.alliance
                        : factionColors.horde
            },
            options: [
                {
                    value: 0,
                    name: "alliance",
                    style: {
                        color: factionColors.alliance
                    }
                },
                {
                    value: 1,
                    name: "horde",
                    style: {
                        color: factionColors.horde
                    }
                }
            ]
        },
        {
            name: "class",
            style: {
                color: classColor
            },
            options: classOptions
        },
        {
            name: "spec",
            style: {
                color: classColor
            },
            options: specOptions
        },
        {
            name: "role",
            options: [
                {
                    value: "damage",
                    name: "damage"
                },
                {
                    value: "heal",
                    name: "heal"
                },
                {
                    value: "tank",
                    name: "tank"
                }
            ]
        }
    ];

    if (realmOptions.length > 1) {
        selects.unshift({
            name: "realm",
            options: realmOptions
        });
    }

    selects.unshift({
        name: "difficulty",
        options: difficulties.map(difficulty => ({
            value: difficulty,
            name: difficultyNames[difficulty]
        }))
    });

    return (
        <CollapseableFilterContainer>
            {selects.map(select => (
                <FormControl key={select.name}>
                    <InputLabel htmlFor="class" className={classes.capitalize}>
                        {select.name}
                    </InputLabel>
                    <Select
                        style={select.style}
                        value={filter[select.name]}
                        onChange={e =>
                            dispatch(
                                setRaidFilter({
                                    filterName: select.name,
                                    value: e.target.value
                                })
                            )
                        }
                        inputProps={{
                            name: select.name,
                            id: select.name
                        }}
                        className={classes.capitalize}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {select.options.map(option => (
                            <MenuItem
                                key={option.name}
                                value={option.value}
                                style={option.style}
                                className={classes.capitalize}
                            >
                                <span>{option.name}</span>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ))}
        </CollapseableFilterContainer>
    );
}

export default withStyles(styles)(withTheme(RaidFilter));