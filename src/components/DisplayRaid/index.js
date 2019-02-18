import { specToClass } from "tauriprogress-constants";
import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { bindActionCreators } from "redux";

import { withTheme } from "@material-ui/core/styles";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

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

import { raidFetch } from "../../redux/actions";

class RaidBosses extends React.PureComponent {
    componentDidMount() {
        const raidName = this.props.match.params.raidName;
        if (this.props.raid.raidName !== raidName)
            this.props.raidFetch(raidName);
    }

    render() {
        const {
            theme: {
                palette: { classColors, factionColors }
            },
            diff
        } = this.props;

        const { loading, data, error, raidName, raidData } = this.props.raid;

        return (
            <React.Fragment>
                {loading && <Loading />}
                {error && <ErrorMessage message={error} />}
                {!loading && !error && data && raidData && (
                    <React.Fragment>
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
                                    {raidData.encounters.map((boss, index) => {
                                        const currentBoss =
                                            data[diff][boss.encounter_name];
                                        return (
                                            <TableRow
                                                key={currentBoss.bossName}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
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

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <span className="textBold">
                                                        {currentBoss.killCount}{" "}
                                                    </span>
                                                    Kills
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <Typography color="inherit">
                                                        <LogLink
                                                            logId={
                                                                currentBoss
                                                                    .fastestKills
                                                                    .log_id
                                                            }
                                                            realm={
                                                                currentBoss
                                                                    .fastestKills
                                                                    .realm
                                                            }
                                                        />{" "}
                                                        <span className="textBold">
                                                            {convertFightTime(
                                                                currentBoss
                                                                    .fastestKills
                                                                    .fight_time
                                                            )}{" "}
                                                        </span>
                                                        <RouterLink
                                                            to={`/guild/${
                                                                currentBoss
                                                                    .fastestKills
                                                                    .guilddata
                                                                    .name
                                                            }?realm=${
                                                                currentBoss
                                                                    .fastestKills
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
                                                                        .guilddata
                                                                        .name
                                                                }
                                                            </Link>
                                                        </RouterLink>
                                                    </Typography>
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <Typography color="inherit">
                                                        <span
                                                            style={{
                                                                color:
                                                                    classColors[
                                                                        specToClass[
                                                                            currentBoss
                                                                                .bestDps
                                                                                .spec
                                                                                .id
                                                                        ]
                                                                    ]
                                                            }}
                                                            className={
                                                                "BossInfoCharName"
                                                            }
                                                        >
                                                            <RouterLink
                                                                to={`/player/${
                                                                    currentBoss
                                                                        .bestDps
                                                                        .name
                                                                }?realm=${
                                                                    currentBoss
                                                                        .bestDps
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
                                                                    currentBoss
                                                                        .bestDps
                                                                        .dps
                                                                )
                                                            )}{" "}
                                                        </span>
                                                        <Tooltip
                                                            title={
                                                                currentBoss
                                                                    .bestDps
                                                                    .spec.label
                                                            }
                                                        >
                                                            <Avatar
                                                                component="span"
                                                                src={getSpecImg(
                                                                    currentBoss
                                                                        .bestDps
                                                                        .spec
                                                                        .image
                                                                )}
                                                                className="classSpecAvatar"
                                                            />
                                                        </Tooltip>
                                                        <span className="textBold">
                                                            {
                                                                currentBoss
                                                                    .bestDps
                                                                    .ilvl
                                                            }{" "}
                                                        </span>
                                                    </Typography>
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <Typography color="inherit">
                                                        <span
                                                            style={{
                                                                color:
                                                                    classColors[
                                                                        specToClass[
                                                                            currentBoss
                                                                                .bestHps
                                                                                .spec
                                                                                .id
                                                                        ]
                                                                    ]
                                                            }}
                                                            className={
                                                                "BossInfoCharName"
                                                            }
                                                        >
                                                            <RouterLink
                                                                to={`/player/${
                                                                    currentBoss
                                                                        .bestHps
                                                                        .name
                                                                }?realm=${
                                                                    currentBoss
                                                                        .bestHps
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
                                                                    currentBoss
                                                                        .bestHps
                                                                        .hps
                                                                )
                                                            )}{" "}
                                                        </span>
                                                        <Tooltip
                                                            title={
                                                                currentBoss
                                                                    .bestHps
                                                                    .spec.label
                                                            }
                                                        >
                                                            <Avatar
                                                                component="span"
                                                                src={getSpecImg(
                                                                    currentBoss
                                                                        .bestHps
                                                                        .spec
                                                                        .image
                                                                )}
                                                                className="classSpecAvatar"
                                                            />
                                                        </Tooltip>
                                                        <span className="textBold">
                                                            {
                                                                currentBoss
                                                                    .bestHps
                                                                    .ilvl
                                                            }{" "}
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
                )}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        raid: state.raidInfo.raid
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ raidFetch }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme()(RaidBosses));
