import { characterClasses } from "tauriprogress-constants";
import React, { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { withTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

function GuildRoster({ data, theme }) {
    const {
        palette: { classColors }
    } = theme;

    const rowsPerPage = 50;
    const [page, setPage] = useState(0);

    return (
        <div className="displayGuildRosterContainer">
            <div className="overflowScroll">
                <Table>
                    <TableHead className="tableHead">
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>Rank</TableCell>
                            <TableCell>LvL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(rowsPerPage * page, rowsPerPage * (page + 1))
                            .map(member => (
                                <TableRow key={member.name}>
                                    <TableCell component="th" scope="row">
                                        <span
                                            style={{
                                                color: classColors[member.class]
                                            }}
                                        >
                                            <RouterLink
                                                to={`/player/${member.name}?realm=${member.realm}`}
                                            >
                                                <Typography color="inherit">
                                                    <Link
                                                        component="span"
                                                        color="inherit"
                                                    >
                                                        {member.name}
                                                    </Link>
                                                </Typography>
                                            </RouterLink>
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {characterClasses[member.class]}
                                    </TableCell>

                                    <TableCell>{member.rank_name}</TableCell>
                                    <TableCell>{member.level}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                component="div"
                rowsPerPageOptions={[]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(e, page) => setPage(page)}
            />
        </div>
    );
}

export default withTheme(GuildRoster);
