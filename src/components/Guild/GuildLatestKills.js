import React from "react";

import { withStyles } from "@material-ui/core/styles";

import SideCard from "../SideCard";
import LatestKills from "../LatestKills";

import { useSelector } from "react-redux";

function styles(theme) {
    return {
        container: {
            display: "flex",
            flexDirection: "column",
            marginTop: theme.spacing(1),
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                marginTop: theme.spacing(1)
            },
            height: "480px"
        },
        latestKills: {
            flex: 1,
            overflowY: "scroll"
        }
    };
}

function GuildLastestKills({ classes }) {
    const { latestKills, realm } = useSelector(state => ({
        latestKills: state.guild.data.progression.latestKills,
        realm: state.guild.data.realm
    }));

    return (
        <SideCard title="Latest Kills" className={classes.container}>
            <LatestKills
                logs={latestKills}
                realm={realm}
                className={classes.latestKills}
            />
        </SideCard>
    );
}

export default withStyles(styles)(GuildLastestKills);
