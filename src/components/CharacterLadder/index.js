import { specToClass, specs } from "tauriprogress-constants";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
import DisplayDate from "../DisplayDate";

import Filters from "./Filters";

import { getSpecImg } from "../../helpers";
import { filterChars } from "./helpers";

function CharacterLadder({ disableFilter = {}, type, data, theme }) {
    const rowsPerPage = 50;
    const [page, setPage] = useState(0);

    const filter = useSelector(state => state.charLadder.filter);

    useEffect(() => {
        setPage(0);
    }, [type, data, filter]);

    let filteredData = filterChars(filter, data);

    return (
        <React.Fragment>
            <Filters disableFilter={disableFilter} />
            <div className="overflowScroll">
                <Table>
                    <TableHead className="tableHead">
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>
                                <span className="textCapitalize">{type}</span>
                            </TableCell>
                            <TableCell>ILVL</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Logs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData &&
                            filteredData
                                .slice(
                                    page * rowsPerPage,
                                    (page + 1) * rowsPerPage
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
                                                            page * rowsPerPage}
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
                                                                specs[char.spec]
                                                                    .image
                                                            )}
                                                            className="classSpecAvatar"
                                                        />
                                                    </Tooltip>

                                                    <span
                                                        style={{
                                                            color:
                                                                theme.palette
                                                                    .classColors[
                                                                    specToClass[
                                                                        char
                                                                            .spec
                                                                    ]
                                                                ]
                                                        }}
                                                    >
                                                        <RouterLink
                                                            to={`/player/${char.name}?realm=${char.realm}`}
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
                                                        <DisplayDate
                                                            date={date}
                                                            align="right"
                                                        />
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
            {filteredData && (
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page"
                    }}
                    onChangePage={(e, page) => setPage(page)}
                />
            )}
        </React.Fragment>
    );
}

export default withTheme(CharacterLadder);
