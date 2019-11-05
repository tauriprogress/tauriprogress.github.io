import {
    realms,
    specs,
    specToClass,
    characterClasses
} from "tauriprogress-constants";

import React from "react";
import { useSelector, useDispatch } from "react-redux";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import { withTheme, withStyles } from "@material-ui/core/styles";

import { charLadderFilterSet } from "../../redux/actions";

const styles = {
    root: {
        width: "150px"
    }
};

const StyledSelect = withStyles(styles)(Select);
const StyledTextField = withStyles(styles)(TextField);

let realmNames = [];
for (let realmKey in realms) {
    realmNames.push(realms[realmKey]);
}

function Filters({ disableFilter, theme }) {
    const filter = useSelector(state => state.charLadder.filter);
    const dispatch = useDispatch();

    const {
        palette: { classColors, factionColors }
    } = theme;

    let specOptions = [];
    for (let specId in specToClass) {
        if (specToClass[specId] === Number(filter.class)) {
            specOptions.push({
                value: specId,
                name: specs[specId].label,
                style: {
                    color: classColors[filter.class]
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
                color: classColors[classId]
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
                color: classColors[filter.class]
            },
            options: classOptions
        },
        {
            name: "spec",
            style: {
                color: classColors[filter.class]
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
        <div className="globalFilterStyles">
            <FormControl className="globalFilterStylesFormControl">
                <StyledTextField
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
                    margin="normal"
                    className="globalFilterStylesSearch"
                />
            </FormControl>

            {selects.map(select => (
                <FormControl
                    className="globalFilterStylesFormControl"
                    key={select.name}
                >
                    <InputLabel htmlFor="class">
                        <span className="textCapitalize">{select.name}</span>
                    </InputLabel>
                    <StyledSelect
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
                        className="globalFilterStylesSelect"
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {select.options.map(option => (
                            <MenuItem
                                key={option.name}
                                value={option.value}
                                style={option.style}
                            >
                                <span className="textCapitalize">
                                    {option.name}
                                </span>
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </FormControl>
            ))}
        </div>
    );
}

export default withTheme()(Filters);
