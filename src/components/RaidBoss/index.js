import { raidNameToId } from "tauriprogress-constants";
import React, { useEffect } from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import RaidBossTitle from "./RaidBossTitle";
import FastestKills from "./FastestKills";
import RecentKills from "./RecentKills";
import Characters from "./Characters";

import OverflowScroll from "../OverflowScroll";

import { setRaidBossTab, navigationSetItem } from "../../redux/actions";

function RaidBoss({ raidName, bossName }) {
    const { selectedTab, difficulty } = useSelector(state => {
        return {
            ...state.raidBoss.characters,
            selectedTab: state.raidBoss.tab.selectedTab,
            difficulty: state.raid.filter.difficulty,
            filter: state.raid.filter,
            page: state.raidBoss.page.currentPage
        };
    }, shallowEqual);

    const raidId = raidNameToId[raidName];
    const combatMetric = selectedTab === 0 ? "dps" : "hps";

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(navigationSetItem(bossName));

        return () => dispatch(navigationSetItem(null));
    }, [bossName, dispatch]);

    return (
        <React.Fragment>
            <RaidBossTitle
                raidId={raidId}
                bossName={bossName}
                difficulty={difficulty}
            />
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
                {(() => {
                    switch (selectedTab) {
                        case 0:
                        case 1:
                            return (
                                <Characters
                                    combatMetric={combatMetric}
                                    raidId={raidId}
                                    bossName={bossName}
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
                })()}
            </OverflowScroll>
        </React.Fragment>
    );
}

export default RaidBoss;
