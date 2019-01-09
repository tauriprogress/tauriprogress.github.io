import React from "react";

import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Info from "@material-ui/icons/Info";

import { convertFightTime } from "../DisplayRaid/helpers";

function GuildLatestKills({ data, realm }) {
    return (
        <div className="overflowScroll">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>

                        <TableCell>Time</TableCell>

                        <TableCell>Date</TableCell>
                        <TableCell>Logs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((log, index) => (
                        <TableRow key={log.log_id}>
                            <TableCell component="th" scope="row">
                                <span className="textBold">{index + 1}</span>
                            </TableCell>

                            <TableCell component="th" scope="row">
                                <span className="textBold">
                                    {convertFightTime(log.fight_time)}
                                </span>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {new Date(
                                    log.killtime * 1000
                                ).toLocaleDateString()}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <span className="textBold">
                                    <Link
                                        to={`/log/${log.log_id}?realm=${
                                            log.realm
                                        }`}
                                    >
                                        <Info
                                            className="logLink"
                                            fontSize="small"
                                        />
                                    </Link>
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default GuildLatestKills;
