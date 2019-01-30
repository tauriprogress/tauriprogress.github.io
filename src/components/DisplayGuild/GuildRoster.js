import { characterClasses } from "tauriprogress-constants";
import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { withTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

class GuildRoster extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                rowsPerPage: 50,
                currentPage: 0
            }
        };
        this.changePage = this.changePage.bind(this);
    }

    changePage(e, page) {
        this.setState({
            ...this.state,
            pagination: { ...this.state.pagination, currentPage: page }
        });
    }

    render() {
        const {
            data,
            theme: {
                palette: { classColors }
            }
        } = this.props;
        const { pagination } = this.state;
        return (
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
                            .slice(
                                pagination.rowsPerPage * pagination.currentPage,
                                pagination.rowsPerPage *
                                    (pagination.currentPage + 1)
                            )
                            .map(member => (
                                <TableRow key={member.name}>
                                    <TableCell component="th" scope="row">
                                        <span
                                            style={{
                                                color: classColors[member.class]
                                            }}
                                        >
                                            <RouterLink
                                                to={`/player/${
                                                    member.name
                                                }?realm=${member.realm}`}
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
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                colSpan={3}
                                count={data.length}
                                rowsPerPage={pagination.rowsPerPage}
                                page={pagination.currentPage}
                                onChangePage={this.changePage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

export default withTheme()(GuildRoster);
