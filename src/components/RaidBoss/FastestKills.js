import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { withTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";
import OverflowScroll from "../OverflowScroll";
import WithRealm from "../WithRealm";
import InfoIcon from "../InfoIcon";

import { convertFightLength } from "../../helpers";
import DisplayDate from "../DisplayDate";

function FastestKills({ data, theme }) {
    const {
        palette: {
            factionColors: { alliance, horde }
        }
    } = theme;
    return (
        <OverflowScroll>
            <Table>
                <TableHead className="tableHead">
                    <TableRow>
                        <TableCell>Guild</TableCell>
                        <TableCell>Fight length</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((log, index) => {
                            const date = new Date(log.date * 1000);
                            return (
                                <TableRow key={`${log.id} ${log.realm}`} hover>
                                    <TableCell>
                                        <Grid
                                            container
                                            wrap="nowrap"
                                            alignItems="center"
                                        >
                                            <Grid
                                                item
                                                style={{ marginRight: "8px" }}
                                            >
                                                <Typography
                                                    style={{
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    {index + 1}.
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                {log.guild ? (
                                                    <WithRealm
                                                        realmName={log.realm}
                                                    >
                                                        <Typography>
                                                            <Link
                                                                component={
                                                                    RouterLink
                                                                }
                                                                style={{
                                                                    color: log
                                                                        .guild.f
                                                                        ? horde
                                                                        : alliance
                                                                }}
                                                                to={`/guild/${log.guild.name}?realm=${log.realm}`}
                                                            >
                                                                {log.guild.name}
                                                            </Link>
                                                        </Typography>
                                                    </WithRealm>
                                                ) : (
                                                    <WithRealm
                                                        realmName={log.realm}
                                                    >
                                                        <Typography>
                                                            Random
                                                        </Typography>
                                                    </WithRealm>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </TableCell>

                                    <TableCell style={{ fontWeight: "bold" }}>
                                        <LogLink
                                            logId={log.id}
                                            realm={log.realm}
                                        >
                                            <InfoIcon />
                                            {convertFightLength(
                                                log.fightLength
                                            )}
                                        </LogLink>
                                    </TableCell>

                                    <TableCell>
                                        <DateTooltip date={date}>
                                            <DisplayDate
                                                date={date}
                                                align="right"
                                            />
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

export default withTheme(FastestKills);
