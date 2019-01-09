import React from "react";

import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import characterClassColors from "../../constants/characterClassColors";
import specToClass from "../../constants/specToClass";
import specs from "../../constants/specs";

import { convertFightTime } from "../DisplayRaid/helpers";
import { getSpecImg } from "../DisplayRaid/helpers";

function LogTitle({ data }) {
    return (
        <div className="fightLogTitle overflowScroll">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Player</TableCell>

                        <TableCell align="right">Dps</TableCell>

                        <TableCell align="right">Damage done</TableCell>
                        <TableCell align="right">Hps</TableCell>
                        <TableCell align="right">Healing done</TableCell>

                        <TableCell align="right">Absorb done</TableCell>
                        <TableCell align="right">Damage taken</TableCell>

                        <TableCell align="right">Interrupts</TableCell>
                        <TableCell align="right">Dispells</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.members.map(member => (
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <span className="textBold">{member.ilvl} </span>{" "}
                                <Tooltip title={specs[member.spec].label}>
                                    <Avatar
                                        component="span"
                                        src={getSpecImg(
                                            specs[member.spec].image
                                        )}
                                        className="classSpecAvatar"
                                    />
                                </Tooltip>{" "}
                                <span
                                    style={{
                                        color:
                                            characterClassColors[
                                                specToClass[member.spec]
                                            ]
                                    }}
                                >
                                    <Link
                                        to={`/player/${member.name}?realm=${
                                            data.realm
                                        }`}
                                    >
                                        {member.name}
                                    </Link>
                                </span>
                            </TableCell>

                            <TableCell component="th" scope="row" align="right">
                                <span className="textBold">
                                    {new Intl.NumberFormat().format(
                                        Math.round(
                                            member.dmg_done /
                                                (data.fight_time / 1000)
                                        )
                                    )}
                                </span>
                            </TableCell>

                            <TableCell component="th" scope="row" align="right">
                                <span className="textBold">
                                    {new Intl.NumberFormat().format(
                                        member.dmg_done
                                    )}
                                </span>
                            </TableCell>

                            <TableCell component="th" scope="row" align="right">
                                <span className="textBold">
                                    {new Intl.NumberFormat().format(
                                        Math.round(
                                            (member.heal_done +
                                                member.absorb_done) /
                                                (data.fight_time / 1000)
                                        )
                                    )}
                                </span>
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                <span className="textBold">
                                    {new Intl.NumberFormat().format(
                                        member.heal_done
                                    )}
                                </span>
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                <span className="textBold">
                                    {new Intl.NumberFormat().format(
                                        member.absorb_done
                                    )}
                                </span>
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                <span className="textBold">
                                    {new Intl.NumberFormat().format(
                                        member.dmg_taken
                                    )}
                                </span>
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                {member.interrupts}
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                {member.dispells}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default LogTitle;
