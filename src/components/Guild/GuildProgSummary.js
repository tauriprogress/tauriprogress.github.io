import React from "react";

import { shallowEqual, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";

import GuildRaidSummary from "./GuildRaidSummary";

import { getNestedObjectValue } from "../../helpers";

function GuildProgSummary() {
    const { progression, raids, difficultyNames, completionDifficulties } =
        useSelector(
            state => ({
                progression: state.guild.data.progression,
                raids: state.environment.currentContent.raids,
                difficultyNames: state.environment.difficultyNames,
                completionDifficulties:
                    state.environment.currentContent.completionDifficulties
            }),
            shallowEqual
        );

    let data = [];

    for (let raid of raids) {
        const difficulties = raid.difficulties;
        const bossNames = raid.bosses.map(boss => boss.name);

        let raidData = {
            name: raid.name,
            totalBosses: bossNames.length,
            defeatedBosses: 0,
            bosses: [],
            image: raid.image,
            difficulties: difficulties
        };

        for (let bossName of bossNames) {
            let bossData = {
                name: bossName
            };
            let defeated = false;
            for (let difficulty of difficulties) {
                const categorization = [
                    "raids",
                    raid.name,
                    difficulty,
                    bossName,
                    "firstKill"
                ];

                const kill = getNestedObjectValue(progression, categorization);

                bossData[difficulty] = kill;

                if (kill && completionDifficulties.includes(difficulty)) {
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
        <Grid container justifyContent="center">
            {data.map(raidData => (
                <Grid item key={raidData.name}>
                    <GuildRaidSummary
                        data={raidData}
                        difficultyNames={difficultyNames}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default GuildProgSummary;
