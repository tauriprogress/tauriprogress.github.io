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
import Info from "@material-ui/icons/Info";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";
import OverflowScroll from "../OverflowScroll";
import WithRealm from "../WithRealm";

import { convertFightTime } from "../../helpers";
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
                        <TableCell>Kill time</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Logs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((kill, index) => {
                            const date = new Date(kill.killtime * 1000);

                            return (
                                <TableRow key={index} hover>
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
                                                {kill.guilddata.name ? (
                                                    <WithRealm
                                                        realmName={kill.realm}
                                                    >
                                                        <Typography>
                                                            <Link
                                                                component={
                                                                    RouterLink
                                                                }
                                                                style={{
                                                                    color: kill
                                                                        .guilddata
                                                                        .faction
                                                                        ? horde
                                                                        : alliance
                                                                }}
                                                                to={`/guild/${kill.guilddata.name}?realm=${kill.realm}`}
                                                            >
                                                                {
                                                                    kill
                                                                        .guilddata
                                                                        .name
                                                                }
                                                            </Link>
                                                        </Typography>
                                                    </WithRealm>
                                                ) : (
                                                    <WithRealm
                                                        realmName={kill.realm}
                                                    >
                                                        <Typography>
                                                            Random
                                                        </Typography>
                                                    </WithRealm>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </TableCell>

                                    <TableCell>
                                        {convertFightTime(kill.fight_time)}
                                    </TableCell>

                                    <TableCell>
                                        <DateTooltip date={date}>
                                            <DisplayDate
                                                date={date}
                                                align="right"
                                            />
                                        </DateTooltip>
                                    </TableCell>

                                    <TableCell>
                                        <LogLink
                                            logId={kill.log_id}
                                            realm={kill.realm}
                                        >
                                            <Info
                                                style={{
                                                    transform:
                                                        "translate(0, 5px)"
                                                }}
                                            />
                                        </LogLink>
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
