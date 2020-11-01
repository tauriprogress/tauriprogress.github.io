import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
    fetchCharacterProgression,
    selectCharacterProgressionRaid
} from "../../redux/actions";

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
        characterName,
        realm,
        currentContentName,
        realmGroup
    } = useSelector(state => {
        return {
            ...state.character.progression,
            characterName:
                state.character.data.data && state.character.data.data.name,
            realm: state.character.data.data && state.character.data.data.realm,
            characterClass:
                state.character.data.data && state.character.data.data.class,
            raids: state.environment.currentContent.raids,
            currentContentName: state.environment.currentContent.name,
            realmGroup: state.environment.realmGroup
        };
    });

    const difficulties = []
        .concat(getDifficulties(raids, currentContentName))
        .reverse();

    const [difficulty, setDifficulty] = useState(
        getDefaultDifficulty(realmGroup)
    );
    const dispatch = useDispatch();

    function selectRaid(raidName) {
        dispatch(selectCharacterProgressionRaid(raidName));
        if (!data || !data[raidName]) {
            dispatch(
                fetchCharacterProgression({
                    characterName: characterName,
                    realm: realm,
                    raidName: raidName,
                    characterClass: characterClass
                })
            );
        }
    }

    useEffect(() => {
        selectRaid(currentContentName);
    }, []);

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
                            backgroundImage: `url("${raidImg(raid.image)}")`
                        }}
                        onClick={() => selectRaid(raid.name)}
                    />
                ))}
            </Tabs>

            <Container>
                {loading && <Loading />}
                {!loading && error && <ErrorMessage message={error} />}
                {!loading &&
                    !error &&
                    data &&
                    data[selectedRaid] &&
                    data[selectedRaid][difficulty] && (
                        <Grid container justify="space-around">
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
