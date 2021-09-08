import React from "react";
import { useSelector } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";
import OverflowScroll from "../OverflowScroll";
import DisplayDate from "../DisplayDate";
import InfoIcon from "../InfoIcon";

import { convertFightLength } from "../../helpers";

import { guildRealmSelector } from "../../redux/guild/selectors";

function GuildFastestKills({ data }) {
    const realm = useSelector(guildRealmSelector);
    return (
        <OverflowScroll>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
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
                                        {index + 1}.
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography style={{ fontWeight: "bold" }}>
                                        <LogLink logId={log.id} realm={realm}>
                                            <InfoIcon />
                                            {convertFightLength(
                                                log.fightLength
                                            )}
                                        </LogLink>
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

export default GuildFastestKills;
