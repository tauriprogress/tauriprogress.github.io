import React from "react";

import { withStyles, withTheme } from "@material-ui/core/styles";

import { shallowEqual, useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import { getFactionImg } from "../../helpers";

import {
    guildNameSelector,
    guildFactionSelector,
    guildMembersCountSelector,
    guildRealmSelector
} from "../../redux/guild/selectors";

function styles(theme) {
    return {
        container: {
            padding: `0 ${theme.spacing(1)}px`,
            marginBottom: theme.spacing(1),
            textAlign: "left"
        },
        emblem: {
            height: "70px",
            margin: `0 ${theme.spacing(1)}px`
        },
        textNoWrap: {
            whiteSpace: "nowrap"
        }
    };
}

function GuildTitle({ classes, theme }) {
    const { name, faction, membersCount, realm } = useSelector(
        state => ({
            name: guildNameSelector(state),
            faction: guildFactionSelector(state),
            membersCount: guildMembersCountSelector(state),
            realm: guildRealmSelector(state)
        }),
        shallowEqual
    );

    const emblem = getFactionImg(faction);

    const {
        palette: { factionColors }
    } = theme;

    const factionColor =
        faction === 0 ? factionColors.alliance : factionColors.horde;

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
                        href={`https://tauriwow.com/armory#guild-info.xml?r=${realm}&gn=${name}`}
                        rel="noopener noreferrer"
                        style={{
                            color: factionColor
                        }}
                    >
                        {name}
                    </Link>
                </Typography>
                <Typography color="textSecondary">
                    <span className={classes.textNoWrap}>{realm}</span>
                    <br />
                    {faction ? "Horde" : "Alliance"},{" "}
                    <span className={classes.textNoWrap}>
                        {membersCount} members
                    </span>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(withTheme(GuildTitle));
