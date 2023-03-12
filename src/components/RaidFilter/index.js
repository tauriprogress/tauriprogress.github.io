import React, { useEffect } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { characterClassSpecs } from "tauriprogress-constants";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
    getClassAndSpecOptions,
    getDifficultiesFromRaids,
    getFactionImg,
    getRealmNames,
    getRealmOptions,
    getRoleImg,
} from "../../helpers";
import {
    closeFilterWithQuery,
    initFilterWithQuery,
    setRaidFilter,
} from "../../redux/actions";
import { getClassColor } from "./helpers";

import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import {
    environmentCharacterClassNamesSelector,
    environmentCharacterSpecsSelector,
    environmentDifficultyNamesSelector,
    environmentRaidsSelector,
    environmentRealmsSelector,
    raidFilterSelector,
} from "../../redux/selectors";
import FilterContainer from "../FilterContainer";
import { useTheme } from "@emotion/react";

const IndentedMenuItem = styled(MenuItem)(({ theme }) => ({
    paddingLeft: theme.spacing(3),
}));

export const FILTER_TYPE_RAID = "FILTER_TYPE_RAID";

function RaidFilter({ queryInitDep }) {
    const {
        palette: { classColors, factionColors },
    } = useTheme();
    const {
        filter,
        realms,
        specs,
        characterClassNames,
        difficultyNames,
        raids,
    } = useSelector(
        (state) => ({
            filter: raidFilterSelector(state),
            realms: environmentRealmsSelector(state),
            specs: environmentCharacterSpecsSelector(state),
            characterClassNames: environmentCharacterClassNamesSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
            raids: environmentRaidsSelector(state),
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initFilterWithQuery(FILTER_TYPE_RAID));
        return () => dispatch(closeFilterWithQuery());
    }, [queryInitDep, dispatch]);

    const realmNames = getRealmNames(realms);
    const difficulties = getDifficultiesFromRaids(raids);
    const classOptions = getClassAndSpecOptions(
        characterClassNames,
        characterClassSpecs,
        specs,
        classColors
    );
    const realmOptions = getRealmOptions(realmNames);

    const selects = getSelects({
        difficulties,
        classOptions,
        realmOptions,
        difficultyNames,
        classColors,
        filter,
        factionColors,
    });

    return (
        <FilterContainer>
            {selects.map((select) => (
                <FormControl key={select.name}>
                    <InputLabel>{select.name}</InputLabel>
                    <Select
                        style={select.style}
                        value={filter[select.name]}
                        label={select.name}
                        onChange={(e) =>
                            dispatch(
                                setRaidFilter({
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
                        {select.name !== "difficulty" && (
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                        )}

                        {select.options.map((option) => {
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
            ))}
        </FilterContainer>
    );
}

function getSelects({
    difficulties,
    classOptions,
    realmOptions,
    difficultyNames,
    classColors,
    filter,
    factionColors,
}) {
    let selects = [
        {
            name: "class",
            style: {
                color: getClassColor(filter.class, classColors),
            },
            options: classOptions,
        },
        {
            name: "role",
            options: [
                {
                    imageSrc: getRoleImg("Melee"),
                    value: "damage",
                    name: "damage",
                },
                {
                    imageSrc: getRoleImg("Healer"),
                    value: "heal",
                    name: "heal",
                },
                {
                    imageSrc: getRoleImg("Tank"),
                    value: "tank",
                    name: "tank",
                },
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

    selects.unshift({
        name: "difficulty",
        options: difficulties.map((difficulty) => ({
            value: difficulty,
            name: difficultyNames[difficulty],
        })),
    });

    if (realmOptions.length > 1) {
        selects.push({
            name: "realm",
            options: realmOptions,
        });
    }

    return selects;
}

export default React.memo(RaidFilter);
