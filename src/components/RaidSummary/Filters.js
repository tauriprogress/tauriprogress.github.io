import { specs, specToClass, characterClasses } from "tauriprogress-constants";

import React from "react";
import { useSelector } from "react-redux";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import FilterContainer from "../FilterContainer";

import { withTheme } from "@material-ui/core/styles";

import { getRealmNames } from "../../helpers";

function Filters({
    filter,
    changeFilter,
    theme: {
        palette: { classColors, factionColors }
    }
}) {
    let specOptions = [];

    for (let specId in specToClass) {
        if (specToClass[specId] === Number(filter.class)) {
            specOptions.push({
                id: specId,
                label: specs[specId].label
            });
        }
    }

    let classOptions = [];
    for (let classId in characterClasses) {
        classOptions.push({
            id: classId,
            label: characterClasses[classId]
        });
    }

    const classColor = filter.class
        ? classColors[filter.class].text
        : "inherit";
    const realms = getRealmNames(
        useSelector(state => state.environment.realms)
    );
    return (
        <FilterContainer>
            <FormControl>
                <InputLabel htmlFor="realm">Realm</InputLabel>
                <Select
                    value={filter.realm}
                    onChange={e =>
                        changeFilter({
                            filterName: "realm",
                            value: e.target.value
                        })
                    }
                    inputProps={{
                        name: "realm",
                        id: "realm"
                    }}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {realms.map(realm => (
                        <MenuItem key={realm} value={realm}>
                            {realm}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="faction">Faction</InputLabel>
                <Select
                    value={filter.faction}
                    onChange={e =>
                        changeFilter({
                            filterName: "faction",
                            value: e.target.value
                        })
                    }
                    style={{
                        color:
                            filter.faction === 0
                                ? factionColors.alliance
                                : factionColors.horde
                    }}
                    inputProps={{
                        name: "faction",
                        id: "faction"
                    }}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem
                        style={{
                            color: factionColors.alliance
                        }}
                        value={0}
                    >
                        Alliance
                    </MenuItem>
                    <MenuItem
                        style={{
                            color: factionColors.horde
                        }}
                        value={1}
                    >
                        Horde
                    </MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="class">Class</InputLabel>
                <Select
                    style={{
                        color: classColor
                    }}
                    value={filter.class}
                    onChange={e =>
                        changeFilter({
                            filterName: "class",
                            value: e.target.value
                        })
                    }
                    inputProps={{
                        name: "class",
                        id: "class"
                    }}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {classOptions.map(characterClass => (
                        <MenuItem
                            key={characterClass.id}
                            value={characterClass.id}
                            style={{
                                color: classColors[characterClass.id].text
                            }}
                        >
                            {characterClass.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="spec">Spec</InputLabel>
                <Select
                    style={{
                        color: classColor
                    }}
                    value={filter.spec}
                    onChange={e =>
                        changeFilter({
                            filterName: "spec",
                            value: e.target.value
                        })
                    }
                    inputProps={{
                        name: "spec",
                        id: "spec"
                    }}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {specOptions.map(specOption => (
                        <MenuItem
                            style={{
                                color: classColor
                            }}
                            key={specOption.id}
                            value={specOption.id}
                        >
                            {specOption.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </FilterContainer>
    );
}

export default withTheme(Filters);
