import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";

import { convertFightTime } from "../../helpers";
import DisplayDate from "../DisplayDate";

function GuildFastestKills({ data }) {
    return (
        <div className="overflowScroll">
            <Table>
                <TableHead className="tableHead">
                    <TableRow>
                        <TableCell>Rank</TableCell>

                        <TableCell>Time</TableCell>

                        <TableCell>Date</TableCell>
                        <TableCell>Logs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((log, index) => {
                        const date = new Date(log.killtime * 1000);
                        return (
                            <TableRow key={log.log_id}>
                                <TableCell component="th" scope="row">
                                    <Typography className="textBold">
                                        {index + 1}.
                                    </Typography>
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    <span className="textBold">
                                        {convertFightTime(log.fight_time)}
                                    </span>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <DateTooltip date={date}>
                                        <DisplayDate
                                            date={date}
                                            align="right"
                                        />
                                    </DateTooltip>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <LogLink
                                        logId={log.log_id}
                                        realm={log.realm}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export default GuildFastestKills;
