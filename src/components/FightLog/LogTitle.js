import React from "react";

import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import difficultyLabels from "../../constants/difficultyLabels";

import { convertFightTime } from "../DisplayRaid/helpers";

function LogTitle({ data }) {
    return (
        <div className="fightLogTitle overflowScroll">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Guild</TableCell>

                        <TableCell>Encounter</TableCell>

                        <TableCell>Deaths</TableCell>
                        <TableCell>Resurrects</TableCell>
                        <TableCell>Time</TableCell>

                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            {data.guildid ? (
                                <Link
                                    to={`/guild/${data.guilddata.name}?realm=${
                                        data.realm
                                    }`}
                                >
                                    <span
                                        className={
                                            data.guilddata.faction === 0
                                                ? "blue"
                                                : "red"
                                        }
                                    >
                                        {data.guilddata.name}
                                    </span>
                                </Link>
                            ) : (
                                "Random"
                            )}
                        </TableCell>

                        <TableCell component="th" scope="row">
                            <Link
                                to={`/raid/${data.mapentry.name}/${
                                    data.encounter_data.encounter_name
                                }`}
                            >
                                <span className="textBold">
                                    {data.encounter_data.encounter_name}{" "}
                                    {difficultyLabels[data.difficulty]}
                                </span>
                            </Link>
                        </TableCell>

                        <TableCell
                            component="th"
                            scope="row"
                            className="textBold"
                        >
                            {data.deaths_fight}
                        </TableCell>
                        <TableCell
                            component="th"
                            scope="row"
                            className="textBold"
                        >
                            {data.resurrects_fight}
                        </TableCell>

                        <TableCell component="th" scope="row">
                            {convertFightTime(data.fight_time)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {new Date(
                                data.killtime * 1000
                            ).toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default LogTitle;
