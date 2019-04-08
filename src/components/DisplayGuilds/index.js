import { abbreviation } from "tauriprogress-constants/currentContent";
import React from "react";
import { connect } from "react-redux";

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

class DisplayGuilds extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sort: {
                by: "completion",
                direction: "asc"
            }
        };
        this.sort = this.sort.bind(this);
    }

    sort(sort) {
        this.setState({ ...this.state, sort: sort });
    }

    render() {
        const {
            guilds: { data, loading, error },
            theme: {
                palette: { factionColors, progStateColors }
            }
        } = this.props;
        const { sort } = this.state;

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
                                            <Tooltip
                                                title="Sort"
                                                enterDelay={300}
                                            >
                                                <TableSortLabel
                                                    active={sort.by === "realm"}
                                                    direction={sort.direction}
                                                    onClick={() =>
                                                        this.sort({
                                                            by: "realm",
                                                            direction:
                                                                sort.by ===
                                                                "realm"
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
                                            <Tooltip
                                                title="Sort"
                                                enterDelay={300}
                                            >
                                                <TableSortLabel
                                                    active={
                                                        sort.by === "gFaction"
                                                    }
                                                    direction={sort.direction}
                                                    onClick={() =>
                                                        this.sort({
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
                                                active={
                                                    sort.by === "completion"
                                                }
                                                direction={sort.direction}
                                                onClick={() =>
                                                    this.sort({
                                                        by: "completion",
                                                        direction:
                                                            sort.by ===
                                                            "completion"
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
                                    {sortGuilds(data, sort).map(
                                        (guild, index) => {
                                            let date = null;

                                            if (guild.progression.completed)
                                                date = new Date(
                                                    guild.progression
                                                        .completed * 1000
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
                                                                to={`/guild/${
                                                                    guild.guildName
                                                                }?realm=${
                                                                    guild.realm
                                                                }`}
                                                            >
                                                                <Link
                                                                    component="span"
                                                                    style={{
                                                                        color: guild.gFaction
                                                                            ? factionColors.horde
                                                                            : factionColors.alliance
                                                                    }}
                                                                >
                                                                    {
                                                                        guild.guildName
                                                                    }
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
                                                            <DateTooltip
                                                                date={date}
                                                            >
                                                                <span
                                                                    style={{
                                                                        color:
                                                                            progStateColors.defeated
                                                                    }}
                                                                >
                                                                    {date.toLocaleDateString()}
                                                                </span>
                                                            </DateTooltip>
                                                        ) : (
                                                            guild.progression
                                                                .currentBossesDefeated
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </React.Fragment>
                )}
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        guilds: state.guilds
    };
}

export default connect(mapStateToProps)(withTheme()(DisplayGuilds));
