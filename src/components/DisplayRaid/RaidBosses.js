import React from "react";

import { Link } from "react-router-dom";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

import LogLink from "../LogLink";

import characterClassColors from "../../constants/characterClassColors";
import specToClass from "../../constants/specToClass";

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
        const { data, raidName, raidBosses } = this.props;
        return (
            <div className="displayRaidBosses">
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
                        <TableHead>
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
                                            <span className="textBold">
                                                <Link
                                                    to={`/raid/${raidName}/${
                                                        currentBoss.bossName
                                                    }`}
                                                >
                                                    {currentBoss.bossName}
                                                </Link>
                                            </span>
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <span className="textBold">
                                                {currentBoss.killCount}{" "}
                                            </span>
                                            Kills
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <span className="textBold">
                                                {convertFightTime(
                                                    currentBoss.fastestKills
                                                        .fight_time
                                                )}{" "}
                                            </span>
                                            <span
                                                className={
                                                    currentBoss.fastestKills
                                                        .guilddata.faction
                                                        ? "red"
                                                        : "blue"
                                                }
                                            >
                                                <Link
                                                    to={`/guild/${
                                                        currentBoss.fastestKills
                                                            .guilddata.name
                                                    }?realm=${
                                                        currentBoss.fastestKills
                                                            .realm
                                                    }`}
                                                >
                                                    {
                                                        currentBoss.fastestKills
                                                            .guilddata.name
                                                    }
                                                </Link>
                                            </span>{" "}
                                            <LogLink
                                                logId={
                                                    currentBoss.fastestKills
                                                        .log_id
                                                }
                                                realm={
                                                    currentBoss.fastestKills
                                                        .realm
                                                }
                                            />
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <span
                                                style={{
                                                    color:
                                                        characterClassColors[
                                                            specToClass[
                                                                currentBoss
                                                                    .bestDps
                                                                    .spec.id
                                                            ]
                                                        ]
                                                }}
                                                className={"BossInfoCharName"}
                                            >
                                                <Link
                                                    to={`/player/${
                                                        currentBoss.bestDps.name
                                                    }?realm=${
                                                        currentBoss.bestDps
                                                            .realm
                                                    }`}
                                                >
                                                    {currentBoss.bestDps.name}
                                                </Link>
                                            </span>
                                            <br />
                                            <span className="textBold">
                                                {new Intl.NumberFormat().format(
                                                    Math.round(
                                                        currentBoss.bestDps.dps
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
                                                        currentBoss.bestDps.spec
                                                            .image
                                                    )}
                                                    className="classSpecAvatar"
                                                />
                                            </Tooltip>
                                            <span className="textBold">
                                                {currentBoss.bestDps.ilvl}{" "}
                                            </span>
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            <span
                                                style={{
                                                    color:
                                                        characterClassColors[
                                                            specToClass[
                                                                currentBoss
                                                                    .bestHps
                                                                    .spec.id
                                                            ]
                                                        ]
                                                }}
                                                className={"BossInfoCharName"}
                                            >
                                                <Link
                                                    to={`/player/${
                                                        currentBoss.bestHps.name
                                                    }?realm=${
                                                        currentBoss.bestHps
                                                            .realm
                                                    }`}
                                                >
                                                    {currentBoss.bestHps.name}
                                                </Link>
                                            </span>
                                            <br />
                                            <span className="textBold">
                                                {new Intl.NumberFormat().format(
                                                    Math.round(
                                                        currentBoss.bestHps.hps
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
                                                        currentBoss.bestHps.spec
                                                            .image
                                                    )}
                                                    className="classSpecAvatar"
                                                />
                                            </Tooltip>
                                            <span className="textBold">
                                                {currentBoss.bestHps.ilvl}{" "}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default RaidBosses;
