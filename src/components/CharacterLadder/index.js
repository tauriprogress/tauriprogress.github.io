import React from "react";

import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

import specToClass from "../../constants/specToClass";
import characterClassColors from "../../constants/characterClassColors";

import { getSpecImg } from "../RaidBossSummary/helpers";

class CharacterLadder extends React.PureComponent {
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
        const { data, type } = this.props;
        const { pagination } = this.state;
        return (
            <div className="overflowScroll">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>

                            <TableCell>Name</TableCell>
                            <TableCell>
                                <span className="textCapitalize">{type}</span>
                            </TableCell>

                            <TableCell>ILVL</TableCell>

                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(
                                pagination.currentPage * pagination.rowsPerPage,
                                (pagination.currentPage + 1) *
                                    pagination.rowsPerPage
                            )
                            .map((char, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {index +
                                            1 +
                                            pagination.currentPage *
                                                pagination.rowsPerPage}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        <Tooltip title={char.spec.label}>
                                            <Avatar
                                                component="span"
                                                src={getSpecImg(
                                                    char.spec.image
                                                )}
                                                className="classSpecAvatar"
                                            />
                                        </Tooltip>

                                        <span
                                            style={{
                                                color:
                                                    characterClassColors[
                                                        specToClass[
                                                            char.spec.id
                                                        ]
                                                    ]
                                            }}
                                            className={
                                                specToClass[char.spec.id] === 5
                                                    ? "outline"
                                                    : ""
                                            }
                                        >
                                            <Link
                                                to={`/player/${
                                                    char.name
                                                }?realm=${char.realm}`}
                                            >
                                                {char.name}
                                            </Link>
                                        </span>
                                    </TableCell>

                                    <TableCell
                                        component="th"
                                        scope="row"
                                        className="textBold"
                                    >
                                        {new Intl.NumberFormat().format(
                                            char[type]
                                        )}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        {char.ilvl}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {new Date(
                                            char.date * 1000
                                        ).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={data.length}
                    rowsPerPage={pagination.rowsPerPage}
                    page={pagination.currentPage}
                    backIconButtonProps={{
                        "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page"
                    }}
                    onChangePage={this.changePage}
                />
            </div>
        );
    }
}

export default CharacterLadder;
