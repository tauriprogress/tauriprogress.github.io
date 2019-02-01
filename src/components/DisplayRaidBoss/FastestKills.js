import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { withTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

import LogLink from "../LogLink";

import { convertFightTime } from "../DisplayRaid/helpers";

function FastestKills({ data, theme }) {
    const {
        palette: {
            factionColors: { alliance, horde }
        }
    } = theme;
    return (
        <div className="overflowScroll">
            <Table>
                <TableHead className="tableHead">
                    <TableRow>
                        <TableCell>Guild</TableCell>
                        <TableCell>Kill time</TableCell>

                        <TableCell>Realm</TableCell>

                        <TableCell>Date</TableCell>
                        <TableCell>Logs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((kill, index) => (
                        <TableRow key={kill.log_id}>
                            <TableCell component="th" scope="row">
                                <Typography>
                                    <span className="textBold">
                                        {index + 1}.{" "}
                                    </span>
                                    {kill.guilddata.name ? (
                                        <RouterLink
                                            to={`/guild/${
                                                kill.guilddata.name
                                            }?realm=${kill.realm}`}
                                        >
                                            <Link
                                                component="span"
                                                style={{
                                                    color: kill.guilddata
                                                        .faction
                                                        ? horde
                                                        : alliance
                                                }}
                                            >
                                                {kill.guilddata.name}
                                            </Link>
                                        </RouterLink>
                                    ) : (
                                        "Random"
                                    )}
                                </Typography>
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {convertFightTime(kill.fight_time)}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {kill.realm}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {new Date(
                                    kill.killtime * 1000
                                ).toLocaleDateString()}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                <LogLink
                                    logId={kill.log_id}
                                    realm={kill.realm}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default withTheme()(FastestKills);
