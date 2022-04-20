import React, { useState } from "react";

import { shallowEqual, useSelector } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import GuildKillLogs from "./GuildKillLogs";

import { getNestedObjectValue } from "../../helpers";
import { Typography } from "@material-ui/core";

import OverflowScroll from "../OverflowScroll";

import {
    guildProgressionFilterSelector,
    guildProgressionSelector,
    environmentDifficultyNamesSelector,
    environmentRaidsSelector,
} from "../../redux/selectors";

function GuildBoss() {
    const { filter, data, difficultyNames } = useSelector(
        (state) => ({
            filter: guildProgressionFilterSelector(state),
            data: guildProgressionSelector(state),
            raids: environmentRaidsSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
        }),
        shallowEqual
    );

    const difficulty = filter.difficulty;

    const [tab, selectTab] = useState(0);

    let boss = getNestedObjectValue(data, [
        "raids",
        filter.raid,
        difficulty,
        filter.boss,
    ]);

    if (!boss) {
        boss = {
            dps: [],
            hps: [],
            fastestKills: [],
        };
    }

    return (
        <React.Fragment>
            <Typography variant="h4" align="center">
                {filter.boss} {difficultyNames[difficulty]}
                <Typography variant="caption" color="textSecondary">
                    {" "}
                    {boss.killCount ? `${boss.killCount} Kills` : "Alive"}
                </Typography>
            </Typography>
            {boss.killCount && (
                <React.Fragment>
                    <Tabs
                        value={tab}
                        onChange={(e, tab) => selectTab(tab)}
                        indicatorColor="secondary"
                    >
                        <Tab label="Fastest Kills" className="tab" />
                        <Tab label="Latest Kills" className="tab" />
                        <Tab label="First Kills" className="tab" />
                    </Tabs>
                    <OverflowScroll>
                        {(() => {
                            switch (tab) {
                                case 0:
                                    return (
                                        <GuildKillLogs
                                            data={boss.fastestKills}
                                        />
                                    );
                                case 1:
                                    return (
                                        <GuildKillLogs
                                            data={boss.latestKills}
                                        />
                                    );
                                case 2:
                                    return (
                                        <GuildKillLogs data={boss.firstKills} />
                                    );
                                default:
                                    return null;
                            }
                        })()}
                    </OverflowScroll>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default GuildBoss;
