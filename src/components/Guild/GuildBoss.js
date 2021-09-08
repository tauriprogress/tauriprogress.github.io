import React, { useState } from "react";

import { shallowEqual, useSelector } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CharacterLadder from "../CharacterLadder";
import GuildFastestKills from "./GuildFastestKills";

import { getNestedObjectValue } from "../../helpers";
import { Typography } from "@material-ui/core";

import OverflowScroll from "../OverflowScroll";

import {
    guildProgressionFilterSelector,
    guildProgressionSelector
} from "../../redux/guild/selectors";

function GuildBoss() {
    const { filter, data, difficultyNames } = useSelector(
        state => ({
            filter: guildProgressionFilterSelector(state),
            data: guildProgressionSelector(state),
            raids: state.environment.currentContent.raids,
            difficultyNames: state.environment.difficultyNames
        }),
        shallowEqual
    );

    const difficulty = filter.difficulty;

    const [tab, selectTab] = useState(0);

    let boss = getNestedObjectValue(data, [
        "raids",
        filter.raid,
        difficulty,
        filter.boss
    ]);

    if (!boss) {
        boss = {
            dps: [],
            hps: [],
            fastestKills: []
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
                        <Tab label="Dps" className="tab" />
                        <Tab label="Hps" className="tab" />
                        <Tab label="Fastest Kills" className="tab" />
                    </Tabs>
                    <OverflowScroll>
                        {(() => {
                            switch (tab) {
                                case 0:
                                case 1:
                                    return (
                                        <CharacterLadder
                                            data={
                                                tab === 0
                                                    ? Object.values(
                                                          boss.dps
                                                      ).sort(
                                                          (a, b) =>
                                                              b.dps - a.dps
                                                      )
                                                    : Object.values(
                                                          boss.hps
                                                      ).sort(
                                                          (a, b) =>
                                                              b.hps - a.hps
                                                      )
                                            }
                                            type={tab === 0 ? "dps" : "hps"}
                                            rowsPerPage={15}
                                            filter={filter}
                                        />
                                    );
                                case 2:
                                    return (
                                        <GuildFastestKills
                                            data={boss.fastestKills}
                                        />
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
