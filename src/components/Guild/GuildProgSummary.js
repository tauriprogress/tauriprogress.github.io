import { currentContent } from "tauriprogress-constants";
import React from "react";

import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";

import GuildRaidSummary from "./GuildRaidSummary";

import { getNestedObjectValue } from "../../helpers";

function GuildProgSummary() {
    const { progression, raids } = useSelector(state => ({
        progression: state.guild.data.progression,
        raids: state.raidInfo.raids
    }));
    let data = [];

    for (let raid of currentContent.raids) {
        const difficulties = raids[raid.raidName].difficulties;
        const bossNames = raids[raid.raidName].encounters.map(
            boss => boss.encounter_name
        );

        let raidData = {
            raidName: raid.raidName,
            totalBosses: bossNames.length,
            defeatedBosses: 0,
            bosses: [],
            picture: raids[raid.raidName].picture
        };

        for (let bossName of bossNames) {
            let bossData = {
                bossName: bossName
            };
            let defeated = false;
            for (let difficulty of difficulties) {
                const categorization = [
                    raid.raidName,
                    difficulty,
                    bossName,
                    "firstKill"
                ];

                const kill = getNestedObjectValue(progression, categorization);

                bossData[difficulty] = kill;

                if (kill) {
                    defeated = true;
                }
            }

            raidData.bosses.push(bossData);

            if (defeated) {
                raidData.defeatedBosses += 1;
            }
        }

        data.push(raidData);
    }

    return (
        <Grid container justify="center">
            {data.map(raidData => (
                <Grid item key={raidData.raidName}>
                    <GuildRaidSummary data={raidData} />
                </Grid>
            ))}
        </Grid>
    );
}

export default GuildProgSummary;
