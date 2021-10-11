import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Grid from "@material-ui/core/Grid";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import DifficultyTabs from "../DifficultyTabs";
import RaidChart from "./RaidChart";

import { displayHealing, getDifficulties } from "./helpers";
import { raidImg, getDefaultDifficulty } from "../../helpers";

import {
    characterProgressionFetch,
    characterProgressionSetRaid
} from "../../redux/actions";
import {
    characterClassSelector,
    characterNameSelector,
    characterRealmSelector,
    characterProgressionEntireSelector,
    environmentRaidsSelector,
    environmentCurrentRaidNameSelector,
    environmentRealmGroupSelector,
    environmentIsSeasonalSelector
} from "../../redux/selectors";

function styles(theme) {
    return {
        tab: {
            color: theme.palette.primary.contrastText,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"
        },
        container: {
            margin: "5px 0"
        }
    };
}

function CharacterProgression({ classes }) {
    const {
        loading,
        error,
        data,
        selectedRaid,
        characterClass,
        raids,
        currentContentName,
        realmGroup,
        isSeasonal,
        characterName,
        realm
    } = useSelector(state => {
        return {
            ...characterProgressionEntireSelector(state),
            characterName: characterNameSelector(state),
            realm: characterRealmSelector(state),
            characterClass: characterClassSelector(state),
            raids: environmentRaidsSelector(state),
            currentContentName: environmentCurrentRaidNameSelector(state),
            realmGroup: environmentRealmGroupSelector(state),
            isSeasonal: environmentIsSeasonalSelector(state)
        };
    }, shallowEqual);

    const difficulties = []
        .concat(getDifficulties(raids, currentContentName))
        .reverse();

    const [difficulty, setDifficulty] = useState(
        getDefaultDifficulty(realmGroup)
    );
    const dispatch = useDispatch();

    function selectRaid(raidName) {
        dispatch(characterProgressionSetRaid(raidName));
    }

    useEffect(() => {
        dispatch(characterProgressionSetRaid(currentContentName));
    }, [currentContentName, characterName, realm, dispatch]);

    useEffect(() => {
        dispatch(characterProgressionFetch(selectedRaid));
    }, [selectedRaid, isSeasonal, dispatch]);

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
            >
                {raids.map(raid => (
                    <Tab
                        value={raid.name}
                        key={raid.name}
                        label={raid.name}
                        className={classes.tab}
                        style={{
                            backgroundImage: `url("${raidImg(raid.image)}")`,
                            backgroundSize: "cover"
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

export default withStyles(styles)(CharacterProgression);
