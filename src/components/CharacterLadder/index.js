import { specToClass, specs } from "tauriprogress-constants";
import React from "react";
import { connect } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import { withTheme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

import { Typography } from "@material-ui/core";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";

import Filters from "./Filters";

import { getSpecImg } from "../DisplayRaid/helpers";
import { filterChars } from "./helpers";

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
        const {
            type,
            filter,
            theme: {
                palette: { classColors }
            },
            disableFilter = {}
        } = this.props;
        const { pagination } = this.state;

        let data = filterChars(filter, this.props.data);
        console.log(data);

        return (
            <React.Fragment>
                <Filters disableFilter={disableFilter} />
                <div className="overflowScroll">
                    <Table>
                        <TableHead className="tableHead">
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>
                                    <span className="textCapitalize">
                                        {type}
                                    </span>
                                </TableCell>

                                <TableCell>ILVL</TableCell>

                                <TableCell>Date</TableCell>
                                <TableCell>Logs</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data &&
                                data
                                    .slice(
                                        pagination.currentPage *
                                            pagination.rowsPerPage,
                                        (pagination.currentPage + 1) *
                                            pagination.rowsPerPage
                                    )
                                    .map((char, index) => {
                                        const date = new Date(char.date * 1000);
                                        return (
                                            <TableRow key={index}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <Typography color="inherit">
                                                        <span className="textBold">
                                                            {index +
                                                                1 +
                                                                pagination.currentPage *
                                                                    pagination.rowsPerPage}
                                                            .{" "}
                                                        </span>
                                                        <Tooltip
                                                            title={
                                                                specs[char.spec]
                                                                    .label
                                                            }
                                                        >
                                                            <Avatar
                                                                component="span"
                                                                src={getSpecImg(
                                                                    specs[
                                                                        char
                                                                            .spec
                                                                    ].image
                                                                )}
                                                                className="classSpecAvatar"
                                                            />
                                                        </Tooltip>

                                                        <span
                                                            style={{
                                                                color:
                                                                    classColors[
                                                                        specToClass[
                                                                            char
                                                                                .spec
                                                                        ]
                                                                    ]
                                                            }}
                                                        >
                                                            <RouterLink
                                                                to={`/player/${
                                                                    char.name
                                                                }?realm=${
                                                                    char.realm
                                                                }`}
                                                            >
                                                                <Link
                                                                    component="span"
                                                                    color="inherit"
                                                                >
                                                                    {char.name}
                                                                </Link>
                                                            </RouterLink>
                                                        </span>
                                                    </Typography>
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

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {char.ilvl}
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <DateTooltip date={date}>
                                                        <span>
                                                            {date.toLocaleDateString()}
                                                        </span>
                                                    </DateTooltip>
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <LogLink
                                                        logId={char.logId}
                                                        realm={char.realm}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                </div>
                {data && (
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
                )}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        filter: state.charLadderFilter
    };
}

export default connect(mapStateToProps)(withTheme()(CharacterLadder));
