import React, { useEffect } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import withTheme from "@mui/styles/withTheme";

import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { getFactionImg, getRealmNames } from "../../helpers";

import {
    closeFilterWithQuery,
    guildLeaderboardSetFilter,
    initFilterWithQuery,
} from "../../redux/actions";
import {
    environmentDifficultyNamesSelector,
    environmentRaidsSelector,
    environmentRealmsSelector,
    guildLeaderboardFilterSelector,
} from "../../redux/selectors";

import FilterContainer from "../FilterContainer";

export const FILTER_TYPE_GUILD_LB = "FILTER_TYPE_GUILD_LB";

function GuildLeaderboardFilter({ theme }) {
    const { filter, realms, difficultyNames, raids } = useSelector(
        (state) => ({
            filter: guildLeaderboardFilterSelector(state),
            realms: environmentRealmsSelector(state),
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

    useEffect(() => {
        dispatch(initFilterWithQuery(FILTER_TYPE_GUILD_LB));
        return () => dispatch(closeFilterWithQuery());
    }, [dispatch]);

    const {
        palette: { factionColors },
    } = theme;

    let realmOptions = [];
    for (let realm of realmNames) {
        realmOptions.push({
            value: realm,
            name: realm,
        });
    }
    let selects = [
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
                    imageSrc: getFactionImg(0),
                    value: 0,
                    name: "alliance",
                    style: {
                        color: factionColors.alliance,
                    },
                },
                {
                    imageSrc: getFactionImg(1),
                    value: 1,
                    name: "horde",
                    style: {
                        color: factionColors.horde,
                    },
                },
            ],
        },
    ];

    if (realmOptions.length > 1) {
        selects.push({
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

    if (raids.length > 1) {
        selects.unshift({
            name: "raid",
            options: raids.map((raid) => ({
                value: raid.name,
                name: raid.name,
            })),
        });
    }

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
                                guildLeaderboardSetFilter({
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
                                {option.imageSrc && (
                                    <Avatar
                                        src={option.imageSrc}
                                        variant="small"
                                    />
                                )}
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ))}
        </FilterContainer>
    );
}

export default withTheme(GuildLeaderboardFilter);
