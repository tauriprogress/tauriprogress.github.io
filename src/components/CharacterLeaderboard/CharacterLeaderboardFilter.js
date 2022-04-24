import React from "react";

import { characterSpecClass } from "tauriprogress-constants";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import withTheme from '@mui/styles/withTheme';
import withStyles from '@mui/styles/withStyles';

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import CollapseableFilterContainer from "../FilterContainer/CollapseableFilterContainer";

import { getRealmNames } from "../../helpers";

import { characterLeaderboardSetFilter } from "../../redux/actions";
import {
    characterLeaderboardFilterSelector,
    environmentCharacterSpecsSelector,
    environmentRealmsSelector,
    environmentCharacterClassNamesSelector,
    environmentDifficultyNamesSelector,
    environmentRaidsSelector,
} from "../../redux/selectors";

function styles(theme) {
    return {
        capitalize: {
            textTransform: "capitalize",
        },
    };
}

function CharacterLeaderboardFilter({ classes, theme }) {
    const {
        filter,
        realms,
        specs,
        characterClassNames,
        difficultyNames,
        raids,
    } = useSelector(
        (state) => ({
            filter: characterLeaderboardFilterSelector(state),
            realms: environmentRealmsSelector(state),
            specs: environmentCharacterSpecsSelector(state),
            characterClassNames: environmentCharacterClassNamesSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
            raids: environmentRaidsSelector(state),
        }),
        shallowEqual
    );

    const realmNames = getRealmNames(realms);
    const difficulties = raids.reduce((acc, raid) => {
        for (const difficulty of raid.difficulties) {
            if (!acc.includes(difficulty)) {
                acc.push(difficulty);
            }
        }
        return acc;
    }, []);

    const dispatch = useDispatch();

    const {
        palette: { classColors, factionColors },
    } = theme;
    let specOptions = [];
    const classColor = filter.class
        ? classColors[filter.class].text
        : "inherit";
    for (let specId in characterSpecClass) {
        if (characterSpecClass[specId] === Number(filter.class)) {
            if (specs[specId]) {
                specOptions.push({
                    value: specId,
                    name: specs[specId].label,
                    style: {
                        color: classColors[filter.class].text,
                    },
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
                color: classColors[classId].text,
            },
        });
    }

    let realmOptions = [];
    for (let realm of realmNames) {
        realmOptions.push({
            value: realm,
            name: realm,
        });
    }
    let selects = [
        {
            name: "raid",
            options: raids.map((raid) => ({
                value: raid.name,
                name: raid.name,
            })),
        },
        {
            name: "difficulty",
            options: difficulties.map((difficulty) => ({
                value: difficulty,
                name: difficultyNames[difficulty],
            })),
        },
        {
            name: "faction",
            style: {
                color:
                    filter.faction === 0
                        ? factionColors.alliance
                        : factionColors.horde,
            },
            options: [
                { value: "", name: "all" },
                {
                    value: 0,
                    name: "alliance",
                    style: {
                        color: factionColors.alliance,
                    },
                },
                {
                    value: 1,
                    name: "horde",
                    style: {
                        color: factionColors.horde,
                    },
                },
            ],
        },
        {
            name: "class",
            style: {
                color: classColor,
            },
            options: [
                {
                    value: "",
                    name: "all",
                },
                ...classOptions,
            ],
        },
    ];

    if (realmOptions.length > 1) {
        selects.splice(2, 0, {
            name: "realm",
            options: [
                {
                    value: "",
                    name: "all",
                },
                ...realmOptions,
            ],
        });
    }

    return (
        <CollapseableFilterContainer defaultState={true}>
            {selects.map((select) => (
                <FormControl key={select.name}>
                    <InputLabel htmlFor="class" className={classes.capitalize}>
                        {select.name}
                    </InputLabel>
                    <Select
                        style={select.style}
                        value={filter[select.name]}
                        onChange={(e) =>
                            dispatch(
                                characterLeaderboardSetFilter({
                                    filterName: select.name,
                                    value: e.target.value,
                                })
                            )
                        }
                        inputProps={{
                            name: select.name,
                            id: select.name,
                        }}
                        className={classes.capitalize}
                    >
                        {select.options.map((option) => (
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

export default withStyles(styles)(withTheme(CharacterLeaderboardFilter));
