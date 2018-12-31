import React from "react";

import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

import characterClasses from "../../constants/characterClasses";
import characterClassColors from "../../constants/characterClassColors";

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
        const { data } = this.props;
        const { pagination } = this.state;
        return (
            <div className="overflowScroll">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>LvL</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Class</TableCell>
                            <TableCell>Rank</TableCell>
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
                                    <TableCell>{member.level}</TableCell>
                                    <TableCell component="th" scope="row">
                                        <span
                                            style={{
                                                color:
                                                    characterClassColors[
                                                        member.class
                                                    ]
                                            }}
                                            className={
                                                member.class === 5
                                                    ? "outline"
                                                    : ""
                                            }
                                        >
                                            <Link
                                                to={`/player/${
                                                    member.name
                                                }?realm=${member.realm}`}
                                            >
                                                {member.name}
                                            </Link>
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {characterClasses[member.class]}
                                    </TableCell>

                                    <TableCell>{member.rank_name}</TableCell>
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

export default GuildRoster;
