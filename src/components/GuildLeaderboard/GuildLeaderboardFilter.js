import React from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { withTheme, withStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import CollapseableFilterContainer from "../FilterContainer/CollapseableFilterContainer";

import { getRealmNames } from "../../helpers";

import { setGuildLeaderboardFilter } from "../../redux/actions";

function styles(theme) {
    return {
        capitalize: {
            textTransform: "capitalize"
        }
    };
}

function GuildLeaderboardFilter({ classes, theme }) {
    const { filter, realms, difficultyNames, raids } = useSelector(
        state => ({
            filter: state.guildLeaderboard.filter,
            realms: state.environment.realms,
            difficultyNames: state.environment.difficultyNames,
            raids: state.environment.currentContent.raids
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
        palette: { factionColors }
    } = theme;

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
            name: "difficulty",
            options: difficulties.map(difficulty => ({
                value: difficulty,
                name: difficultyNames[difficulty]
            }))
        },
        {
            name: "faction",
            style: {
                color:
                    filter.faction === 0
                        ? factionColors.alliance
                        : factionColors.horde
            },
            options: [
                { value: "", name: "all" },
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
        }
    ];

    if (realmOptions.length > 1) {
        selects.splice(2, 0, {
            name: "realm",
            options: [
                {
                    value: "",
                    name: "all"
                },
                ...realmOptions
            ]
        });
    }

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
                                setGuildLeaderboardFilter({
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

export default withStyles(styles)(withTheme(GuildLeaderboardFilter));
