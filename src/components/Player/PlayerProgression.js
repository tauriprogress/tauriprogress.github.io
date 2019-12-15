import React, { useState } from "react";
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

import { displayHealing } from "./helpers";

import {
    playerProgressionFetch,
    playerProgressionSelectRaid
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

function PlayerProgression({ classes }) {
    const {
        loading,
        error,
        data,
        selectedRaid,
        characterClass,
        raids,
        playerName,
        realm
    } = useSelector(state => {
        let raids = [];

        for (let raidName in state.raidInfo.raids) {
            raids.push(state.raidInfo.raids[raidName]);
        }

        return {
            ...state.player.progression,
            playerName: state.player.data.data && state.player.data.data.name,
            realm: state.player.data.data && state.player.data.data.realm,
            characterClass:
                state.player.data.data && state.player.data.data.class,
            raids
        };
    });

    const [difficulty, setDifficulty] = useState(5);
    const dispatch = useDispatch();

    function selectRaid(raidName) {
        dispatch(playerProgressionSelectRaid(raidName));
        if (!data[raidName]) {
            dispatch(
                playerProgressionFetch({
                    playerName: playerName,
                    realm: realm,
                    raidName: raidName,
                    characterClass: characterClass
                })
            );
        }
    }

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
                            backgroundImage: "url(" + raid.picture + ")"
                        }}
                        onClick={() => selectRaid(raid.name)}
                    />
                ))}
            </Tabs>

            <Container>
                {loading && <Loading />}
                {!loading && error && <ErrorMessage message={error} />}
                {data && data[selectedRaid] && (
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

export default withStyles(styles)(PlayerProgression);
