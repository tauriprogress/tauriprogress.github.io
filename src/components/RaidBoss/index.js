import { raidNameId } from "tauriprogress-constants";
import React, { useEffect } from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import RaidBossTitle from "./RaidBossTitle";
import Characters from "./Characters";

import {
    raidBossSetTab,
    navigationSetItem,
    raidBossFastestKillsFetch,
    raidBossRecentKillsFetch,
} from "../../redux/actions";

import {
    raidFilterDifficultySelector,
    raidBossTabSelectedTabSelector,
    raidBossFastestKillsEntireSelector,
    raidBossRecentKillsEntireSelector,
} from "../../redux/selectors";
import RaidBossLogs from "./RaidBossLogs";

function RaidBoss({ raidName, bossName }) {
    const { selectedTab, difficulty } = useSelector((state) => {
        return {
            selectedTab: raidBossTabSelectedTabSelector(state),
            difficulty: raidFilterDifficultySelector(state),
        };
    }, shallowEqual);

    const raidId = raidNameId[raidName];
    const combatMetric = selectedTab === 0 ? "dps" : "hps";

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(navigationSetItem(bossName));

        return () => dispatch(navigationSetItem(null));
    }, [bossName, dispatch]);

    const fetch =
        selectedTab === 2
            ? raidBossFastestKillsFetch
            : raidBossRecentKillsFetch;
    const selector =
        selectedTab === 2
            ? raidBossFastestKillsEntireSelector
            : raidBossRecentKillsEntireSelector;
    return (
        <React.Fragment>
            <RaidBossTitle
                raidId={raidId}
                bossName={bossName}
                difficulty={difficulty}
            />
            <Tabs
                value={selectedTab}
                onChange={(e, value) => dispatch(raidBossSetTab(value))}
                textColor="secondary"
                indicatorColor="secondary"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
            >
                <Tab label="Dps" />
                <Tab label="Hps" />
                <Tab label="Fastest" />
                <Tab label="Latest" />
            </Tabs>

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
                    case 3:
                        return (
                            <RaidBossLogs
                                raidId={raidId}
                                bossName={bossName}
                                difficulty={difficulty}
                                fetch={fetch}
                                selector={selector}
                            />
                        );
                    default:
                        return 0;
                }
            })()}
        </React.Fragment>
    );
}

export default RaidBoss;
