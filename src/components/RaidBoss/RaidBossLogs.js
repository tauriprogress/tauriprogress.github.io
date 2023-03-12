import React, { useEffect } from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import Avatar from "../Avatar";
import LogLink from "../LogLink";
import OverflowScroll from "../OverflowScroll";
import InfoIcon from "../InfoIcon";
import Link from "../Link";
import ErrorMessage from "../ErrorMessage";
import DisplayDate from "../DisplayDate";

import {
    convertFightLength,
    dateTextHours,
    days,
    getFactionImg,
} from "../../helpers";

import { raidBossKillCountFetch } from "../../redux/actions";

import ElevatedLinearProgress from "../ElevatedLinearProgress";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/material";

const NoWrap = styled("span")({
    whiteSpace: "nowrap",
});

function GuildList({ data = [], factionColors }) {
    return data.map((log, index) => {
        const date = new Date(log.date * 1000);
        return (
            <TableRow key={`${log.id} ${log.realm}`} hover>
                <TableCell align="right" padding="checkbox">
                    <Typography>{index + 1}.</Typography>
                </TableCell>
                <TableCell>
                    {log.guild ? (
                        <NoWrap>
                            <Link
                                style={{
                                    color: log.guild.f
                                        ? factionColors.horde
                                        : factionColors.alliance,
                                }}
                                to={`/guild/${log.guild.name}?realm=${log.realm}`}
                            >
                                <Avatar
                                    src={getFactionImg(log.guild.f)}
                                    title={"Faction"}
                                />
                                {log.guild.name}
                            </Link>
                        </NoWrap>
                    ) : (
                        <NoWrap>
                            <Avatar src="" title={"Faction"} />
                            Random
                        </NoWrap>
                    )}
                </TableCell>

                <TableCell style={{ fontWeight: "bold" }}>
                    <LogLink logId={log.id} realm={log.realm}>
                        {convertFightLength(log.fightLength)}
                    </LogLink>
                </TableCell>

                <TableCell>
                    <Tooltip title={days[date.getDay()]}>
                        <span>
                            <DisplayDate date={date} align="right" />
                        </span>
                    </Tooltip>
                </TableCell>
                <TableCell>{dateTextHours(date)}</TableCell>
            </TableRow>
        );
    });
}

function RaidBossLogs({ raidId, bossName, difficulty, fetch, selector }) {
    const {
        palette: { factionColors },
    } = useTheme();

    const dispatch = useDispatch();

    const { loading, error, data } = useSelector((state) => {
        return {
            ...selector(state),
        };
    }, shallowEqual);

    useEffect(() => {
        dispatch(fetch({ raidId, bossName, difficulty }));
    }, [fetch, raidId, bossName, difficulty, dispatch]);

    return (
        <OverflowScroll>
            {loading && <ElevatedLinearProgress top="40px" />}

            <Table size="small">
                <TableHead className="tableHead">
                    <TableRow>
                        <TableCell align="right" padding="checkbox">
                            Rank
                        </TableCell>
                        <TableCell>Guild</TableCell>
                        <TableCell>
                            <Tooltip title="Click on the number for details">
                                <span>
                                    <InfoIcon /> Fight duration
                                </span>
                            </Tooltip>
                        </TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <GuildList data={data} factionColors={factionColors} />
                </TableBody>
            </Table>
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() =>
                        dispatch(
                            fetch({
                                raidId,
                                bossName,
                                difficulty,
                            })
                        ) &&
                        dispatch(
                            raidBossKillCountFetch({
                                raidId,
                                bossName,
                                difficulty: difficulty,
                            })
                        )
                    }
                />
            )}
        </OverflowScroll>
    );
}

export default RaidBossLogs;
