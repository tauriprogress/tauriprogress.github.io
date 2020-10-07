import React from "react";

import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";

import GuildRaidSummary from "./GuildRaidSummary";

import { getNestedObjectValue } from "../../helpers";

function GuildProgSummary() {
    const { progression, raids } = useSelector(state => ({
        progression: state.guild.data.progression,
        raids: state.environment.currentContent.raids
    }));
    let data = [];

    for (let raid of raids) {
        const difficulties = raid.difficulties;
        const bossNames = raid.bosses.map(boss => boss.name);

        let raidData = {
            name: raid.name,
            totalBosses: bossNames.length,
            defeatedBosses: 0,
            bosses: [],
            image: raid.image
        };

        for (let bossName of bossNames) {
            let bossData = {
                name: bossName
            };
            let defeated = false;
            for (let difficulty of difficulties) {
                const categorization = [
                    raid.name,
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
                <Grid item key={raidData.name}>
                    <GuildRaidSummary data={raidData} />
                </Grid>
            ))}
        </Grid>
    );
}

export default GuildProgSummary;
