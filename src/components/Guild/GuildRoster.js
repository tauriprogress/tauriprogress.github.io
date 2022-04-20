import React from "react";

import { shallowEqual, useSelector } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import GuildRosterChart from "./GuildRosterChart";
import GuildRosterList from "./GuildRosterList";
import GuildLatestKills from "./GuildRecentKills";

import {
    guildMembersSelector,
    environmentCharacterClassNamesSelector,
} from "../../redux/selectors";

function styles(theme) {
    return {
        gridItemFlex: {
            flex: 1,
        },
        container: {
            margin: `${theme.spacing(2)}px 0`,
            padding: `${theme.spacing(2)}px 0`,
        },
    };
}

function GuildRoster({ classes }) {
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
        <Grid
            container
            justifyContent="space-around"
            className={classes.container}
        >
            <Grid item>
                <GuildRosterChart
                    classInfo={classInfo}
                    maxClassCount={maxClassCount}
                    totalChars={totalChars}
                />
            </Grid>
            <Grid item className={classes.gridItemFlex}>
                <GuildRosterList members={members} classInfo={classInfo} />
            </Grid>
            <Grid item>
                <GuildLatestKills />
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(GuildRoster);
