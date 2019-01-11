import React from "react";

import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import LogLink from "../LogLink";

import difficultyLabels from "../../constants/difficultyLabels";

import { convertFightTime } from "../DisplayRaid/helpers";

function GuildLatestKills({ data, realm }) {
    return (
        <div className="overflowScroll">
            <Table>
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
                    {data.map(log => (
                        <TableRow key={log.log_id}>
                            <TableCell component="th" scope="row">
                                <span className="textBold">
                                    <Link
                                        to={`/raid/${log.mapentry.name}/${
                                            log.encounter_data.encounter_name
                                        }`}
                                    >
                                        {log.encounter_data.encounter_name}
                                    </Link>
                                </span>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {difficultyLabels[log.difficulty]}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {convertFightTime(log.fight_time)}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {new Date(
                                    log.killtime * 1000
                                ).toLocaleDateString()}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <LogLink logId={log.log_id} realm={realm} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default GuildLatestKills;
