import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

import { raidName } from "../../constants/currentContent";
import { getSpecImg } from "../DisplayRaid/helpers";

class PlayerProgression extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 5
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, value) {
        this.setState({ ...this.state, value: value });
    }

    render() {
        const { data, raidBosses } = this.props;
        return (
            <div className="displayPlayerProgression">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="secondary"
                    className="displayPlayerTabs"
                >
                    <Tab label="10 HC" className="tab" value={5} />
                    <Tab label="25 HC" className="tab" value={6} />
                </Tabs>
                <div className="overflowScroll">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>BossName</TableCell>
                                <TableCell>Dps</TableCell>
                                <TableCell>Hps</TableCell>
                                <TableCell>Defeated</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {raidBosses.map(boss => {
                                const currentBoss =
                                    data[raidName][this.state.value][
                                        boss.encounter_name
                                    ];
                                let defeated = false;
                                const dps = currentBoss.dps;
                                const hps = currentBoss.hps;
                                if (dps.dps || hps.hps) defeated = true;
                                return (
                                    <TableRow key={boss.encounter_name}>
                                        <TableCell component="th" scope="row">
                                            {boss.encounter_name}
                                        </TableCell>
                                        <TableCell>
                                            {dps.dps ? (
                                                <React.Fragment>
                                                    {dps.ilvl}{" "}
                                                    <Tooltip
                                                        title={dps.spec.label}
                                                    >
                                                        <Avatar
                                                            component="span"
                                                            src={getSpecImg(
                                                                dps.spec.image
                                                            )}
                                                            className="classSpecAvatar"
                                                        />
                                                    </Tooltip>{" "}
                                                    <span className="textBold">
                                                        {new Intl.NumberFormat().format(
                                                            Math.round(dps.dps)
                                                        )}
                                                    </span>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    -
                                                </React.Fragment>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {hps.hps ? (
                                                <React.Fragment>
                                                    {hps.ilvl}{" "}
                                                    <Tooltip
                                                        title={hps.spec.label}
                                                    >
                                                        <Avatar
                                                            component="span"
                                                            src={getSpecImg(
                                                                hps.spec.image
                                                            )}
                                                            className="classSpecAvatar"
                                                        />
                                                    </Tooltip>{" "}
                                                    <span className="textBold">
                                                        {new Intl.NumberFormat().format(
                                                            Math.round(hps.hps)
                                                        )}
                                                    </span>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    -
                                                </React.Fragment>
                                            )}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {defeated ? (
                                                <span className="green">
                                                    Defeated
                                                </span>
                                            ) : (
                                                <span className="red">
                                                    Alive
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default PlayerProgression;
