import { realms } from "tauriprogress-constants";
import React from "react";

import { withTheme } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FilterContainer from "../FilterContainer/CollapseableFilterContainer";

let realmNames = [];
for (let realmKey in realms) {
    realmNames.push(realms[realmKey]);
}

function GuildListFilter({ theme, filter, setFilter }) {
    return (
        <FilterContainer>
            <FormControl>
                <InputLabel htmlFor="class">Realm</InputLabel>
                <Select
                    value={filter.realm}
                    onChange={e =>
                        setFilter({
                            ...filter,
                            realm: e.target.value
                        })
                    }
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {realmNames.map(realmName => (
                        <MenuItem key={realmName} value={realmName}>
                            <span>{realmName}</span>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="class">Faction</InputLabel>
                <Select
                    value={filter.faction}
                    onChange={e =>
                        setFilter({
                            ...filter,
                            faction: e.target.value
                        })
                    }
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value={0}>
                        <span
                            style={{
                                color: theme.palette.factionColors.alliance
                            }}
                        >
                            Alliance
                        </span>
                    </MenuItem>
                    <MenuItem value={1}>
                        <span
                            style={{
                                color: theme.palette.factionColors.horde
                            }}
                        >
                            Horde
                        </span>
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="class">Difficulty</InputLabel>
                <Select
                    value={filter.difficulty}
                    onChange={e =>
                        setFilter({
                            ...filter,
                            difficulty: e.target.value
                        })
                    }
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value={5}>
                        <span>10 HC</span>
                    </MenuItem>
                    <MenuItem value={6}>
                        <span>25 HC</span>
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="class">Activity</InputLabel>
                <Select
                    value={filter.activity}
                    onChange={e =>
                        setFilter({
                            ...filter,
                            activity: e.target.value
                        })
                    }
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value={true}>
                        <span>Active</span>
                    </MenuItem>
                    <MenuItem value={false}>
                        <span>Inactive</span>
                    </MenuItem>
                    <MenuItem value={5}>
                        <span>Active in 10 HC</span>
                    </MenuItem>
                    <MenuItem value={6}>
                        <span>Active in 25 HC</span>
                    </MenuItem>
                </Select>
            </FormControl>
        </FilterContainer>
    );
}

export default withTheme(GuildListFilter);
