import { difficultyLabels } from "tauriprogress-constants";
import React from "react";

import { withStyles } from "@material-ui/core/styles";

import LatestKills from "../LatestKills";

import { useSelector } from "react-redux";

function styles(theme) {
    return {
        container: {
            marginTop: theme.spacing(6),
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                marginTop: theme.spacing(1)
            },
            height: "480px"
        }
    };
}

function GuildLastestKills({ classes }) {
    const { latestKills, realm } = useSelector(state => ({
        latestKills: state.guild.data.progression.latestKills,
        realm: state.guild.data.realm
    }));

    return (
        <LatestKills
            logs={latestKills}
            realm={realm}
            className={classes.container}
        />
    );
}

export default withStyles(styles)(GuildLastestKills);
