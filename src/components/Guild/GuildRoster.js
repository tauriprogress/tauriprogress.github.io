import React from "react";

import { shallowEqual, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";

import GuildRosterChart from "./GuildRosterChart";
import GuildRosterList from "./GuildRosterList";

import {
    guildMembersSelector,
    environmentCharacterClassNamesSelector,
} from "../../redux/selectors";
import { styled } from "@mui/system";

const Container = styled(Grid)(({ theme }) => ({
    margin: `${theme.spacing(2)} 0`,
    padding: `${theme.spacing(2)} 0`,
}));

const FlexGrid = styled(Grid)({
    flex: 1,
});

function GuildRoster() {
    const { members, characterClassNames } = useSelector(
        (state) => ({
            members: guildMembersSelector(state),
            characterClassNames: environmentCharacterClassNamesSelector(state),
        }),
        shallowEqual
    );

    const totalChars = members.length;
    let countClasses = {};
    let classInfo = [];
    let maxClassCount = 0;

    for (let classId in characterClassNames) {
        countClasses[classId] = 0;
    }
    for (let member of members) {
        countClasses[member.class] += 1;
    }

    for (let classId in countClasses) {
        if (countClasses[classId] > maxClassCount)
            maxClassCount = countClasses[classId];
        classInfo.push({ classId, count: countClasses[classId] });
    }

    return (
        <Container container justifyContent="space-around">
            <FlexGrid item>
                <GuildRosterList members={members} classInfo={classInfo} />
            </FlexGrid>
            <Grid item>
                <GuildRosterChart
                    classInfo={classInfo}
                    maxClassCount={maxClassCount}
                    totalChars={totalChars}
                />
            </Grid>
        </Container>
    );
}

export default GuildRoster;
