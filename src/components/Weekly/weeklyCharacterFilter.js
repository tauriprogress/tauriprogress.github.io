import React from "react";

import { shallowEqual, useSelector } from "react-redux";
import { characterClassSpecs } from "tauriprogress-constants";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
    getClassAndSpecOptions,
    getClassColor,
    getRoleImg,
} from "../../helpers";

import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import {
    environmentCharacterClassNamesSelector,
    environmentCharacterSpecsSelector,
    environmentDifficultyNamesSelector,
} from "../../redux/selectors";
import FilterContainer from "../FilterContainer";
import { useTheme } from "@emotion/react";

const IndentedMenuItem = styled(MenuItem)(({ theme }) => ({
    paddingLeft: theme.spacing(3),
}));

function WeeklyChallengeCharacterFilter({
    selectedCombatMetric,
    setCombatMetric,
    selectedClass,
    setSelectedClass,
}) {
    const {
        palette: { classColors },
    } = useTheme();
    const { specs, characterClassNames } = useSelector(
        (state) => ({
            specs: environmentCharacterSpecsSelector(state),
            characterClassNames: environmentCharacterClassNamesSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
        }),
        shallowEqual
    );

    const classOptions = getClassAndSpecOptions(
        characterClassNames,
        characterClassSpecs,
        specs,
        classColors
    );

    const combatMetricOptions = [
        {
            imageSrc: getRoleImg("Melee"),
            value: "dps",
            name: "dps",
        },
        {
            imageSrc: getRoleImg("Healer"),
            value: "hps",
            name: "hps",
        },
    ];

    return (
        <FilterContainer>
            <FormControl>
                <InputLabel>combat metric</InputLabel>
                <Select
                    value={selectedCombatMetric}
                    label={"class"}
                    onChange={(e) => setCombatMetric(e.target.value)}
                >
                    {combatMetricOptions.map((option) => {
                        return (
                            <MenuItem key={option.name} value={option.value}>
                                {option.imageSrc && (
                                    <Avatar
                                        variant="small"
                                        src={option.imageSrc}
                                    />
                                )}
                                {option.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel>class</InputLabel>
                <Select
                    style={{
                        color: getClassColor(selectedClass, classColors),
                    }}
                    value={selectedClass}
                    label={"class"}
                    onChange={(e) => setSelectedClass(String(e.target.value))}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>

                    {classOptions.map((option) => {
                        const Component = option.indented
                            ? IndentedMenuItem
                            : MenuItem;

                        return (
                            <Component
                                divider={option.divider}
                                key={option.name}
                                value={option.value}
                                style={option.style}
                            >
                                {option.imageSrc && (
                                    <Avatar
                                        variant="small"
                                        src={option.imageSrc}
                                    />
                                )}
                                {option.name}
                            </Component>
                        );
                    })}
                </Select>
            </FormControl>
        </FilterContainer>
    );
}

export default React.memo(WeeklyChallengeCharacterFilter);
