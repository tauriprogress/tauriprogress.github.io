import { characterClasses } from "tauriprogress-constants";
import React from "react";

import { useSelector } from "react-redux";

import GuildRosterChart from "./GuildRosterChart";
import GuildRosterList from "./GuildRosterList";
import AsideContainer from "../AsideContainer";

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
        <AsideContainer
            AsideComponent={() => (
                <GuildRosterChart
                    classInfo={classInfo}
                    maxClassCount={maxClassCount}
                />
            )}
        >
            <GuildRosterList
                members={members}
                classInfo={classInfo}
                ranks={ranks}
            />
        </AsideContainer>
    );
}

export default GuildRoster;
