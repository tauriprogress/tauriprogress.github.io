import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import withTheme from "@mui/styles/withTheme";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import FilterContainer from "../FilterContainer";

import { getRealmNames } from "../../helpers";

import {
    environmentDifficultyNamesSelector,
    environmentDifficultiesSelector,
    environmentRealmsSelector,
} from "../../redux/selectors";

function GuildListFilter({ theme, filter, setFilter }) {
    const realms = getRealmNames(useSelector(environmentRealmsSelector));

    const { difficulties, difficultyNames } = useSelector(
        (state) => ({
            difficulties: environmentDifficultiesSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
        }),
        shallowEqual
    );

    return (
        <FilterContainer>
            {realms.length > 1 && (
                <FormControl>
                    <InputLabel>Realm</InputLabel>
                    <Select
                        label={"Realm"}
                        value={filter.realm}
                        onChange={(e) =>
                            setFilter({
                                ...filter,
                                realm: e.target.value,
                            })
                        }
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {realms.map((realmName) => (
                            <MenuItem key={realmName} value={realmName}>
                                {realmName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <FormControl>
                <InputLabel>Faction</InputLabel>
                <Select
                    label={"Faction"}
                    value={filter.f}
                    onChange={(e) =>
                        setFilter({
                            ...filter,
                            f: e.target.value,
                        })
                    }
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value={0}>
                        <span
                            style={{
                                color: theme.palette.factionColors.alliance,
                            }}
                        >
                            Alliance
                        </span>
                    </MenuItem>
                    <MenuItem value={1}>
                        <span
                            style={{
                                color: theme.palette.factionColors.horde,
                            }}
                        >
                            Horde
                        </span>
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Difficulty</InputLabel>
                <Select
                    label={"Difficulty"}
                    value={filter.difficulty}
                    onChange={(e) =>
                        setFilter({
                            ...filter,
                            difficulty: e.target.value,
                        })
                    }
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {difficulties.map((difficulty) => (
                        <MenuItem value={difficulty} key={difficulty}>
                            {difficultyNames[difficulty]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Activity</InputLabel>
                <Select
                    label={"Activity"}
                    value={filter.activity}
                    onChange={(e) =>
                        setFilter({
                            ...filter,
                            activity: e.target.value,
                        })
                    }
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                    {difficulties.map((difficulty) => (
                        <MenuItem value={difficulty} key={difficulty}>
                            {difficultyNames[difficulty]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </FilterContainer>
    );
}

export default withTheme(GuildListFilter);
