import React from "react";
import { useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";
import OverflowScroll from "../OverflowScroll";
import DisplayDate from "../DisplayDate";

import { convertFightLength } from "../../helpers";

import { guildRealmSelector } from "../../redux/guild/selectors";

function GuildKillLogs({ data }) {
    const realm = useSelector(guildRealmSelector);
    return (
        <OverflowScroll>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((log, index) => {
                        const date = new Date(log.date * 1000);
                        return (
                            <TableRow key={log.id}>
                                <TableCell>
                                    <Typography style={{ fontWeight: "bold" }}>
                                        <LogLink logId={log.id} realm={realm}>
                                            {log.id}
                                        </LogLink>
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography style={{ fontWeight: "bold" }}>
                                        {convertFightLength(log.fightLength)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <DateTooltip date={date}>
                                        <DisplayDate date={date} />
                                    </DateTooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </OverflowScroll>
    );
}

export default GuildKillLogs;
