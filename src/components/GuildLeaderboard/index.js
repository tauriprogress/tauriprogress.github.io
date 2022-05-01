import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import withTheme from "@mui/styles/withTheme";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Page from "../Page";
import ErrorMessage from "../ErrorMessage";
import GuildLeaderboardFilter from "./GuildLeaderboardFilter";
import DisplayDate from "../DisplayDate";
import OverflowScroll from "../OverflowScroll";
import Link from "../Link";
import LogLink from "../LogLink";
import ElevatedLinearProgress from "../ElevatedLinearProgress";

import { filterGuilds } from "./helpers";
import {
    convertFightLength,
    dateTextHours,
    getFactionImg,
} from "./../../helpers";

import {
    guildLeaderboardFetch,
    guildLeaderboardSetTab,
} from "../../redux/actions";

import {
    guildLeaderboardEntireSelector,
    environmentRealmGroupSelector,
    environmentIsSeasonalSelector,
} from "../../redux/selectors";
import { Avatar } from "@mui/material";
import { styled } from "@mui/system";

const SuccessTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.success.main,
}));

const NoborderTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none",
}));

function GuildLeaderboard({ theme }) {
    const { factionColors } = theme.palette;

    const {
        data,
        loading,
        error,
        realmGroup,
        filter,
        selectedTab,
        isSeasonal,
    } = useSelector(
        (state) => ({
            ...guildLeaderboardEntireSelector(state),
            realmGroup: environmentRealmGroupSelector(state),
            isSeasonal: environmentIsSeasonalSelector(state),
        }),
        shallowEqual
    );
    const dispatch = useDispatch();

    const selectedTabName = selectedTab === 0 ? "fullClear" : "fastestKills";

    useEffect(() => {
        dispatch(guildLeaderboardFetch(realmGroup));
    }, [realmGroup, isSeasonal, dispatch]);

    return (
        <Page title={"Guild Leaderboard | Tauri Progress"}>
            <section>
                <GuildLeaderboardFilter />
                <Tabs
                    value={selectedTab}
                    onChange={(e, value) =>
                        dispatch(guildLeaderboardSetTab(value))
                    }
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="FULL CLEAR" value={0} />
                    <Tab label="BEST KILLS" value={1} />
                </Tabs>
                {loading && <ElevatedLinearProgress top="40px" />}

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
                            {filterGuilds(filter, selectedTabName, data).map(
                                (guild, index) => (
                                    <Row
                                        guild={guild}
                                        index={index}
                                        factionColors={factionColors}
                                        filter={filter}
                                        tab={selectedTabName}
                                        key={`${guild.name}${selectedTabName}`}
                                    />
                                )
                            )}
                        </TableBody>
                    </Table>
                </OverflowScroll>
                {error && (
                    <ErrorMessage
                        message={error}
                        refresh={() =>
                            dispatch(guildLeaderboardFetch(realmGroup))
                        }
                    />
                )}
            </section>
        </Page>
    );
}

function Row({ guild, index, factionColors, filter, tab }) {
    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(!open);
    }
    const firstLog = guild.ranking[filter.raid][filter.difficulty][tab].logs[0];

    let start = firstLog.date * 1000 - firstLog.fightLength;

    return (
        <React.Fragment>
            <TableRow onClick={toggleOpen}>
                <NoborderTableCell align="right" padding="checkbox">
                    <Typography>{index + 1}.</Typography>
                </NoborderTableCell>
                <NoborderTableCell>
                    <Typography>
                        <Link
                            style={{
                                color: guild.f
                                    ? factionColors.horde
                                    : factionColors.alliance,
                            }}
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
                    </Typography>
                </NoborderTableCell>
                <NoborderTableCell>
                    {convertFightLength(
                        guild.ranking[filter.raid][filter.difficulty][tab].time
                    )}
                </NoborderTableCell>
                <NoborderTableCell>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </NoborderTableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table variant="inner">
                            <TableBody>
                                <InnerTableRows
                                    start={start}
                                    logs={
                                        guild.ranking[filter.raid][
                                            filter.difficulty
                                        ][tab].logs
                                    }
                                    guild={guild}
                                    tab={tab}
                                />
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function InnerTableRows({ start, logs, guild, tab }) {
    return logs.map((log, index) => (
        <TableRow key={log.id} hover>
            <TableCell align="right" padding="checkbox">
                <Typography noWrap>{log.bossName}</Typography>
            </TableCell>

            <SuccessTableCell>
                <LogLink logId={log.id} realm={guild.realm}>
                    {tab === "fullClear"
                        ? "+ " +
                          (index === 0
                              ? convertFightLength(log.fightLength)
                              : convertFightLength(
                                    log.date * 1000 -
                                        logs[index - 1].date * 1000
                                ))
                        : convertFightLength(log.fightLength)}
                </LogLink>
            </SuccessTableCell>
            <TableCell align="right">
                {tab === "fullClear" ? (
                    convertFightLength(log.date * 1000 - start)
                ) : (
                    <DisplayDate date={new Date(log.date * 1000)}>
                        {" "}
                        {dateTextHours(new Date(log.date * 1000))}
                    </DisplayDate>
                )}
            </TableCell>
        </TableRow>
    ));
}

export default React.memo(
    withTheme(GuildLeaderboard),
    (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    }
);
