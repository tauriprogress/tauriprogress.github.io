import React from "react";

import { withStyles } from "@material-ui/core/styles";

import TitledContainer from "../TitledContainer";
import RecentKills from "../RecentKills";

import { shallowEqual, useSelector } from "react-redux";

import {
    guildProgressionRecentKillsSelector,
    guildRealmSelector
} from "../../redux/guild/selectors";

function styles(theme) {
    return {
        container: {
            display: "flex",
            flexDirection: "column",
            height: "480px"
        },
        recentKills: {
            flex: 1,
            overflowY: "scroll"
        }
    };
}

function GuildLastestKills({ classes }) {
    const { recentKills, realm } = useSelector(
        state => ({
            recentKills: guildProgressionRecentKillsSelector(state),
            realm: guildRealmSelector(state)
        }),
        shallowEqual
    );

    return (
        <TitledContainer title="Recent Kills" className={classes.container}>
            <RecentKills
                logs={recentKills}
                realm={realm}
                className={classes.recentKills}
            />
        </TitledContainer>
    );
}

export default withStyles(styles)(GuildLastestKills);
