import { raidNameToId } from "tauriprogress-constants";
import React, { useEffect } from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import RaidBossTitle from "./RaidBossTitle";
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
    const bossName = match.params.bossName;
    const raidId = raidNameToId[match.params.raidName];

    const { selectedTab, loading, data, error, difficulty, filter } =
        useSelector(state => {
            return {
                ...state.raidBoss,
                difficulty: state.raid.filter.difficulty,
                filter: state.raid.filter
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
                raidId: raidId,
                bossName: bossName
            })
        );

        dispatch(setSelectedNavigationItem(bossName));
        return () => dispatch(setSelectedNavigationItem(null));
    }, [bossName, raidId, dispatch]);

    return (
        <React.Fragment>
            <RaidBossTitle
                raidId={raidId}
                bossName={bossName}
                difficulty={difficulty}
            />
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
                                            raidId={raidId}
                                            bossName={bossName}
                                            difficulty={difficulty}
                                        />
                                    );
                                case 3:
                                    return (
                                        <RecentKills
                                            raidId={raidId}
                                            bossName={bossName}
                                            difficulty={difficulty}
                                        />
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
