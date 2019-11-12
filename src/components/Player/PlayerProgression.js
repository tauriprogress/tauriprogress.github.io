import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import SkadaChartRaid from "../SkadaChartRaid";

import { displayHealing } from "./helpers";

import {
    playerProgressionFetch,
    playerProgressionSelectRaid
} from "../../redux/actions";

function styles(theme) {
    return {
        listItem: {
            "&:hover *": {
                color: `${theme.palette.secondary.main} !important`
            }
        },
        listTitle: {
            backgroundColor: `${theme.palette.primary.main} !important`,
            "& *": {
                color: theme.palette.primary.contrastText
            }
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
        <div className="displayPlayerProgression">
            <Tabs
                value={difficulty}
                onChange={(e, difficulty) => setDifficulty(difficulty)}
                indicatorColor="secondary"
                className="displayPlayerTabs"
            >
                <Tab label="10 HC" className="tab" value={5} />
                <Tab label="25 HC" className="tab" value={6} />
            </Tabs>
            <List className="displayPlayerProgressionRaidNames">
                {raids.map(raid => (
                    <ListItem
                        key={raid.name}
                        className={`${classes.listItem} ${classes.listTitle}`}
                        button
                        onClick={() => selectRaid(raid.name)}
                        style={{
                            background: "url(" + raid.picture + ")"
                        }}
                        selected={selectedRaid === raid.name}
                        component="li"
                    >
                        <ListItemText inset primary={raid.name} />
                    </ListItem>
                ))}
            </List>

            <div className="displayPlayerProgressionChartContainer">
                {loading && <Loading />}
                {!loading && error && <ErrorMessage message={error} />}
                {data && data[selectedRaid] && (
                    <React.Fragment>
                        <SkadaChartRaid
                            raidName={selectedRaid}
                            data={data[selectedRaid][difficulty]}
                            characterClass={characterClass}
                            variant="dps"
                        />
                        {displayHealing(data[selectedRaid][difficulty]) && (
                            <SkadaChartRaid
                                raidName={selectedRaid}
                                data={data[selectedRaid][difficulty]}
                                characterClass={characterClass}
                                variant="hps"
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

export default withStyles(styles)(PlayerProgression);
