import { raidName } from "tauriprogress-constants/currentContent";
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

import { getSpecImg } from "../DisplayRaid/helpers";

class PlayerProgression extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 5
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, value) {
        this.setState({ ...this.state, value: value });
    }

    render() {
        const {
            data,
            raidBosses,
            theme: {
                palette: { progStateColors }
            }
        } = this.props;
        return (
            <div className="displayPlayerProgression">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="secondary"
                    className="displayPlayerTabs"
                >
                    <Tab label="10 HC" className="tab" value={5} />
                    <Tab label="25 HC" className="tab" value={6} />
                </Tabs>
                <div className="overflowScroll">
                    <Table>
                        <TableHead className="tableHead">
                            <TableRow>
                                <TableCell>Boss</TableCell>
                                <TableCell
                                    colSpan="3"
                                    className="nestCellParent"
                                >
                                    <span className="textBold">Damage</span>
                                    <Table className="nestedTable">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Rank</TableCell>
                                                <TableCell>Dps</TableCell>
                                                <TableCell>Ilvl</TableCell>
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </TableCell>
                                <TableCell
                                    colSpan="3"
                                    className="nestCellParent"
                                >
                                    <span className="textBold">Healing</span>
                                    <Table className="nestedTable">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Rank</TableCell>
                                                <TableCell>Hps</TableCell>
                                                <TableCell>Ilvl</TableCell>
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </TableCell>
                                <TableCell>Completion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {raidBosses.map(boss => {
                                const currentBoss =
                                    data[raidName][this.state.value][
                                        boss.encounter_name
                                    ];
                                let defeated = false;
                                const dps = currentBoss.dps;
                                const hps = currentBoss.hps;
                                if (dps.dps || hps.hps) defeated = true;
                                return (
                                    <TableRow key={boss.encounter_name}>
                                        <TableCell scope="row">
                                            <span className="textBold">
                                                <RouterLink
                                                    to={`/raid/${raidName}/${
                                                        boss.encounter_name
                                                    }`}
                                                >
                                                    <Typography color="inherit">
                                                        <Link
                                                            component="span"
                                                            color="inherit"
                                                        >
                                                            {
                                                                boss.encounter_name
                                                            }
                                                        </Link>
                                                    </Typography>
                                                </RouterLink>
                                            </span>
                                        </TableCell>
                                        <TableCell colSpan="3">
                                            {dps.dps ? (
                                                typeof dps.dps === "number" ? (
                                                    <Table className="nestedTable">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row"
                                                                >
                                                                    <Typography className="textBold displayPlayerProgressionRank">
                                                                        <LogLink
                                                                            logId={
                                                                                dps.logId
                                                                            }
                                                                            realm={
                                                                                dps.realm
                                                                            }
                                                                        />{" "}
                                                                        {
                                                                            dps.rank
                                                                        }
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row"
                                                                >
                                                                    <span className="textBold">
                                                                        {new Intl.NumberFormat().format(
                                                                            Math.round(
                                                                                dps.dps
                                                                            )
                                                                        )}
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row"
                                                                >
                                                                    <span className="textBold">
                                                                        {
                                                                            dps.ilvl
                                                                        }
                                                                    </span>
                                                                    <Tooltip
                                                                        title={
                                                                            dps
                                                                                .spec
                                                                                .label
                                                                        }
                                                                    >
                                                                        <Avatar
                                                                            component="span"
                                                                            src={getSpecImg(
                                                                                dps
                                                                                    .spec
                                                                                    .image
                                                                            )}
                                                                            className="classSpecAvatar"
                                                                        />
                                                                    </Tooltip>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                ) : (
                                                    <Table className="nestedTable">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell />
                                                                <TableCell>
                                                                    <span className="textBold">
                                                                        Invalid
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell />
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                )
                                            ) : (
                                                <Table className="nestedTable">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>
                                                                -
                                                            </TableCell>
                                                            <TableCell>
                                                                -
                                                            </TableCell>
                                                            <TableCell>
                                                                -
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            )}
                                        </TableCell>
                                        <TableCell colSpan="3">
                                            {hps.hps ? (
                                                <Table className="nestedTable">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                <Typography className="textBold displayPlayerProgressionRank">
                                                                    <LogLink
                                                                        logId={
                                                                            hps.logId
                                                                        }
                                                                        realm={
                                                                            hps.realm
                                                                        }
                                                                    />{" "}
                                                                    {hps.rank}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                <span className="textBold">
                                                                    {new Intl.NumberFormat().format(
                                                                        Math.round(
                                                                            hps.hps
                                                                        )
                                                                    )}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                <span className="textBold">
                                                                    {hps.ilvl}{" "}
                                                                </span>
                                                                <Tooltip
                                                                    title={
                                                                        hps.spec
                                                                            .label
                                                                    }
                                                                >
                                                                    <Avatar
                                                                        component="span"
                                                                        src={getSpecImg(
                                                                            hps
                                                                                .spec
                                                                                .image
                                                                        )}
                                                                        className="classSpecAvatar"
                                                                    />
                                                                </Tooltip>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            ) : (
                                                <Table className="nestedTable">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>
                                                                -
                                                            </TableCell>
                                                            <TableCell>
                                                                -
                                                            </TableCell>
                                                            <TableCell>
                                                                -
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            )}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {defeated ? (
                                                <span
                                                    style={{
                                                        color:
                                                            progStateColors.defeated
                                                    }}
                                                >
                                                    Defeated
                                                </span>
                                            ) : (
                                                <span
                                                    style={{
                                                        color:
                                                            progStateColors.alive
                                                    }}
                                                >
                                                    Alive
                                                </span>
                                            )}
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

export default withTheme()(PlayerProgression);
