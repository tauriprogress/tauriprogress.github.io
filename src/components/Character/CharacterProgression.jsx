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
    environmentRaidsSelector,
} from "../../redux/selectors";
import { withRealmGroupName } from "../Router/withRealmGroupName";

const DifficultyTabs = styled(BaseDifficultyTabs)(({ theme }) => ({
    marginLeft: "40px",
}));
const StyledTab = styled(Tab)(({ theme }) => ({
    color: `${theme.palette.primary.contrastText} !important`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
}));
const StyledContainer = styled(Container)(({ theme }) => ({
    margin: "5px 0",
    overflow: "hidden",
    padding: 0,
}));
const StyledTabs = styled(Tabs)(({ theme }) => ({
    maxWidth: "calc(100vw)",
}));

function CharacterProgression({ realmGroupName }) {
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
        };
    }, shallowEqual);

    const dispatch = useDispatch();

    const difficulties = []
        .concat(getDifficulties(raids, currentContentName))
        .reverse();

    const [difficulty, setDifficulty] = useState(
        getDefaultDifficulty(realmGroupName)
    );

    function selectRaid(raidName) {
        dispatch(characterProgressionSetRaid(raidName));
    }

    useEffect(() => {
        dispatch(characterProgressionSetRaid(currentContentName));
    }, [currentContentName, characterName, realm, dispatch]);

    useEffect(() => {
        dispatch(characterProgressionFetch(selectedRaid));
    }, [selectedRaid, dispatch]);

    return (
        <StyledContainer>
            <DifficultyTabs
                options={difficulties}
                selected={difficulty}
                onChange={(e, difficulty) => setDifficulty(difficulty)}
            />
            <StyledTabs
                value={selectedRaid || currentContentName}
                variant="scrollable"
                indicatorColor="secondary"
                allowScrollButtonsMobile
            >
                {raids.map((raid) => (
                    <StyledTab
                        value={raid.name}
                        key={raid.name}
                        label={raid.name}
                        style={{
                            backgroundImage: `url("${getRaidImg(raid.image)}")`,
                            backgroundSize: "cover",
                        }}
                        onClick={() => selectRaid(raid.name)}
                    />
                ))}
            </StyledTabs>
            <Container>
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
                    data[selectedRaid][difficulty] && (
                        <Grid container justifyContent="space-around">
                            <Grid item>
                                <RaidChart
                                    raidName={selectedRaid}
                                    data={data[selectedRaid][difficulty]}
                                    characterClass={characterClass}
                                    variant="dps"
                                />
                            </Grid>
                            {displayHealing(data[selectedRaid][difficulty]) && (
                                <Grid item>
                                    <RaidChart
                                        raidName={selectedRaid}
                                        data={data[selectedRaid][difficulty]}
                                        characterClass={characterClass}
                                        variant="hps"
                                    />
                                </Grid>
                            )}
                        </Grid>
                    )}
            </Container>
        </StyledContainer>
    );
}

export default withRealmGroupName(React.memo(CharacterProgression));
