import { specs, specToClass, characterClasses } from "tauriprogress-constants";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withTheme, withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import FilterContainer from "../FilterContainer";
import CollapseableFilterContainer from "../FilterContainer/CollapseableFilterContainer";

import {
    charLadderFilterSet,
    charLadderFilterReset
} from "../../redux/actions";

import { realmNames } from "../../helpers";

function styles(theme) {
    return {
        textField: {
            width: "124px",
            padding: "0px"
        },
        capitalize: {
            textTransform: "capitalize"
        }
    };
}

function Filters({ classes, disableFilter, theme }) {
    const filter = useSelector(state => state.charLadder.filter);
    const dispatch = useDispatch();

    useEffect(() => () => dispatch(charLadderFilterReset()), []);

    const {
        palette: { classColors, factionColors }
    } = theme;

    const FilterContainerComponent =
        window.innerWidth > 600 ? FilterContainer : CollapseableFilterContainer;

    let specOptions = [];
    const classColor = filter.class
        ? classColors[filter.class].text
        : "inherit";
    for (let specId in specToClass) {
        if (specToClass[specId] === Number(filter.class)) {
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
    for (let classId in characterClasses) {
        classOptions.push({
            value: classId,
            name: characterClasses[classId],
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

    if (!disableFilter.faction) {
        selects.push({
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
        });
    }

    if (!disableFilter.realm) {
        selects.push({
            name: "realm",
            options: realmOptions
        });
    }

    return (
        <FilterContainerComponent>
            <TextField
                id="name"
                label="Name"
                value={filter.name}
                onChange={e =>
                    dispatch(
                        charLadderFilterSet({
                            filterName: "name",
                            value: e.target.value
                        })
                    )
                }
                className={classes.textField}
            />

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
                                charLadderFilterSet({
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
        </FilterContainerComponent>
    );
}

export default withStyles(styles)(withTheme(Filters));
