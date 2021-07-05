import { raidNameToId } from "tauriprogress-constants";
import React, { useEffect } from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import FastestKills from "./FastestKills";
import RecentKills from "./RecentKills";
import CharacterLadder from "../CharacterLadder";
import OverflowScroll from "../OverflowScroll";

import {
    fetchRaidBoss,
    setRaidBossTab,
    setSelectedNavigationItem
} from "../../redux/actions";

function RaidBoss({ match }) {
    const {
        selectedTab,
        loading,
        data,
        error,
        bossName,
        difficulty,
        filter,
        difficultyNames
    } = useSelector(state => {
        return {
            ...state.raidBoss,
            difficulty: state.raid.filter.difficulty,
            filter: state.raid.filter,
            difficultyNames: state.environment.difficultyNames
        };
    }, shallowEqual);
    const boss =
        match.params.bossName === bossName
            ? data && data[difficulty]
                ? data[difficulty]
                : {}
            : {};

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            fetchRaidBoss({
                raidId: raidNameToId[match.params.raidName],
                bossName: match.params.bossName
            })
        );

        dispatch(setSelectedNavigationItem(match.params.bossName));
        return () => dispatch(setSelectedNavigationItem(null));
    }, [match.params.bossName, match.params.raidName, dispatch]);

    return (
        <React.Fragment>
            <Typography variant="h4" align="center">
                {`${bossName} ${difficultyNames[difficulty]}`}
                <Typography variant="caption" color="textSecondary">
                    {" "}
                    <span
                        style={{
                            whiteSpace: "nowrap"
                        }}
                    >
                        {boss.killCount} Kills
                    </span>
                </Typography>
            </Typography>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && data && (
                <React.Fragment>
                    <Tabs
                        value={selectedTab}
                        onChange={(e, value) => dispatch(setRaidBossTab(value))}
                        variant="scrollable"
                        scrollButtons="on"
                    >
                        <Tab label="Dps" />
                        <Tab label="Hps" />
                        <Tab label="Fastest" />
                        <Tab label="Latest" />
                    </Tabs>
                    <OverflowScroll>
                        {(boss => {
                            switch (selectedTab) {
                                case 0:
                                case 1:
                                    return (
                                        <CharacterLadder
                                            filter={filter}
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
                                        <RecentKills data={boss.recentKills} />
                                    );
                                default:
                                    return 0;
                            }
                        })(!loading ? boss : {})}
                    </OverflowScroll>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default RaidBoss;
