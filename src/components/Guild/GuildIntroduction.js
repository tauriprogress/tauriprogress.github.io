import React from "react";

import { withStyles, withTheme } from "@material-ui/core/styles";

import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import allianceEmblem from "../../assets/faction/alliance.png";
import hordeEmblem from "../../assets/faction/horde.png";

function styles(theme) {
    return {
        container: {
            textAlign: "center"
        },
        emblem: {
            height: "150px"
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
        <div className={classes.container}>
            <img className={classes.emblem} src={emblem} alt="faction emblem" />
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
                {guildFaction ? "Horde" : "Alliance"}, {guildRealm}
            </Typography>
            <Typography color="textSecondary" variant="caption">
                {guildMemberCount} members
            </Typography>
        </div>
    );
}

export default withStyles(styles)(withTheme(GuildIntroduction));
