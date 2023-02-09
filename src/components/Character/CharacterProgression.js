import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import withStyles from "@mui/styles/withStyles";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Grid from "@mui/material/Grid";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import DifficultyTabs from "../DifficultyTabs";
import RaidChart from "./RaidChart";

import { displayHealing, getDifficulties } from "./helpers";
import { getRaidImg, getDefaultDifficulty } from "../../helpers";

import {
    characterProgressionFetch,
    characterProgressionSetRaid,
} from "../../redux/actions";
import {
    characterClassSelector,
    characterNameSelector,
    characterRealmSelector,
    characterProgressionEntireSelector,
    environmentRaidsSelector,
    environmentCurrentRaidNameSelector,
} from "../../redux/selectors";
import { withRealmGroupName } from "../Router/withRealmGroupName";

function styles(theme) {
    return {
        tab: {
            color: `${theme.palette.primary.contrastText} !important`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
        },
        container: {
            margin: "5px 0",
        },
    };
}

function CharacterProgression({ classes, realmGroupName }) {
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
        <Container className={classes.container}>
            <DifficultyTabs
                options={difficulties}
                selected={difficulty}
                onChange={(e, difficulty) => setDifficulty(difficulty)}
            />
            <Tabs
                value={selectedRaid || currentContentName}
                variant="fullWidth"
                indicatorColor="secondary"
            >
                {raids.map((raid) => (
                    <Tab
                        value={raid.name}
                        key={raid.name}
                        label={raid.name}
                        className={classes.tab}
                        style={{
                            backgroundImage: `url("${getRaidImg(raid.image)}")`,
                            backgroundSize: "cover",
                        }}
                        onClick={() => selectRaid(raid.name)}
                    />
                ))}
            </Tabs>
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
        </Container>
    );
}

export default withRealmGroupName(
    React.memo(withStyles(styles)(CharacterProgression))
);
