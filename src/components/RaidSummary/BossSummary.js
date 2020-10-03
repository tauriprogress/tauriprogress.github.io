import React from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import WithRealm from "../WithRealm";
import LogLink from "../LogLink";

import { applyFilter } from "./helpers";

import { convertFightTime, dateToString } from "../../helpers";

function styles(theme) {
    return {
        container: {
            width: "280px",
            margin: theme.spacing(1)
        },
        list: {
            listStyle: "none",
            padding: 0,
            "& li": {
                marginBottom: "5px"
            }
        },
        listText: {
            margin: 0
        }
    };
}

function BossSummary({ theme, classes, bossInfo, data, filter, specs }) {
    const boss = applyFilter(data, filter, specs);
    const {
        palette: { classColors, factionColors }
    } = theme;

    return (
        <div className={classes.container}>
            <Typography variant="h5" align="center">
                {bossInfo.name}
            </Typography>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs>
                    <Typography variant="subtitle2" align="center">
                        Fastest kills
                    </Typography>
                    <ul className={classes.list}>
                        {boss.fastestKills.map(log => (
                            <li key={log.id}>
                                <WithRealm realmName={log.realm}>
                                    <p
                                        className={classes.listText}
                                        style={{
                                            color: log.guild
                                                ? factionColors[
                                                      log.guild.f
                                                          ? "horde"
                                                          : "alliance"
                                                  ]
                                                : ""
                                        }}
                                    >
                                        {log.guild ? (
                                            <Link
                                                style={{
                                                    color: "inherit"
                                                }}
                                                component={RouterLink}
                                                to={`/guild/${log.guild.name}?realm=${log.realm}`}
                                            >
                                                {log.guild.name}
                                            </Link>
                                        ) : (
                                            "Random"
                                        )}
                                    </p>
                                </WithRealm>

                                <p className={classes.listText}>
                                    <LogLink logId={log.id} realm={log.realm}>
                                        {convertFightTime(log.fightLength)}
                                    </LogLink>
                                </p>
                            </li>
                        ))}
                    </ul>
                </Grid>
                <Grid item xs>
                    <Typography variant="subtitle2" align="center">
                        First kills
                    </Typography>
                    <ul className={classes.list}>
                        {boss.firstKills.map(log => (
                            <li key={log.id}>
                                <WithRealm realmName={log.realm}>
                                    <p
                                        className={classes.listText}
                                        style={{
                                            color: log.guild
                                                ? factionColors[
                                                      log.guild.f
                                                          ? "horde"
                                                          : "alliance"
                                                  ]
                                                : ""
                                        }}
                                    >
                                        {log.guild ? (
                                            <Link
                                                style={{
                                                    color: "inherit"
                                                }}
                                                component={RouterLink}
                                                to={`/guild/${log.guild.name}?realm=${log.realm}`}
                                            >
                                                {log.guild.name}
                                            </Link>
                                        ) : (
                                            "Random"
                                        )}
                                    </p>
                                </WithRealm>

                                <p className={classes.listText}>
                                    <LogLink logId={log.id} realm={log.realm}>
                                        {dateToString(
                                            new Date(log.date * 1000)
                                        )}
                                    </LogLink>
                                </p>
                            </li>
                        ))}
                    </ul>
                </Grid>
            </Grid>
            <Divider />
            <div>
                <div>
                    <p>DPS</p>
                    <ul>
                        {boss.bestDps.map(character => (
                            <li key={character._id}>
                                {character.name}
                                {character.dps}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p>HPS</p>
                    <ul>
                        {boss.bestHps.map(character => (
                            <li key={character._id}>
                                {character.name}
                                {character.hps}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(withTheme(BossSummary));
