import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import FastestKills from "./FastestKills";
import LatestKills from "./LatestKills";
import RaidBossStats from "./RaidBossStats";
import CharacterLadder from "../CharacterLadder";
import SelectDifficulty from "../SelectDifficulty";

import {
    raidBossFetch,
    raidInfoChangeDiff,
    raidBossSelectTab
} from "../../redux/actions";

function RaidBoss({ match }) {
    const {
        selectedTab,
        loading,
        data,
        error,
        bossName,
        diff,
        raidName
    } = useSelector(state => {
        return {
            ...state.raidBoss,
            diff: state.raidInfo.selectedDiff
        };
    });
    const boss = data ? data[diff] : {};

    const dispatch = useDispatch();
    useEffect(() => {
        if (
            match.params.raidName !== raidName ||
            match.params.bossName !== bossName
        ) {
            dispatch(
                raidBossFetch({
                    raidName: match.params.raidName,
                    bossName: match.params.bossName
                })
            );
        }
    }, []);

    return (
        <React.Fragment>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!error && data && (
                <React.Fragment>
                    {!loading && (
                        <Typography variant="h4" align="center">
                            {bossName}
                            <Typography variant="caption" color="textSecondary">
                                {" "}
                                {boss.killCount} Kills
                            </Typography>
                        </Typography>
                    )}

                    <SelectDifficulty
                        difficulty={diff}
                        onChange={(e, value) =>
                            dispatch(raidInfoChangeDiff(value))
                        }
                    />

                    <React.Fragment>
                        <Tabs
                            value={selectedTab}
                            onChange={(e, value) =>
                                dispatch(raidBossSelectTab(value))
                            }
                            variant="scrollable"
                            scrollButtons="on"
                        >
                            <Tab label="Dps" />
                            <Tab label="Hps" />
                            <Tab label="Fastest" />
                            <Tab label="Latest" />
                            <Tab label="Stats" />
                        </Tabs>
                        {(boss => {
                            switch (selectedTab) {
                                case 0:
                                case 1:
                                    return (
                                        <CharacterLadder
                                            data={
                                                selectedTab === 0
                                                    ? boss.dps
                                                    : boss.hps
                                            }
                                            type={
                                                selectedTab === 0
                                                    ? "dps"
                                                    : "hps"
                                            }
                                        />
                                    );
                                case 2:
                                    return (
                                        <FastestKills
                                            data={boss.fastestKills}
                                        />
                                    );
                                case 3:
                                    return (
                                        <LatestKills data={boss.latestKills} />
                                    );
                                case 4:
                                    return <RaidBossStats data={boss.stats} />;
                                default:
                                    return 0;
                            }
                        })(!loading ? boss : {})}
                    </React.Fragment>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default RaidBoss;
