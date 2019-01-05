import React from "react";

import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

import specToClass from "../../constants/specToClass";
import characterClassColors from "../../constants/characterClassColors";

import { convertFightTime, getSpecImg } from "./helpers";

function BossInfo({ boss }) {
    const { bestDps, bestHps } = boss;
    return (
        <React.Fragment>
            <Typography variant="subtitle1" className="textBold">
                {boss.killCount} Kills
            </Typography>
            <div className="bossInfoGuild">
                <Typography variant="subtitle1" className="textBold">
                    Fastest Kill:
                </Typography>
                <Typography className="textBold">
                    <span
                        className={
                            boss.fastestKills.guilddata.faction ? "red" : "blue"
                        }
                    >
                        <Link
                            to={`/guild/${
                                boss.fastestKills.guilddata.name
                            }?realm=${boss.fastestKills.realm}`}
                        >
                            {boss.fastestKills.guilddata.name}
                        </Link>
                    </span>
                </Typography>
                <Typography variant="caption">
                    {boss.fastestKills.realm}
                </Typography>
                <Typography>
                    <span className="textBold">
                        {convertFightTime(boss.fastestKills.fight_time)}{" "}
                    </span>

                    {new Date(
                        boss.fastestKills.killtime * 1000
                    ).toLocaleDateString()}
                </Typography>
            </div>
            <Grid container className="bossInfoCharsContainer">
                <Grid item xs className="bossInfoChar">
                    <Typography>
                        <Tooltip title={bestDps.spec.label}>
                            <Avatar
                                component="span"
                                src={getSpecImg(bestDps.spec.image)}
                                className="classSpecAvatar"
                            />
                        </Tooltip>
                        <span
                            style={{
                                color:
                                    characterClassColors[
                                        specToClass[bestDps.spec.id]
                                    ]
                            }}
                            className={"BossInfoCharName"}
                        >
                            <Link
                                to={`/player/${bestDps.name}?realm=${
                                    bestDps.realm
                                }`}
                            >
                                {bestDps.name}
                            </Link>
                        </span>
                        <br />
                        <span className="textBold"> {bestDps.ilvl} ILVL</span>
                        <br />
                        <span className="textBold">
                            {new Intl.NumberFormat().format(
                                Math.round(bestDps.dps)
                            )}{" "}
                            DPS
                        </span>
                    </Typography>
                </Grid>
                <Grid item xs className="bossInfoChar">
                    <Typography>
                        <Tooltip title={bestHps.spec.label}>
                            <Avatar
                                component="span"
                                src={getSpecImg(bestHps.spec.image)}
                                className="classSpecAvatar"
                            />
                        </Tooltip>
                        <span
                            style={{
                                color:
                                    characterClassColors[
                                        specToClass[bestHps.spec.id]
                                    ]
                            }}
                            className={"BossInfoCharName"}
                        >
                            <Link
                                to={`/player/${bestHps.name}?realm=${
                                    bestHps.realm
                                }`}
                            >
                                {bestHps.name}
                            </Link>
                        </span>
                        <br />
                        <span className="textBold"> {bestHps.ilvl} ILVL</span>

                        <br />
                        <span className="textBold">
                            {new Intl.NumberFormat().format(
                                Math.round(bestHps.hps)
                            )}{" "}
                            HPS
                        </span>
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default BossInfo;
