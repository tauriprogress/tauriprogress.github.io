import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import withTheme from '@mui/styles/withTheme';
import withStyles from '@mui/styles/withStyles';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import LogLink from "../LogLink";
import DateTooltip from "../DateTooltip";
import DisplayDate from "../DisplayDate";
import InfoIcon from "../InfoIcon";
import CharacterName from "../CharacterName";

import { filterChars } from "./helpers";
import { environmentCharacterSpecsSelector } from "../../redux/selectors";
function styles(theme) {
    return {
        uppercase: {
            textTransform: "uppercase",
        },
        bold: {
            fontWeight: "bold",
        },
        cell: {
            padding: theme.spacing(1),
        },
    };
}

function CharacterLadder({
    filter = {},
    classes,
    type,
    data,
    page: propsPage,
    pageSize = 30,
    onPageChange,
    itemCount,
    sliced,
}) {
    const specs = useSelector(environmentCharacterSpecsSelector);

    const [localPage, setPage] = useState(0);

    let page = typeof propsPage !== "undefined" ? propsPage : localPage;

    useEffect(() => {
        setPage(0);
    }, [type, data, filter]);

    let filteredData = filterChars(filter, data, specs);
    const filteredDataLength = filteredData.length;

    if (!sliced) {
        filteredData = filteredData.slice(
            page * pageSize,
            (page + 1) * pageSize
        );
    }

    function changePage(e, page) {
        if (onPageChange) {
            onPageChange(e, page);
        } else {
            setPage(page);
        }
    }

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
                        filteredData.map((char, index) => {
                            const date = new Date(char.date * 1000);
                            return (
                                <TableRow key={index} hover>
                                    <TableCell className={classes.cell}>
                                        <Typography color="inherit">
                                            <span className={classes.bold}>
                                                {index + 1 + page * pageSize}.{" "}
                                            </span>

                                            <CharacterName
                                                character={char}
                                                realmName={char.realm}
                                            />
                                        </Typography>
                                    </TableCell>

                                    <TableCell
                                        className={`${classes.bold} ${classes.cell}`}
                                    >
                                        <LogLink
                                            logId={char.logId}
                                            realm={char.realm}
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
                    count={itemCount || filteredDataLength}
                    rowsPerPage={pageSize}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page",
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page",
                    }}
                    onPageChange={changePage}
                />
            )}
        </React.Fragment>
    );
}

export default withStyles(styles)(withTheme(CharacterLadder));
