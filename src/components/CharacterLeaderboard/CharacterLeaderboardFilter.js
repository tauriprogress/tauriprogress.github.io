import React from "react";

import { characterSpecClass } from "tauriprogress-constants";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import withTheme from "@mui/styles/withTheme";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FilterContainer from "../FilterContainer";

import { getClassImg, getFactionImg, getRealmNames } from "../../helpers";

import { characterLeaderboardSetFilter } from "../../redux/actions";
import {
    characterLeaderboardFilterSelector,
    environmentCharacterSpecsSelector,
    environmentRealmsSelector,
    environmentCharacterClassNamesSelector,
    environmentDifficultyNamesSelector,
    environmentRaidsSelector,
} from "../../redux/selectors";
import { Avatar } from "@mui/material";

function CharacterLeaderboardFilter({ theme }) {
    const {
        filter,
        realms,
        specs,
        characterClassNames,
        difficultyNames,
        raids,
    } = useSelector(
        (state) => ({
            filter: characterLeaderboardFilterSelector(state),
            realms: environmentRealmsSelector(state),
            specs: environmentCharacterSpecsSelector(state),
            characterClassNames: environmentCharacterClassNamesSelector(state),
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

    const {
        palette: { classColors, factionColors },
    } = theme;
    let specOptions = [];
    const classColor = filter.class
        ? classColors[filter.class].text
        : "inherit";
    for (let specId in characterSpecClass) {
        if (characterSpecClass[specId] === Number(filter.class)) {
            if (specs[specId]) {
                specOptions.push({
                    value: specId,
                    name: specs[specId].label,
                    style: {
                        color: classColors[filter.class].text,
                    },
                });
            }
        }
    }

    let classOptions = [];
    for (let classId in characterClassNames) {
        classOptions.push({
            imageSrc: getClassImg(classId),
            value: classId,
            name: characterClassNames[classId],
            style: {
                color: classColors[classId].text,
            },
        });
    }

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
            name: "class",
            style: {
                color: classColor,
            },
            options: [
                {
                    value: "",
                    name: "all",
                },
                ...classOptions,
            ],
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
                                characterLeaderboardSetFilter({
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

export default React.memo(withTheme(CharacterLeaderboardFilter));
