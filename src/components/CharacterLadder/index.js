import { characterSpecToClass } from "tauriprogress-constants";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import { withTheme, withStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";
import DisplayDate from "../DisplayDate";
import SpecImg from "../SpecImg";
import InfoIcon from "../InfoIcon";

import { getSpecImg, shortRealmToFull } from "../../helpers";
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
    theme,
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
                            {type}
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
                                                <SpecImg
                                                    src={getSpecImg(
                                                        specs[char.spec].image
                                                    )}
                                                    title={
                                                        specs[char.spec].label
                                                    }
                                                />

                                                <Link
                                                    component={RouterLink}
                                                    to={`/player/${char.name}?realm=${realmName}`}
                                                    style={{
                                                        color:
                                                            theme.palette
                                                                .classColors[
                                                                characterSpecToClass[
                                                                    char.spec
                                                                ]
                                                            ].text
                                                    }}
                                                >
                                                    {char.name}
                                                </Link>
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            className={`${classes.bold} ${classes.cell}`}
                                        >
                                            <LogLink
                                                logId={char.logId}
                                                realm={realmName}
                                            >
                                                <InfoIcon />

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
                    onChangePage={(e, page) => setPage(page)}
                />
            )}
        </React.Fragment>
    );
}

export default withStyles(styles)(withTheme(CharacterLadder));
