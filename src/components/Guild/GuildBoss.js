import React, { useState } from "react";

import { useSelector } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CharacterLadder from "../CharacterLadder";
import GuildFastestKills from "./GuildFastestKills";

import { getNestedObjectValue } from "../../helpers";
import { Typography } from "@material-ui/core";
import RaidFilter from "../RaidFilter";

function GuildBoss() {
    const {
        selectedRaidName,
        selectedBossName,
        progression,
        filter,
        difficultyNames
    } = useSelector(state => ({
        ...state.guild,
        progression: state.guild.data.progression,
        raids: state.environment.currentContent.raids,
        filter: state.raid.filter,
        difficultyNames: state.environment.difficultyNames
    }));

    filter.realm = "";
    filter.faction = "";

    const difficulty = filter.difficulty;

    const [tab, selectTab] = useState(0);

    let boss = getNestedObjectValue(progression, [
        selectedRaidName,
        difficulty,
        selectedBossName
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
            <RaidFilter />
            <Typography variant="h4" align="center">
                {selectedBossName} {difficultyNames[difficulty]}
                <Typography variant="caption" color="textSecondary">
                    {" "}
                    {boss.killCount ? `${boss.killCount} Kills` : "Alive"}
                </Typography>
            </Typography>
            <Tabs
                value={tab}
                onChange={(e, tab) => selectTab(tab)}
                indicatorColor="secondary"
            >
                <Tab label="Dps" className="tab" />
                <Tab label="Hps" className="tab" />
                <Tab label="Fastest Kills" className="tab" />
            </Tabs>

            {(() => {
                switch (tab) {
                    case 0:
                    case 1:
                        return (
                            <CharacterLadder
                                data={
                                    tab === 0
                                        ? Object.values(boss.dps).sort(
                                              (a, b) => b.dps - a.dps
                                          )
                                        : Object.values(boss.hps).sort(
                                              (a, b) => b.hps - a.hps
                                          )
                                }
                                type={tab === 0 ? "dps" : "hps"}
                                rowsPerPage={15}
                                filter={filter}
                            />
                        );
                    case 2:
                        return <GuildFastestKills data={boss.fastestKills} />;
                    default:
                        return null;
                }
            })()}
        </React.Fragment>
    );
}

export default GuildBoss;
