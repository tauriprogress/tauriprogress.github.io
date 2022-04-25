import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import withTheme from "@mui/styles/withTheme";
import withStyles from "@mui/styles/withStyles";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import WithRealm from "../WithRealm";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

import Page from "../Page";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import GuildLeaderboardFilter from "./GuildLeaderboardFilter";
import DisplayDate from "../DisplayDate";
import OverflowScroll from "../OverflowScroll";
import AlignedRankDisplay from "../AlignedRankDisplay";
import Link from "../Link";

import LogLink from "../LogLink";
import InfoIcon from "../InfoIcon";

import { filterGuilds } from "./helpers";
import { convertFightLength, dateTextHours } from "./../../helpers";

import {
    guildLeaderboardFetch,
    guildLeaderboardSetTab,
} from "../../redux/actions";

import {
    guildLeaderboardEntireSelector,
    environmentRealmGroupSelector,
    environmentIsSeasonalSelector,
} from "../../redux/selectors";

function styles(theme) {
    return {
        cell: {
            padding: theme.spacing(1),
        },
        firstCellName: {
            paddingLeft: theme.spacing(10),
        },
        tableBody: {
            "& > tr:nth-child(4n-1)": {
                backgroundColor: theme.palette.background.default,
            },
        },
        tablerow: {
            height: "55px",
            "& > *": {
                borderBottom: "unset",
            },
        },
        innerTable: {
            padding: 0,
            "& td": {
                padding: theme.spacing(0.7),
            },
            borderTop: `1px solid ${theme.palette.secondary.main}`,
        },

        bossName: {
            fontSize: `${14 / 16}rem`,
        },
        differenceText: {
            color: theme.palette.progStateColors.defeated,
        },
        containerGrid: {
            height: "40px",
        },
        tableHead: {
            height: "58px",
        },
    };
}
function GuildLeaderboard({ theme, classes }) {
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
                {loading && <Loading />}
                {error && (
                    <ErrorMessage
                        message={error}
                        refresh={() =>
                            dispatch(guildLeaderboardFetch(realmGroup))
                        }
                    />
                )}
                {!loading && !error && data && (
                    <OverflowScroll>
                        <Table>
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell
                                        className={classes.firstCellName}
                                    >
                                        Guild
                                    </TableCell>
                                    <TableCell colSpan={2}>Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className={classes.tableBody}>
                                {filterGuilds(
                                    filter,
                                    selectedTabName,
                                    data
                                ).map((guild, index) => (
                                    <Row
                                        classes={classes}
                                        guild={guild}
                                        index={index}
                                        factionColors={factionColors}
                                        filter={filter}
                                        tab={selectedTabName}
                                        key={`${guild.name}${selectedTabName}`}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </OverflowScroll>
                )}
            </section>
        </Page>
    );
}

function Row({ classes, guild, index, factionColors, filter, tab }) {
    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(!open);
    }
    const firstLog = guild.ranking[filter.raid][filter.difficulty][tab].logs[0];

    let start = firstLog.date * 1000 - firstLog.fightLength;

    return (
        <React.Fragment>
            <TableRow onClick={toggleOpen} className={classes.tablerow}>
                <TableCell className={classes.cell}>
                    <AlignedRankDisplay rank={index + 1}>
                        <WithRealm realmName={guild.realm}>
                            <Typography className={classes.name}>
                                <Link
                                    style={{
                                        color: guild.f
                                            ? factionColors.horde
                                            : factionColors.alliance,
                                    }}
                                    to={`/guild/${guild.name}?realm=${guild.realm}`}
                                >
                                    {guild.name}
                                </Link>
                            </Typography>
                        </WithRealm>
                    </AlignedRankDisplay>
                </TableCell>
                <TableCell className={classes.cell}>
                    {convertFightLength(
                        guild.ranking[filter.raid][filter.difficulty][tab].time
                    )}
                </TableCell>
                <TableCell className={classes.cell}>
                    <Typography>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{
                        padding: 0,
                    }}
                    colSpan={3}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table className={classes.innerTable}>
                            <TableBody>
                                {tab === "fullClear" ? (
                                    <FullClearDetails
                                        start={start}
                                        logs={
                                            guild.ranking[filter.raid][
                                                filter.difficulty
                                            ][tab].logs
                                        }
                                        classes={classes}
                                        guild={guild}
                                    />
                                ) : (
                                    <BestKillsDetails
                                        logs={
                                            guild.ranking[filter.raid][
                                                filter.difficulty
                                            ][tab].logs
                                        }
                                        classes={classes}
                                        guild={guild}
                                    />
                                )}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function FullClearDetails({ start, logs, classes, guild }) {
    return logs.map((log, index) => (
        <TableRow key={log.id}>
            <TableCell align={"right"}>
                {convertFightLength(log.date * 1000 - start)}
            </TableCell>
            <TableCell align={"right"} className={classes.differenceText}>
                +{" "}
                {index === 0
                    ? convertFightLength(log.fightLength)
                    : convertFightLength(
                          log.date * 1000 - logs[index - 1].date * 1000
                      )}
            </TableCell>
            <TableCell className={classes.bossName} align={"right"}>
                <LogLink logId={log.id} realm={guild.realm}>
                    {log.bossName}
                    <InfoIcon />
                </LogLink>
            </TableCell>
        </TableRow>
    ));
}

function BestKillsDetails({ logs, classes, guild }) {
    return logs.map((log) => (
        <TableRow key={log.id}>
            <TableCell align={"right"} className={classes.differenceText}>
                {convertFightLength(log.fightLength)}
            </TableCell>
            <TableCell align={"right"}>
                <DisplayDate date={new Date(log.date * 1000)}>
                    {" "}
                    {dateTextHours(new Date(log.date * 1000))}
                </DisplayDate>
            </TableCell>
            <TableCell className={classes.bossName} align={"right"}>
                <LogLink logId={log.id} realm={guild.realm}>
                    {log.bossName}
                    <InfoIcon />
                </LogLink>
            </TableCell>
        </TableRow>
    ));
}

export default React.memo(
    withStyles(styles)(withTheme(GuildLeaderboard)),
    (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    }
);
