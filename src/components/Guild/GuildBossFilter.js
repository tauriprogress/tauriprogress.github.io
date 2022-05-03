import React from "react";

import { characterSpecClass } from "tauriprogress-constants";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import withTheme from "@mui/styles/withTheme";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import FilterContainer from "../FilterContainer";

import { getRealmNames } from "../../helpers";

import { guildProgressionSetFilter } from "../../redux/actions";

import {
    guildProgressionFilterSelector,
    environmentRealmsSelector,
    environmentCharacterSpecsSelector,
    environmentCharacterClassNamesSelector,
    environmentDifficultyNamesSelector,
    environmentRaidsSelector,
} from "../../redux/selectors";

function GuildProgressionFilter({ theme }) {
    const {
        filter,
        realms,
        specs,
        characterClassNames,
        difficultyNames,
        raids,
    } = useSelector(
        (state) => ({
            filter: guildProgressionFilterSelector(state),
            realms: environmentRealmsSelector(state),
            specs: environmentCharacterSpecsSelector(state),
            characterClassNames: environmentCharacterClassNamesSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
            raids: environmentRaidsSelector(state),
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
        palette: { classColors },
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
                        color: classColor,
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
            name: "boss",
            options: raids
                .reduce(
                    (acc, curr) =>
                        curr.name === filter.raid ? curr.bosses : acc,
                    []
                )
                .map((boss) => ({
                    value: boss.name,
                    name: boss.name,
                })),
        },
        {
            name: "difficulty",
            options: difficulties.map((difficulty) => ({
                value: difficulty,
                name: difficultyNames[difficulty],
            })),
        },
    ];

    return (
        <FilterContainer>
            {selects.map((select) => (
                <FormControl key={select.name}>
                    <InputLabel>{select.name}</InputLabel>
                    <Select
                        label={select.name}
                        style={select.style}
                        value={filter[select.name]}
                        onChange={(e) =>
                            dispatch(
                                guildProgressionSetFilter({
                                    filterName: select.name,
                                    value: e.target.value,
                                })
                            )
                        }
                        inputProps={{
                            name: select.name,
                            id: select.name,
                        }}
                    >
                        {select.options.map((option) => (
                            <MenuItem
                                key={option.name}
                                value={option.value}
                                style={option.style}
                            >
                                <span>{option.name}</span>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ))}
        </FilterContainer>
    );
}

export default withTheme(GuildProgressionFilter);
