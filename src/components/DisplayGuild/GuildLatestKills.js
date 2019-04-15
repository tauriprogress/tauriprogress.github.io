import { difficultyLabels } from "tauriprogress-constants";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";

import { convertFightTime } from "../DisplayRaid/helpers";

function GuildLatestKills({ data, realm }) {
    return (
        <div className="overflowScroll">
            <Table className="displayGuildLatestTable">
                <TableHead className="tableHead">
                    <TableRow>
                        <TableCell>Boss name</TableCell>

                        <TableCell>Difficulty</TableCell>
                        <TableCell>Time</TableCell>

                        <TableCell>Date</TableCell>
                        <TableCell>Logs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(log => {
                        const date = new Date(log.killtime * 1000);
                        return (
                            <TableRow key={log.log_id}>
                                <TableCell component="th" scope="row">
                                    <span className="textBold">
                                        <RouterLink
                                            to={`/raid/${log.mapentry.name}/${
                                                log.encounter_data
                                                    .encounter_name
                                            }`}
                                        >
                                            <Typography color="inherit">
                                                <Link
                                                    component="span"
                                                    color="inherit"
                                                >
                                                    {
                                                        log.encounter_data
                                                            .encounter_name
                                                    }
                                                </Link>
                                            </Typography>
                                        </RouterLink>
                                    </span>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {difficultyLabels[log.difficulty]}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {convertFightTime(log.fight_time)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <DateTooltip date={date}>
                                        <span>{date.toLocaleDateString()}</span>
                                    </DateTooltip>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <LogLink logId={log.log_id} realm={realm} />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export default GuildLatestKills;
