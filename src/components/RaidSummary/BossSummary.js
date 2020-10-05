import React from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import WithRealm from "../WithRealm";
import LogLink from "../LogLink";
import SpecImg from "../SpecImg";

import { applyFilter } from "./helpers";

import {
    convertFightTime,
    dateToString,
    getSpecImg,
    shortNumber,
    capitalize
} from "../../helpers";

function styles(theme) {
    return {
        container: {
            width: "280px",
            margin: theme.spacing(2),
            padding: theme.spacing(1)
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
        },
        uppercase: {
            textTransform: "uppercase"
        },
        textOverflow: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        gridItem: {
            maxWidth: "50%"
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
            <Divider />

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid className={classes.gridItem} item xs>
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
                <Grid className={classes.gridItem} item xs>
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

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {["dps", "hps"].map(combatMetric =>
                    boss[`best${capitalize(combatMetric)}`].length ? (
                        <Grid
                            key={combatMetric}
                            className={classes.gridItem}
                            item
                            xs
                        >
                            <Typography
                                variant="subtitle2"
                                align="center"
                                className={classes.uppercase}
                            >
                                {combatMetric}
                            </Typography>
                            <ul className={classes.list}>
                                {boss[`best${capitalize(combatMetric)}`].map(
                                    character => (
                                        <li key={character._id}>
                                            <p
                                                className={`${classes.listText} ${classes.textOverflow}`}
                                            >
                                                <LogLink
                                                    logId={character.logId}
                                                    realm={character.realm}
                                                >
                                                    {shortNumber(
                                                        character[combatMetric]
                                                    )}
                                                </LogLink>{" "}
                                                <SpecImg
                                                    src={getSpecImg(
                                                        specs[character.spec]
                                                            .image
                                                    )}
                                                    title={
                                                        specs[character.spec]
                                                            .label
                                                    }
                                                />
                                                <Link
                                                    component={RouterLink}
                                                    to={`/player/${character.name}?realm=${character.realm}`}
                                                    style={{
                                                        color:
                                                            classColors[
                                                                character.class
                                                            ].text
                                                    }}
                                                >
                                                    {character.name}
                                                </Link>
                                            </p>
                                        </li>
                                    )
                                )}
                            </ul>
                        </Grid>
                    ) : null
                )}
            </Grid>
            <Divider />
        </div>
    );
}

export default withStyles(styles)(withTheme(BossSummary));
