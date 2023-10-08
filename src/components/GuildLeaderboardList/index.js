import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import OverflowScroll from "../OverflowScroll";
import Link from "../Link";
import LogLink from "../LogLink";
import { getFactionImg } from "./../../helpers";

import { Avatar, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const SuccessTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.success.main,
}));

const NoborderTableCell = styled(TableCell)({
    borderBottom: "none",
});

function GuildLeaderboardList({ guilds }) {
    const {
        palette: { factionColors },
    } = useTheme();

    return (
        <OverflowScroll>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="right" padding="checkbox">
                            Rank
                        </TableCell>
                        <TableCell>Guild</TableCell>
                        <TableCell colSpan={2}>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {guilds.map((guild, index) => (
                        <Row
                            guild={guild}
                            index={index}
                            factionColors={factionColors}
                            key={`${guild.name}`}
                        />
                    ))}
                </TableBody>
            </Table>
        </OverflowScroll>
    );
}

function Row({ guild, index, factionColors }) {
    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(!open);
    }

    return (
        <React.Fragment>
            <TableRow onClick={toggleOpen}>
                <NoborderTableCell align="right" padding="checkbox">
                    <Typography>{index + 1}.</Typography>
                </NoborderTableCell>
                <NoborderTableCell>
                    <Typography
                        style={{
                            color: guild.f
                                ? factionColors.horde
                                : factionColors.alliance,
                        }}
                    >
                        {guild.name === "Random" ? (
                            <React.Fragment>
                                {typeof guild.f === "number" && (
                                    <Avatar
                                        src={getFactionImg(guild.f)}
                                        component="span"
                                    />
                                )}

                                {guild.name}
                            </React.Fragment>
                        ) : (
                            <Link
                                to={`/guild/${guild.name}?realm=${guild.realm}`}
                            >
                                {typeof guild.f === "number" && (
                                    <Avatar
                                        src={getFactionImg(guild.f)}
                                        component="span"
                                    />
                                )}

                                {guild.name}
                            </Link>
                        )}
                    </Typography>
                </NoborderTableCell>
                <NoborderTableCell>{guild.time}</NoborderTableCell>
                <NoborderTableCell>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </NoborderTableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table variant="inner">
                            <TableBody>
                                <InnerTableRows guild={guild} />
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function InnerTableRows({ guild }) {
    return guild.logs.map((log) => (
        <TableRow key={log.id} hover>
            <TableCell align="right" padding="checkbox">
                <Typography noWrap>{log.bossName}</Typography>
            </TableCell>

            <SuccessTableCell>
                <LogLink logId={log.id} realm={guild.realm}>
                    {log.time}
                </LogLink>
            </SuccessTableCell>
            {log.secondary && (
                <TableCell align="right">{log.secondary()}</TableCell>
            )}
        </TableRow>
    ));
}

export default React.memo(GuildLeaderboardList, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
