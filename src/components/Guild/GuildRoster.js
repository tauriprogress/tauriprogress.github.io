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
import Typography from "@material-ui/core/Typography";

import OverflowScroll from "../OverflowScroll";

function GuildRoster({ data, theme }) {
    const {
        palette: { classColors }
    } = theme;

    const rowsPerPage = 50;
    const [page, setPage] = useState(0);

    return (
        <React.Fragment>
            <OverflowScroll>
                <Table>
                    <TableHead>
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
                                        <Typography color="inherit">
                                            <Link
                                                component={RouterLink}
                                                color="inherit"
                                                to={`/player/${member.name}?realm=${member.realm}`}
                                                style={{
                                                    color:
                                                        classColors[
                                                            member.class
                                                        ].text
                                                }}
                                            >
                                                {member.name}
                                            </Link>
                                        </Typography>
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
            </OverflowScroll>
            <TablePagination
                component="div"
                rowsPerPageOptions={[]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(e, page) => setPage(page)}
            />
        </React.Fragment>
    );
}

export default withTheme(GuildRoster);
