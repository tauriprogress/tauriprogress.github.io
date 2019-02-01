import { specToClass } from "tauriprogress-constants";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { withTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

import LogLink from "../LogLink";

import { convertFightTime, getSpecImg } from "./helpers";

class RaidBosses extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 5
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
    }

    handleChange(e, value) {
        this.setState({ ...this.state, value: value });
    }

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const {
            data,
            raidName,
            raidBosses,
            theme: {
                palette: { classColors, factionColors }
            }
        } = this.props;

        return (
            <React.Fragment>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="secondary"
                >
                    <Tab label="10 HC" value={5} className="tab" />
                    <Tab label="25 HC" value={6} className="tab" />
                </Tabs>
                <div className="overflowScroll">
                    <Table>
                        <TableHead className="tableHead">
                            <TableRow>
                                <TableCell>Boss name</TableCell>
                                <TableCell>Kills</TableCell>
                                <TableCell>Fastest</TableCell>
                                <TableCell>Dps</TableCell>
                                <TableCell>Hps</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {raidBosses.map((boss, index) => {
                                const currentBoss =
                                    data[this.state.value][boss.encounter_name];
                                return (
                                    <TableRow key={currentBoss.bossName}>
                                        <TableCell component="th" scope="row">
                                            <Typography color="inherit">
                                                <span className="textBold">
                                                    <RouterLink
                                                        to={`/raid/${raidName}/${
                                                            currentBoss.bossName
                                                        }`}
                                                    >
                                                        <Link
                                                            component="span"
                                                            color="inherit"
                                                        >
                                                            {
                                                                currentBoss.bossName
                                                            }
                                                        </Link>
                                                    </RouterLink>
                                                </span>
                                            </Typography>
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <span className="textBold">
                                                {currentBoss.killCount}{" "}
                                            </span>
                                            Kills
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <Typography color="inherit">
                                                <LogLink
                                                    logId={
                                                        currentBoss.fastestKills
                                                            .log_id
                                                    }
                                                    realm={
                                                        currentBoss.fastestKills
                                                            .realm
                                                    }
                                                />{" "}
                                                <span className="textBold">
                                                    {convertFightTime(
                                                        currentBoss.fastestKills
                                                            .fight_time
                                                    )}{" "}
                                                </span>
                                                <RouterLink
                                                    to={`/guild/${
                                                        currentBoss.fastestKills
                                                            .guilddata.name
                                                    }?realm=${
                                                        currentBoss.fastestKills
                                                            .realm
                                                    }`}
                                                >
                                                    <Link
                                                        component="span"
                                                        style={{
                                                            color: currentBoss
                                                                .fastestKills
                                                                .guilddata
                                                                .faction
                                                                ? factionColors.horde
                                                                : factionColors.alliance
                                                        }}
                                                    >
                                                        {
                                                            currentBoss
                                                                .fastestKills
                                                                .guilddata.name
                                                        }
                                                    </Link>
                                                </RouterLink>
                                            </Typography>
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <Typography color="inherit">
                                                <span
                                                    style={{
                                                        color:
                                                            classColors[
                                                                specToClass[
                                                                    currentBoss
                                                                        .bestDps
                                                                        .spec.id
                                                                ]
                                                            ]
                                                    }}
                                                    className={
                                                        "BossInfoCharName"
                                                    }
                                                >
                                                    <RouterLink
                                                        to={`/player/${
                                                            currentBoss.bestDps
                                                                .name
                                                        }?realm=${
                                                            currentBoss.bestDps
                                                                .realm
                                                        }`}
                                                    >
                                                        <Link
                                                            component="span"
                                                            color="inherit"
                                                        >
                                                            {
                                                                currentBoss
                                                                    .bestDps
                                                                    .name
                                                            }
                                                        </Link>
                                                    </RouterLink>
                                                </span>
                                                <br />
                                                <span className="textBold">
                                                    {new Intl.NumberFormat().format(
                                                        Math.round(
                                                            currentBoss.bestDps
                                                                .dps
                                                        )
                                                    )}{" "}
                                                </span>
                                                <Tooltip
                                                    title={
                                                        currentBoss.bestDps.spec
                                                            .label
                                                    }
                                                >
                                                    <Avatar
                                                        component="span"
                                                        src={getSpecImg(
                                                            currentBoss.bestDps
                                                                .spec.image
                                                        )}
                                                        className="classSpecAvatar"
                                                    />
                                                </Tooltip>
                                                <span className="textBold">
                                                    {currentBoss.bestDps.ilvl}{" "}
                                                </span>
                                            </Typography>
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <Typography color="inherit">
                                                <span
                                                    style={{
                                                        color:
                                                            classColors[
                                                                specToClass[
                                                                    currentBoss
                                                                        .bestHps
                                                                        .spec.id
                                                                ]
                                                            ]
                                                    }}
                                                    className={
                                                        "BossInfoCharName"
                                                    }
                                                >
                                                    <RouterLink
                                                        to={`/player/${
                                                            currentBoss.bestHps
                                                                .name
                                                        }?realm=${
                                                            currentBoss.bestHps
                                                                .realm
                                                        }`}
                                                    >
                                                        <Link
                                                            component="span"
                                                            color="inherit"
                                                        >
                                                            {
                                                                currentBoss
                                                                    .bestHps
                                                                    .name
                                                            }
                                                        </Link>
                                                    </RouterLink>
                                                </span>
                                                <br />
                                                <span className="textBold">
                                                    {new Intl.NumberFormat().format(
                                                        Math.round(
                                                            currentBoss.bestHps
                                                                .hps
                                                        )
                                                    )}{" "}
                                                </span>
                                                <Tooltip
                                                    title={
                                                        currentBoss.bestHps.spec
                                                            .label
                                                    }
                                                >
                                                    <Avatar
                                                        component="span"
                                                        src={getSpecImg(
                                                            currentBoss.bestHps
                                                                .spec.image
                                                        )}
                                                        className="classSpecAvatar"
                                                    />
                                                </Tooltip>
                                                <span className="textBold">
                                                    {currentBoss.bestHps.ilvl}{" "}
                                                </span>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </React.Fragment>
        );
    }
}

export default withTheme()(RaidBosses);
