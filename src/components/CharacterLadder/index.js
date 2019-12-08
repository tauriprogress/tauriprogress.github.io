import { specToClass, specs } from "tauriprogress-constants";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import { withTheme, withStyles } from "@material-ui/core/styles";

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
import OverflowScroll from "../OverflowScroll";

import Filters from "./Filters";

import { getSpecImg } from "../../helpers";
import { filterChars } from "./helpers";

function styles(theme) {
    return {
        capitalize: {
            textTransform: "capitalize"
        },
        bold: {
            fontWeight: "bold"
        },
        cell: {
            padding: theme.spacing(1)
        }
    };
}

function CharacterLadder({ classes, disableFilter = {}, type, data, theme }) {
    const rowsPerPage = 30;
    const [page, setPage] = useState(0);

    const filter = useSelector(state => state.charLadder.filter);

    useEffect(() => {
        setPage(0);
    }, [type, data, filter]);

    let filteredData = filterChars(filter, data);

    return (
        <React.Fragment>
            <Filters disableFilter={disableFilter} />
            <OverflowScroll>
                <Table>
                    <TableHead className="tableHead">
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell className={classes.capitalize}>
                                {type}
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
                                        <TableRow key={index} hover>
                                            <TableCell className={classes.cell}>
                                                <Typography color="inherit">
                                                    <span
                                                        className={classes.bold}
                                                    >
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

                                                    <Link
                                                        component={RouterLink}
                                                        to={`/player/${char.name}?realm=${char.realm}`}
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
                                                        {char.name}
                                                    </Link>
                                                </Typography>
                                            </TableCell>

                                            <TableCell
                                                className={`${classes.bold} ${classes.cell}`}
                                            >
                                                {new Intl.NumberFormat().format(
                                                    char[type]
                                                )}
                                            </TableCell>

                                            <TableCell className={classes.cell}>
                                                {char.ilvl}
                                            </TableCell>

                                            <TableCell className={classes.cell}>
                                                <DateTooltip date={date}>
                                                    <DisplayDate
                                                        date={date}
                                                        align="right"
                                                    />
                                                </DateTooltip>
                                            </TableCell>
                                            <TableCell className={classes.cell}>
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
            </OverflowScroll>
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

export default withStyles(styles)(withTheme(CharacterLadder));
