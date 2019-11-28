import { abbreviation } from "tauriprogress-constants/currentContent";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import { withTheme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import DateTooltip from "../DateTooltip";

import { sortGuilds } from "./helpers";

import { guildsFetch } from "../../redux/actions";
import DisplayDate from "../DisplayDate";

function GuildList({ theme }) {
    const { factionColors, progStateColors } = theme.palette;
    const { data, loading, error } = useSelector(state => state.guilds);
    const [sort, setSort] = useState({ by: "completion", direction: "asc" });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(guildsFetch());
    }, []);

    return (
        <section className="displayGuilds">
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && data && (
                <React.Fragment>
                    <div className="overflowScroll">
                        <Table>
                            <TableHead className="tableHead">
                                <TableRow>
                                    <TableCell>Guild</TableCell>
                                    <TableCell>
                                        <Tooltip title="Sort" enterDelay={300}>
                                            <TableSortLabel
                                                active={sort.by === "realm"}
                                                direction={sort.direction}
                                                onClick={() =>
                                                    setSort({
                                                        by: "realm",
                                                        direction:
                                                            sort.by === "realm"
                                                                ? sort.direction ===
                                                                  "asc"
                                                                    ? "desc"
                                                                    : "asc"
                                                                : "desc"
                                                    })
                                                }
                                            >
                                                Realm
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Sort" enterDelay={300}>
                                            <TableSortLabel
                                                active={sort.by === "gFaction"}
                                                direction={sort.direction}
                                                onClick={() =>
                                                    setSort({
                                                        by: "gFaction",
                                                        direction:
                                                            sort.by ===
                                                            "gFaction"
                                                                ? sort.direction ===
                                                                  "asc"
                                                                    ? "desc"
                                                                    : "asc"
                                                                : "desc"
                                                    })
                                                }
                                            >
                                                Faction
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sort.by === "completion"}
                                            direction={sort.direction}
                                            onClick={() =>
                                                setSort({
                                                    by: "completion",
                                                    direction:
                                                        sort.by === "completion"
                                                            ? sort.direction ===
                                                              "desc"
                                                                ? "asc"
                                                                : "desc"
                                                            : "asc"
                                                })
                                            }
                                        >
                                            {abbreviation} Completion
                                        </TableSortLabel>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortGuilds(data, sort).map(guild => {
                                    let date = null;

                                    if (guild.progression.completed)
                                        date = new Date(
                                            guild.progression.completed * 1000
                                        );

                                    return (
                                        <TableRow key={guild.guildName}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                className="displayGuildsGuildName"
                                            >
                                                <Typography color="inherit">
                                                    <span className="textBold">
                                                        {guild.rank}.{" "}
                                                    </span>
                                                    <RouterLink
                                                        to={`/guild/${guild.guildName}?realm=${guild.realm}`}
                                                    >
                                                        <Link
                                                            component="span"
                                                            style={{
                                                                color: guild.gFaction
                                                                    ? factionColors.horde
                                                                    : factionColors.alliance
                                                            }}
                                                        >
                                                            {guild.guildName}
                                                        </Link>
                                                    </RouterLink>
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {guild.realm}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {guild.gFaction
                                                    ? "Horde"
                                                    : "Alliance"}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {date ? (
                                                    <DateTooltip date={date}>
                                                        <span
                                                            style={{
                                                                color:
                                                                    progStateColors.defeated
                                                            }}
                                                        >
                                                            <DisplayDate
                                                                date={date}
                                                                align="right"
                                                            />
                                                        </span>
                                                    </DateTooltip>
                                                ) : (
                                                    guild.progression
                                                        .currentBossesDefeated
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </React.Fragment>
            )}
        </section>
    );
}

export default withTheme()(GuildList);
