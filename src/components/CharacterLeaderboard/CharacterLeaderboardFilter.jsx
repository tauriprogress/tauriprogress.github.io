import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
    getClassOptions,
    getDifficultiesFromRaids,
    getFactionImg,
    getRealmNames,
    getRealmOptions,
} from "../../helpers";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FilterContainer from "../FilterContainer";
import { Avatar, useTheme } from "@mui/material";

import {
    characterLeaderboardSetFilter,
    closeFilterWithQuery,
    initFilterWithQuery,
} from "../../redux/actions";
import {
    characterLeaderboardFilterSelector,
    environmentCharacterClassNamesSelector,
    environmentDifficultyNamesSelector,
    environmentRaidsSelector,
    environmentRealmsSelector,
} from "../../redux/selectors";

export const FILTER_TYPE_CHARACTER_LB = "FILTER_TYPE_CHARACTER_LB";

function CharacterLeaderboardFilter() {
    const { filter, realms, characterClassNames, difficultyNames, raids } =
        useSelector(
            (state) => ({
                filter: characterLeaderboardFilterSelector(state),
                realms: environmentRealmsSelector(state),
                characterClassNames:
                    environmentCharacterClassNamesSelector(state),
                difficultyNames: environmentDifficultyNamesSelector(state),
                raids: environmentRaidsSelector(state),
            }),
            shallowEqual
        );
    const {
        palette: { classColors, factionColors },
    } = useTheme();
    const realmNames = getRealmNames(realms);

    const classColor = getClassColor(filter, classColors);
    const difficulties = getDifficultiesFromRaids(raids);
    const classOptions = getClassOptions(characterClassNames, classColors);
    const realmOptions = getRealmOptions(realmNames);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initFilterWithQuery(FILTER_TYPE_CHARACTER_LB));
        return () => dispatch(closeFilterWithQuery());
    }, [dispatch]);

    const selects = getSelects({
        factionColors,
        classColor,
        filter,
        difficulties,
        difficultyNames,
        classOptions,
        realmOptions,
        raids,
    });

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

function getClassColor(filter, classColors) {
    return filter.class ? classColors[filter.class].text : "inherit";
}

function getSelects({
    factionColors,
    classColor,
    filter,
    difficulties,
    difficultyNames,
    classOptions,
    realmOptions,
    raids,
}) {
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

    return selects;
}

export default React.memo(CharacterLeaderboardFilter);
