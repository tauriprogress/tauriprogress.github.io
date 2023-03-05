import React from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import FilterContainer from "../FilterContainer";

import { getDifficultiesFromRaids } from "../../helpers";

import { guildProgressionSetFilter } from "../../redux/actions";

import {
    guildProgressionFilterSelector,
    environmentRealmsSelector,
    environmentDifficultyNamesSelector,
    environmentRaidsSelector,
} from "../../redux/selectors";

function GuildProgressionFilter() {
    const { filter, difficultyNames, raids } = useSelector(
        (state) => ({
            filter: guildProgressionFilterSelector(state),
            realms: environmentRealmsSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
            raids: environmentRaidsSelector(state),
        }),
        shallowEqual
    );

    const difficulties = getDifficultiesFromRaids(raids);

    const selects = getSelects({
        filter,
        difficulties,
        raids,
        difficultyNames,
    });

    const dispatch = useDispatch();

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

function getSelects({ filter, difficulties, raids, difficultyNames }) {
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

    return selects;
}

export default GuildProgressionFilter;
