import React, { useState } from "react";

import withStyles from '@mui/styles/withStyles';
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";

import OverflowScroll from "../OverflowScroll";
import CharacterName from "../CharacterName";

import { sortMembers } from "./helpers";

const tableColumns = [
    {
        label: "Character",
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
        },
        number: {
            fontWeight: "bold",
            fontSize: `${12 / 16}rem`
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
                        align={column.label !== "Character" ? "right" : "left"}
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

function LogMembers({ classes, data }) {
    const [sort, setSort] = useState({
        by: "dps",
        direction: "desc"
    });

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
                                    <CharacterName
                                        character={{
                                            ...member,
                                            race: `${member.race},${member.gender}`
                                        }}
                                        realmName={data.realm}
                                    />
                                </Typography>
                            </TableCell>

                            <TableCell align="right">
                                <Tooltip title="Dps">
                                    <Typography className={classes.number}>
                                        {new Intl.NumberFormat().format(
                                            member.dps
                                        )}
                                    </Typography>
                                </Tooltip>
                            </TableCell>

                            <TableCell align="right">
                                <Tooltip title="Damage">
                                    <Typography className={classes.number}>
                                        {new Intl.NumberFormat().format(
                                            member.dmg_done
                                        )}
                                    </Typography>
                                </Tooltip>
                            </TableCell>

                            <TableCell align="right">
                                <Tooltip title="Hps">
                                    <Typography className={classes.number}>
                                        {new Intl.NumberFormat().format(
                                            member.hps
                                        )}
                                    </Typography>
                                </Tooltip>
                            </TableCell>

                            <TableCell align="right">
                                <Tooltip title="Healing">
                                    <Typography className={classes.number}>
                                        {new Intl.NumberFormat().format(
                                            member.total_healing
                                        )}
                                    </Typography>
                                </Tooltip>
                            </TableCell>

                            <TableCell align="right">
                                <Tooltip title="Heal">
                                    <Typography className={classes.number}>
                                        {new Intl.NumberFormat().format(
                                            member.heal_done
                                        )}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right">
                                <Tooltip title="Absorb">
                                    <Typography className={classes.number}>
                                        {new Intl.NumberFormat().format(
                                            member.absorb_done
                                        )}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right">
                                <Tooltip title="Damage taken">
                                    <Typography className={classes.number}>
                                        {new Intl.NumberFormat().format(
                                            member.dmg_taken
                                        )}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right">
                                <Tooltip title="Interrupts">
                                    <Typography className={classes.number}>
                                        {member.interrupts}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right">
                                <Tooltip title="Dispells">
                                    <Typography className={classes.number}>
                                        {member.dispells}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </OverflowScroll>
    );
}

export default withStyles(styles)(LogMembers);
