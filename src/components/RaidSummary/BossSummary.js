import React from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import WithRealm from "../WithRealm";
import LogLink from "../LogLink";
import Avatar from "../Avatar";
import Link from "../Link";

import { applyFilter } from "./helpers";

import {
    convertFightLength,
    dateToString,
    getSpecImg,
    shortNumber,
    capitalize,
} from "../../helpers";

function styles(theme) {
    return {
        container: {
            width: "280px",
            margin: theme.spacing(2),
            padding: theme.spacing(1),
        },
        list: {
            listStyle: "none",
            padding: 0,
            "& li": {
                marginBottom: "5px",
            },
        },
        listText: {
            margin: 0,
        },
        uppercase: {
            textTransform: "uppercase",
        },
        textOverflow: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        gridItem: {
            maxWidth: "50%",
        },
    };
}

function BossSummary({ theme, classes, bossInfo, data, filter, specs }) {
    const boss = applyFilter(data, filter, specs);
    const {
        palette: { classColors, factionColors },
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
                justifyContent="center"
                alignItems="center"
            >
                <FastestKills
                    classes={classes}
                    kills={boss && boss.fastestKills}
                    factionColors={factionColors}
                />
                <FirstKills
                    classes={classes}
                    kills={boss && boss.firstKills}
                    factionColors={factionColors}
                />
            </Grid>
            <Divider />

            <Grid container direction="row" justifyContent="center">
                {["dps", "hps"].map((combatMetric) =>
                    boss && boss[`best${capitalize(combatMetric)}`].length ? (
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
                                    (character) => (
                                        <li
                                            key={`${character._id} ${character.f}`}
                                        >
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
                                                <Avatar
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
                                                    to={`/character/${character.name}?realm=${character.realm}`}
                                                    style={{
                                                        color: classColors[
                                                            character.class
                                                        ].text,
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

const FastestKills = React.memo(({ classes, kills, factionColors }) => {
    return (
        <Grid className={classes.gridItem} item xs>
            <Typography variant="subtitle2" align="center">
                Fastest kills
            </Typography>
            <ul className={classes.list}>
                {kills &&
                    kills.map((log) => (
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
                                            : "",
                                    }}
                                >
                                    {log.guild ? (
                                        <Link
                                            style={{
                                                color: "inherit",
                                            }}
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
                                    {convertFightLength(log.fightLength)}
                                </LogLink>
                            </p>
                        </li>
                    ))}
            </ul>
        </Grid>
    );
}, compareKills);

const FirstKills = React.memo(({ classes, kills, factionColors }) => {
    return (
        <Grid className={classes.gridItem} item xs>
            <Typography variant="subtitle2" align="center">
                First kills
            </Typography>
            <ul className={classes.list}>
                {kills &&
                    kills.map((log) => (
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
                                            : "",
                                    }}
                                >
                                    {log.guild ? (
                                        <Link
                                            style={{
                                                color: "inherit",
                                            }}
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
                                    {dateToString(new Date(log.date * 1000))}
                                </LogLink>
                            </p>
                        </li>
                    ))}
            </ul>
        </Grid>
    );
}, compareKills);

function compareKills(prevProps, nextProps) {
    if (prevProps.kills === nextProps.kills) {
        return true;
    } else if (
        prevProps.kills &&
        nextProps.kills &&
        prevProps.kills.length === nextProps.kills.length
    ) {
        let counter = 0;
        for (let i = 0; i < prevProps.kills.length; i++) {
            if (
                prevProps.kills[i].id === nextProps.kills[i].id &&
                prevProps.kills[i].realm === nextProps.kills[i].realm
            ) {
                counter++;
            }
        }

        if (counter === prevProps.kills.length) {
            return true;
        }
    }

    return false;
}
export default withStyles(styles)(withTheme(BossSummary));
