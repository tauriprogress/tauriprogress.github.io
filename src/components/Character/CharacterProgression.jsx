import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import Grid from "@mui/material/Grid";

import BaseDifficultyTabs from "../DifficultyTabs";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import RaidChart from "./RaidChart";

import { getDefaultDifficulty, getRaidImg } from "../../helpers";
import { displayHealing, getDifficulties } from "./helpers";

import styled from "@emotion/styled";
import {
    characterProgressionFetch,
    characterProgressionSetRaid,
} from "../../redux/actions";
import {
    characterClassSelector,
    characterNameSelector,
    characterProgressionEntireSelector,
    characterRealmSelector,
    environmentCurrentRaidNameSelector,
    environmentDifficultyNamesSelector,
    environmentRaidsSelector,
} from "../../redux/selectors";
import { withRealmGroupName } from "../Router/withRealmGroupName";

const GridItem = styled(Grid)(({ theme }) => ({
    maxWidth: "100%",
    padding: theme.spacing(2),
}));

function CharacterProgression() {
    const {
        loading,
        error,
        data,
        selectedRaid,
        characterClass,
        raids,
        currentContentName,
        characterName,
        realm,
    } = useSelector((state) => {
        return {
            ...characterProgressionEntireSelector(state),
            characterName: characterNameSelector(state),
            realm: characterRealmSelector(state),
            characterClass: characterClassSelector(state),
            raids: environmentRaidsSelector(state),
            currentContentName: environmentCurrentRaidNameSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
        };
    }, shallowEqual);

    const dispatch = useDispatch();

    const difficulties = []
        .concat(getDifficulties(raids, currentContentName))
        .reverse();

    useEffect(() => {
        dispatch(characterProgressionSetRaid(currentContentName));
    }, [currentContentName, characterName, realm, dispatch]);

    useEffect(() => {
        dispatch(characterProgressionFetch(selectedRaid));
    }, [selectedRaid, dispatch]);

    return (
        <Grid container justifyContent="space-around">
            {loading && <Loading />}
            {!loading && error && (
                <ErrorMessage
                    message={error}
                    refresh={() =>
                        dispatch(characterProgressionFetch(selectedRaid))
                    }
                />
            )}
            {!loading &&
                !error &&
                data &&
                data[selectedRaid] &&
                difficulties.map((difficulty) => {
                    return data[selectedRaid][difficulty] ? (
                        <>
                            <GridItem item>
                                <RaidChart
                                    raidName={selectedRaid}
                                    difficulty={difficulty}
                                    data={data[selectedRaid][difficulty]}
                                    characterClass={characterClass}
                                    variant="dps"
                                />
                            </GridItem>
                            {displayHealing(data[selectedRaid][difficulty]) && (
                                <GridItem item>
                                    <RaidChart
                                        raidName={selectedRaid}
                                        difficulty={difficulty}
                                        data={data[selectedRaid][difficulty]}
                                        characterClass={characterClass}
                                        variant="hps"
                                    />
                                </GridItem>
                            )}
                        </>
                    ) : null;
                })}
        </Grid>
    );
}

export default withRealmGroupName(React.memo(CharacterProgression));
