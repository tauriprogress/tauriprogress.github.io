import React from "react";

import { withStyles, withTheme } from "@material-ui/core/styles";

import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import allianceEmblem from "../../assets/faction/alliance.png";
import hordeEmblem from "../../assets/faction/horde.png";

function styles(theme) {
    return {
        container: {
            padding: "0 10px"
        },
        emblem: {
            height: "70px",
            margin: "0 10px"
        }
    };
}

function GuildIntroduction({ classes, theme }) {
    const {
        guildName,
        guildFaction,
        guildMemberCount,
        guildRealm
    } = useSelector(state => ({
        guildName: state.guild.data.guildName,
        guildFaction: state.guild.data.faction,
        guildMemberCount: state.guild.data.guildMembersCount,
        guildRealm: state.guild.data.realm
    }));

    const emblem = guildFaction ? hordeEmblem : allianceEmblem;

    const {
        palette: { factionColors }
    } = theme;

    const factionColor =
        guildFaction === 0 ? factionColors.alliance : factionColors.horde;

    return (
        <Grid className={classes.container} container wrap="nowrap">
            <Grid item>
                <img
                    className={classes.emblem}
                    src={emblem}
                    alt="faction emblem"
                />
            </Grid>
            <Grid item>
                <Typography variant="h4">
                    <Link
                        target="_blank"
                        href={`https://tauriwow.com/armory#guild-info.xml?r=${guildRealm}&gn=${guildName}`}
                        rel="noopener noreferrer"
                        style={{
                            color: factionColor
                        }}
                    >
                        {guildName}
                    </Link>
                </Typography>
                <Typography color="textSecondary">
                    {guildFaction ? "Horde" : "Alliance"}, {guildRealm},{" "}
                    {guildMemberCount} members
                </Typography>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(withTheme(GuildIntroduction));
