import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Grid from "@material-ui/core/Grid";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import SelectDifficulty from "../SelectDifficulty";
import RaidChart from "./RaidChart";

import { displayHealing, defaultDifficulty } from "./helpers";
import { raidImg } from "../../helpers";

import {
    fetchCharacterProgression,
    selectCharacterProgressionRaid
} from "../../redux/actions";

function styles(theme) {
    return {
        tab: {
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
        currentContentName
    } = useSelector(state => {
        return {
            ...state.character.progression,
            characterName:
                state.character.data.data && state.character.data.data.name,
            realm: state.character.data.data && state.character.data.data.realm,
            characterClass:
                state.character.data.data && state.character.data.data.class,
            raids: state.environment.currentContent.raids,
            currentContentName: state.environment.currentContent.name
        };
    });

    const [difficulty, setDifficulty] = useState(
        defaultDifficulty(raids, currentContentName)
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
            <SelectDifficulty
                difficulty={difficulty}
                onChange={(e, difficulty) => setDifficulty(difficulty)}
            />
            <Tabs value={selectedRaid} variant="fullWidth">
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
                {!loading && !error && data && data[selectedRaid] && (
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
