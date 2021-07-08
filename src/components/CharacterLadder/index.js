import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { withTheme, withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";
import DisplayDate from "../DisplayDate";
import InfoIcon from "../InfoIcon";
import CharacterName from "../CharacterName";

import { shortRealmToFull } from "../../helpers";
import { filterChars } from "./helpers";

function styles(theme) {
    return {
        uppercase: {
            textTransform: "uppercase"
        },
        bold: {
            fontWeight: "bold"
        },
        cell: {
            padding: theme.spacing(1)
        }
    };
}

function CharacterLadder({
    filter = {},
    classes,
    type,
    data,
    rowsPerPage = 30
}) {
    const specs = useSelector(state => state.environment.specs);

    const [page, setPage] = useState(0);

    useEffect(() => {
        setPage(0);
    }, [type, data, filter]);

    let filteredData = filterChars(filter, data, specs);

    return (
        <React.Fragment>
            <Table>
                <TableHead className="tableHead">
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell className={classes.uppercase}>
                            <Tooltip title={"Click for details"}>
                                <span>
                                    {type} <InfoIcon />
                                </span>
                            </Tooltip>
                        </TableCell>
                        <TableCell>Ilvl</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData &&
                        filteredData
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map((char, index) => {
                                const date = new Date(char.date * 1000);
                                const realmName = shortRealmToFull(char.realm);
                                return (
                                    <TableRow key={index} hover>
                                        <TableCell className={classes.cell}>
                                            <Typography color="inherit">
                                                <span className={classes.bold}>
                                                    {index +
                                                        1 +
                                                        page * rowsPerPage}
                                                    .{" "}
                                                </span>

                                                <CharacterName
                                                    character={char}
                                                    realmName={realmName}
                                                />
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            className={`${classes.bold} ${classes.cell}`}
                                        >
                                            <LogLink
                                                logId={char.logId}
                                                realm={realmName}
                                            >
                                                {new Intl.NumberFormat().format(
                                                    Math.round(char[type])
                                                )}
                                            </LogLink>
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
                                    </TableRow>
                                );
                            })}
                </TableBody>
            </Table>
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
                    onPageChange={(e, page) => setPage(page)}
                />
            )}
        </React.Fragment>
    );
}

export default withStyles(styles)(withTheme(CharacterLadder));
