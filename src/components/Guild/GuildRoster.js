import { characterClasses } from "tauriprogress-constants";
import React from "react";

import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";

import GuildRosterChart from "./GuildRosterChart";
import GuildRosterList from "./GuildRosterList";
import { Typography } from "@material-ui/core";

function GuildRoster() {
    const members = useSelector(state => state.guild.data.guildList);

    let countClasses = {};
    let classInfo = [];
    let maxClassCount = 0;
    let nameRanks = {};
    let ranks = [];

    for (let classId in characterClasses) {
        countClasses[classId] = 0;
    }
    for (let member of members) {
        countClasses[member.class] += 1;
        nameRanks[member.rank_name] = true;
    }

    for (let classId in countClasses) {
        if (countClasses[classId] > maxClassCount)
            maxClassCount = countClasses[classId];
        classInfo.push({ classId, count: countClasses[classId] });
    }

    for (let rankName in nameRanks) {
        ranks.push(rankName);
    }

    return (
        <Grid container justify="space-around" alignItems="center">
            <Grid item>
                <GuildRosterChart
                    classInfo={classInfo}
                    maxClassCount={maxClassCount}
                />
            </Grid>
            <Grid item style={{ flex: 1 }}>
                <GuildRosterList
                    members={members}
                    classInfo={classInfo}
                    ranks={ranks}
                />
            </Grid>
        </Grid>
    );
}

export default GuildRoster;
