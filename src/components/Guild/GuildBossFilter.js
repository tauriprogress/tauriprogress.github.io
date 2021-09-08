import React from "react";

import { characterSpecToClass } from "tauriprogress-constants";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { withTheme, withStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import CollapseableFilterContainer from "../FilterContainer/CollapseableFilterContainer";

import { getRealmNames } from "../../helpers";

import { guildProgressionSetFilter } from "../../redux/actions";

import { guildProgressionFilterSelector } from "../../redux/guild/selectors";

function styles(theme) {
    return {
        capitalize: {
            textTransform: "capitalize"
        }
    };
}

function GuildProgressionFilter({ classes, theme }) {
    const {
        filter,
        realms,
        specs,
        characterClassNames,
        difficultyNames,
        raids
    } = useSelector(
        state => ({
            filter: guildProgressionFilterSelector(state),
            realms: state.environment.realms,
            specs: state.environment.specs,
            characterClassNames: state.environment.characterClassNames,
            difficultyNames: state.environment.difficultyNames,
            raids: state.environment.currentContent.raids
        }),
        shallowEqual
    );

    const difficulties = raids.reduce((acc, raid) => {
        for (const difficulty of raid.difficulties) {
            if (!acc.includes(difficulty)) {
                acc.push(difficulty);
            }
        }
        return acc;
    }, []);

    const realmNames = getRealmNames(realms);

    const dispatch = useDispatch();

    const {
        palette: { classColors }
    } = theme;

    let specOptions = [];
    const classColor = filter.class
        ? classColors[filter.class].text
        : "inherit";
    for (let specId in characterSpecToClass) {
        if (characterSpecToClass[specId] === Number(filter.class)) {
            if (specs[specId]) {
                specOptions.push({
                    value: specId,
                    name: specs[specId].label,
                    style: {
                        color: classColors[filter.class].text
                    }
                });
            }
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
    for (let realm of realmNames) {
        realmOptions.push({
            value: realm,
            name: realm
        });
    }
    let selects = [
        {
            name: "raid",
            options: raids.map(raid => ({
                value: raid.name,
                name: raid.name
            }))
        },
        {
            name: "boss",
            options: raids
                .reduce(
                    (acc, curr) =>
                        curr.name === filter.raid ? curr.bosses : acc,
                    []
                )
                .map(boss => ({
                    value: boss.name,
                    name: boss.name
                }))
        },
        {
            name: "difficulty",
            options: difficulties.map(difficulty => ({
                value: difficulty,
                name: difficultyNames[difficulty]
            }))
        },
        {
            name: "class",
            style: {
                color: classColor
            },
            options: [
                {
                    value: "",
                    name: "all"
                },
                ...classOptions
            ]
        },
        {
            name: "spec",
            style: {
                color: classColor
            },
            options: [
                {
                    value: "",
                    name: "all"
                },
                ...specOptions
            ]
        },
        {
            name: "role",
            options: [
                {
                    value: "",
                    name: "all"
                },
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

    return (
        <CollapseableFilterContainer defaultState={true}>
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
                                guildProgressionSetFilter({
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

export default withStyles(styles)(withTheme(GuildProgressionFilter));
