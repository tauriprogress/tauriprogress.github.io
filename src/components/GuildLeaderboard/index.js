import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withTheme, withStyles } from "@material-ui/core/styles";

import { guildLeaderboardFetch } from "../../redux/actions";
import { Link as RouterLink } from "react-router-dom";

import Page from "../Page";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import GuildLeaderboardFilter from "./GuildLeaderboardFilter";
import DisplayDate from "../DisplayDate";
import OverflowScroll from "../OverflowScroll";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import WithRealm from "../WithRealm";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

import LogLink from "../LogLink";
import InfoIcon from "../InfoIcon";

import { filterGuilds } from "./helpers";
import { convertFightLength, dateTextHours } from "./../../helpers";

function styles(theme) {
    return {
        cell: {
            padding: theme.spacing(1)
        },
        rank: {
            minWidth: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            padding: `0 ${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
            fontWeight: "bold"
        },
        firstCellName: {
            paddingLeft: theme.spacing(10)
        },
        tableBody: {
            "& > tr:nth-child(4n-1)": {
                backgroundColor: theme.palette.background.default
            }
        },
        row: {
            "& > *": {
                borderBottom: "unset"
            }
        },
        innerTable: {
            padding: 0,
            "& td": {
                padding: theme.spacing(0.7)
            },
            borderTop: `1px solid ${theme.palette.secondary.main}`
        },

        bossName: {
            fontSize: `${14 / 16}rem`
        },
        differenceText: {
            color: theme.palette.progStateColors.defeated
        },
        containerGrid: {
            height: "40px"
        },
        tableHead: {
            height: "58px"
        }
    };
}
function GuildLeaderboard({ theme, classes }) {
    const { factionColors } = theme.palette;

    const { data, loading, error, realmGroup, filter } = useSelector(state => ({
        ...state.guildLeaderboard,
        realmGroup: state.environment.realmGroup
    }));
    const dispatch = useDispatch();

    const [tab, setTab] = useState("fullClear");

    useEffect(() => {
        dispatch(guildLeaderboardFetch(realmGroup));
    }, [realmGroup, dispatch]);

    return (
        <Page title={"Guild Leaderboard | Tauri Progress"}>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && data && (
                <section>
                    <GuildLeaderboardFilter />
                    <Tabs value={tab} onChange={(e, value) => setTab(value)}>
                        <Tab label="FULL CLEAR" value={"fullClear"} />
                        <Tab label="BEST KILLS" value={"fastestKills"} />
                    </Tabs>
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
                                {filterGuilds(filter, tab, data).map(
                                    (guild, index) => (
                                        <Row
                                            classes={classes}
                                            guild={guild}
                                            index={index}
                                            factionColors={factionColors}
                                            filter={filter}
                                            tab={tab}
                                            key={`${guild.name}${tab}`}
                                        />
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </OverflowScroll>
                </section>
            )}
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
            <TableRow onClick={toggleOpen} className={classes.row}>
                <TableCell className={classes.cell}>
                    <Grid
                        container
                        wrap="nowrap"
                        className={classes.containerGrid}
                    >
                        <Grid item className={`${classes.rank} rank`}>
                            {index + 1}.
                        </Grid>
                        <Grid item>
                            <WithRealm realmName={guild.realm}>
                                <Typography className={classes.name}>
                                    <Link
                                        component={RouterLink}
                                        style={{
                                            color: guild.f
                                                ? factionColors.horde
                                                : factionColors.alliance
                                        }}
                                        to={`/guild/${guild.name}?realm=${guild.realm}`}
                                    >
                                        {guild.name}
                                    </Link>
                                </Typography>
                            </WithRealm>
                        </Grid>
                    </Grid>
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
                        padding: 0
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
    return logs.map(log => (
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

export default withStyles(styles)(withTheme(GuildLeaderboard));
