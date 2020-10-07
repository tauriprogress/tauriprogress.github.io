import React from "react";

import { withStyles } from "@material-ui/core/styles";

import SideCard from "../SideCard";
import RecentKills from "../RecentKills";

import { useSelector } from "react-redux";

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
    const { recentKills, realm } = useSelector(state => ({
        recentKills: state.guild.data.progression.recentKills,
        realm: state.guild.data.realm
    }));

    return (
        <SideCard title="Recent Kills" className={classes.container}>
            <RecentKills
                logs={recentKills}
                realm={realm}
                className={classes.recentKills}
            />
        </SideCard>
    );
}

export default withStyles(styles)(GuildLastestKills);
