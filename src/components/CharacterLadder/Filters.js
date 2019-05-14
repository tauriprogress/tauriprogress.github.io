import {
    realms,
    specs,
    specToClass,
    characterClasses
} from "tauriprogress-constants";

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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

function Filters({
    filter,
    disableFilter,
    charLadderFilterSet,
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

    return (
        <div className="characterLadderFilters">
            <FormControl className="characterLadderFiltersFormControl">
                <StyledTextField
                    id="name"
                    label="Name"
                    value={filter.name}
                    onChange={e =>
                        charLadderFilterSet({
                            filterName: "name",
                            value: e.target.value
                        })
                    }
                    margin="normal"
                    className="characterLadderFiltersSearch"
                />
            </FormControl>

            <FormControl className="characterLadderFiltersFormControl">
                <InputLabel htmlFor="class">Class</InputLabel>
                <StyledSelect
                    style={{
                        color: classColors[filter.class]
                    }}
                    value={filter.class}
                    onChange={e =>
                        charLadderFilterSet({
                            filterName: "class",
                            value: e.target.value
                        })
                    }
                    inputProps={{
                        name: "class",
                        id: "class"
                    }}
                    className="characterLadderFiltersSelect"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {classOptions.map(characterClass => (
                        <MenuItem
                            key={characterClass.id}
                            value={characterClass.id}
                            style={{
                                color: classColors[characterClass.id]
                            }}
                        >
                            {characterClass.label}
                        </MenuItem>
                    ))}
                </StyledSelect>
            </FormControl>
            <FormControl className="characterLadderFiltersFormControl">
                <InputLabel htmlFor="class">Spec</InputLabel>
                <StyledSelect
                    style={{
                        color: classColors[filter.class]
                    }}
                    value={filter.spec}
                    onChange={e =>
                        charLadderFilterSet({
                            filterName: "spec",
                            value: e.target.value
                        })
                    }
                    inputProps={{
                        name: "spec",
                        id: "spec"
                    }}
                    className="characterLadderFiltersSelect"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {specOptions.map(specOption => (
                        <MenuItem
                            style={{
                                color: classColors[filter.class]
                            }}
                            key={specOption.id}
                            value={specOption.id}
                        >
                            {specOption.label}
                        </MenuItem>
                    ))}
                </StyledSelect>
            </FormControl>
            <FormControl className="characterLadderFiltersFormControl">
                <InputLabel htmlFor="class">Role</InputLabel>
                <StyledSelect
                    value={filter.role}
                    onChange={e =>
                        charLadderFilterSet({
                            filterName: "role",
                            value: e.target.value
                        })
                    }
                    inputProps={{
                        name: "role",
                        id: "role"
                    }}
                    className="characterLadderFiltersSelect"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value={"damage"}>Damage</MenuItem>
                    <MenuItem value={"heal"}>Heal</MenuItem>
                    <MenuItem value={"tank"}>Tank</MenuItem>
                </StyledSelect>
            </FormControl>
            {!disableFilter.faction && (
                <FormControl className="characterLadderFiltersFormControl">
                    <InputLabel htmlFor="class">Faction</InputLabel>
                    <StyledSelect
                        value={filter.faction}
                        onChange={e =>
                            charLadderFilterSet({
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
                        className="characterLadderFiltersSelect"
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
                    </StyledSelect>
                </FormControl>
            )}

            {!disableFilter.realm && (
                <FormControl className="characterLadderFiltersFormControl">
                    <InputLabel htmlFor="class">Server</InputLabel>
                    <StyledSelect
                        value={filter.realm}
                        onChange={e =>
                            charLadderFilterSet({
                                filterName: "realm",
                                value: e.target.value
                            })
                        }
                        inputProps={{
                            name: "realm",
                            id: "realm"
                        }}
                        className="characterLadderFiltersSelect"
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {realmNames.map(realm => (
                            <MenuItem key={realm} value={realm}>
                                {realm}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                </FormControl>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        filter: state.charLadder.filter
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ charLadderFilterSet }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme()(Filters));
