import { specToClass, specs } from "tauriprogress-constants";
import React, { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { withTheme, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import OverflowScroll from "../OverflowScroll";
import SpecImg from "../SpecImg";

import { getSpecImg } from "../../helpers";
import { sortMembers } from "./helpers";

const tableColumns = [
    {
        label: "Player",
        id: "ilvl"
    },
    {
        label: "Dps",
        id: "dps"
    },
    {
        label: "Damage",
        id: "dmg_done"
    },
    {
        label: "Hps",
        id: "hps"
    },
    {
        label: "Healing",
        id: "total_healing"
    },
    {
        label: "Heal",
        id: "heal_done"
    },
    {
        label: "Absorb",
        id: "absorb_done"
    },
    {
        label: "Damage taken",
        id: "dmg_taken"
    },
    {
        label: "Interrupts",
        id: "interrupts"
    },
    {
        label: "Dispells",
        id: "dispells"
    }
];

function styles(theme) {
    return {
        bold: {
            fontWeight: "bold !important"
        }
    };
}

function LogTableHead({ sort, setSort }) {
    return (
        <TableHead>
            <TableRow>
                {tableColumns.map(column => (
                    <TableCell
                        sortDirection={
                            sort.by === column.id ? sort.direction : false
                        }
                        key={column.id}
                    >
                        <Tooltip title="Sort" enterDelay={300}>
                            <TableSortLabel
                                active={sort.by === column.id}
                                direction={sort.direction}
                                onClick={() =>
                                    setSort({
                                        by: column.id,
                                        direction:
                                            sort.by === column.id
                                                ? sort.direction === "asc"
                                                    ? "desc"
                                                    : "asc"
                                                : "desc"
                                    })
                                }
                            >
                                {column.label}
                            </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function LogMembers({ classes, data, theme }) {
    const [sort, setSort] = useState({
        by: "dps",
        direction: "desc"
    });

    const {
        palette: { classColors }
    } = theme;
    return (
        <OverflowScroll>
            <Table>
                <LogTableHead sort={sort} setSort={setSort} />
                <TableBody>
                    {sortMembers(data.members, sort).map(member => (
                        <TableRow key={member.name}>
                            <TableCell component="th" scope="row">
                                <Typography>
                                    <span className={classes.bold}>
                                        {member.ilvl}{" "}
                                    </span>{" "}
                                    <SpecImg
                                        src={getSpecImg(
                                            specs[member.spec].image
                                        )}
                                        title={specs[member.spec].label}
                                    />
                                    <Link
                                        to={`/player/${member.name}?realm=${data.realm}`}
                                        component={RouterLink}
                                        style={{
                                            color:
                                                classColors[
                                                    specToClass[member.spec]
                                                ]
                                        }}
                                    >
                                        {member.name}
                                    </Link>
                                </Typography>
                            </TableCell>

                            <TableCell align="right" className={classes.bold}>
                                <Tooltip title="Dps">
                                    <span className="textBold">
                                        {new Intl.NumberFormat().format(
                                            member.dps
                                        )}
                                    </span>
                                </Tooltip>
                            </TableCell>

                            <TableCell align="right" className={classes.bold}>
                                <Tooltip title="Damage">
                                    <span className="textBold">
                                        {new Intl.NumberFormat().format(
                                            member.dmg_done
                                        )}
                                    </span>
                                </Tooltip>
                            </TableCell>

                            <TableCell align="right" className={classes.bold}>
                                <Tooltip title="Hps">
                                    <span className="textBold">
                                        {new Intl.NumberFormat().format(
                                            member.hps
                                        )}
                                    </span>
                                </Tooltip>
                            </TableCell>

                            <TableCell align="right" className={classes.bold}>
                                <Tooltip title="Healing">
                                    <span className="textBold">
                                        {new Intl.NumberFormat().format(
                                            member.total_healing
                                        )}
                                    </span>
                                </Tooltip>
                            </TableCell>

                            <TableCell align="right" className={classes.bold}>
                                <Tooltip title="Heal">
                                    <span className="textBold">
                                        {new Intl.NumberFormat().format(
                                            member.heal_done
                                        )}
                                    </span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" className={classes.bold}>
                                <Tooltip title="Absorb">
                                    <span className="textBold">
                                        {new Intl.NumberFormat().format(
                                            member.absorb_done
                                        )}
                                    </span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" className={classes.bold}>
                                <Tooltip title="Damage taken">
                                    <span className="textBold">
                                        {new Intl.NumberFormat().format(
                                            member.dmg_taken
                                        )}
                                    </span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" className={classes.bold}>
                                <Tooltip title="Interrupts">
                                    <span>{member.interrupts}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" className={classes.bold}>
                                <Tooltip title="Dispells">
                                    <span>{member.dispells}</span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </OverflowScroll>
    );
}

export default withStyles(styles)(withTheme(LogMembers));
