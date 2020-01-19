import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Info from "@material-ui/icons/Info";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";
import OverflowScroll from "../OverflowScroll";
import DisplayDate from "../DisplayDate";

import { convertFightTime } from "../../helpers";

function GuildFastestKills({ data }) {
    return (
        <OverflowScroll>
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
                    {data.map((log, index) => {
                        const date = new Date(log.killtime * 1000);
                        return (
                            <TableRow key={log.log_id}>
                                <TableCell>
                                    <Typography style={{ fontWeight: "bold" }}>
                                        {index + 1}.
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography style={{ fontWeight: "bold" }}>
                                        {convertFightTime(log.fight_time)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <DateTooltip date={date}>
                                        <DisplayDate date={date} />
                                    </DateTooltip>
                                </TableCell>
                                <TableCell>
                                    <LogLink
                                        logId={log.log_id}
                                        realm={log.realm}
                                    >
                                        <Info
                                            style={{
                                                transform: "translate(0, 5px)"
                                            }}
                                        />
                                    </LogLink>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </OverflowScroll>
    );
}

export default GuildFastestKills;
