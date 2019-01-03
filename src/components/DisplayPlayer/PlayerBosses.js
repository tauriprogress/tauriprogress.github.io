import React from "react";

import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

import { raidName } from "../../constants/currentContent";

import { getSpecImg } from "../RaidBossSummary/helpers";

class PlayerBosses extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, value) {
        this.setState({ ...this.state, value: value });
    }

    render() {
        const { data } = this.props;
        const type = this.state.value === 0 ? "dps" : "hps";
        const dataPoints = [];

        for (let bossName in data) {
            if (Object.keys(data[bossName][type])[0]) {
                dataPoints.push({
                    ...data[bossName][type][
                        Object.keys(data[bossName][type])[0]
                    ],
                    bossName: bossName
                });
            }
        }
        return (
            <React.Fragment>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="secondary"
                    className="displayGuildTabs"
                >
                    <Tab label="DPS" className="tab" />
                    <Tab label="HPS" className="tab" />
                </Tabs>
                <div className="overflowScroll">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>BossName</TableCell>
                                <TableCell>
                                    <span className="textCapitalize">
                                        {type}
                                    </span>
                                </TableCell>
                                <TableCell>Spec</TableCell>
                                <TableCell>Ilvl</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataPoints.map(dataPoint => {
                                return (
                                    <TableRow key={dataPoint.bossName}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            className="displayGuildsGuildName"
                                        >
                                            <Link
                                                to={`/raid/${raidName}/${
                                                    dataPoint.bossName
                                                }`}
                                            >
                                                {dataPoint.bossName}
                                            </Link>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <span className="textBold">
                                                {new Intl.NumberFormat().format(
                                                    Math.round(dataPoint[type])
                                                )}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip
                                                title={dataPoint.spec.label}
                                            >
                                                <Avatar
                                                    component="span"
                                                    src={getSpecImg(
                                                        dataPoint.spec.image
                                                    )}
                                                    className="classSpecAvatar"
                                                />
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {dataPoint.ilvl}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {new Date(
                                                dataPoint.date * 1000
                                            ).toLocaleDateString()}
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

export default PlayerBosses;
