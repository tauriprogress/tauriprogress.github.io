import { currentContent } from "tauriprogress-constants";
import React, { useState } from "react";

import { useSelector } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CharacterLadder from "../CharacterLadder";
import GuildFastestKills from "./GuildFastestKills";
import SelectDifficulty from "../SelectDifficulty";

import { getNestedObjectValue } from "../../helpers";
import { selectDefaultDifficulty } from "./helpers";
import { Typography } from "@material-ui/core";

function GuildBoss() {
    const {
        selectedRaidName,
        selectedBossName,
        progression,
        raids
    } = useSelector(state => ({
        ...state.guild,
        progression: state.guild.data.progression,
        raids: state.raidInfo.raids
    }));

    const [tab, selectTab] = useState(0);
    const [difficulty, setDifficulty] = useState(
        selectDefaultDifficulty(
            progression,
            currentContent.raidName,
            raids[currentContent.raidName].encounters[0].encounter_name
        )
    );

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
            <Typography variant="h4" align="center">
                {selectedBossName}
                <Typography variant="caption" color="textSecondary">
                    {" "}
                    {boss.killCount ? `${boss.killCount} Kills` : "Alive"}
                </Typography>
            </Typography>
            <SelectDifficulty
                difficulty={difficulty}
                onChange={(e, difficulty) => setDifficulty(difficulty)}
            />
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
                                data={tab === 0 ? boss.dps : boss.hps}
                                type={tab === 0 ? "dps" : "hps"}
                                disableFilter={{
                                    faction: true,
                                    realm: true
                                }}
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
