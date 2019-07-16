import { difficultyLabels } from "tauriprogress-constants";
import { specToClass, specs } from "tauriprogress-constants";
import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { bindActionCreators } from "redux";

import { withTheme } from "@material-ui/core/styles";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

import LogLink from "../LogLink";
import Filters from "./Filters";

import { applyFilter } from "./helpers";

import { convertFightTime, getSpecImg } from "../../helpers";

import { raidFetch, raidInfoChangeDiff } from "../../redux/actions";

class RaidBosses extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                realm: "",
                faction: "",
                class: "",
                spec: ""
            }
        };
        this.changeFilter.bind(this);
    }

    componentDidMount() {
        const raidName = this.props.match.params.raidName;
        if (
            this.props.raid.raidName !== raidName ||
            (!this.props.raid.data && !this.props.raid.loading)
        )
            this.props.raidFetch(raidName);
    }

    changeFilter(filterOptions) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                spec:
                    filterOptions.filterName === "class"
                        ? ""
                        : this.state.filter.spec,
                [filterOptions.filterName]: filterOptions.value
            }
        });
    }

    render() {
        const {
            theme: {
                palette: { classColors, factionColors }
            },
            diff,
            raidInfoChangeDiff
        } = this.props;
        const { loading, error, raidName, raidData, data } = this.props.raid;
        const { filter } = this.state;
        let actions = {
            changeFilter: this.changeFilter.bind(this)
        };
        let filteredData = null;

        if (data !== null) {
            filteredData = applyFilter(data[diff], raidData, filter);
        }
        return (
            <React.Fragment>
                {loading && <Loading />}
                {error && <ErrorMessage message={error} />}
                {!loading && !error && filteredData && raidData && (
                    <React.Fragment>
                        <Tabs
                            value={diff}
                            onChange={(e, value) => raidInfoChangeDiff(value)}
                            indicatorColor="secondary"
                            className="raidContainerContentDiffs"
                        >
                            <Tab
                                label={difficultyLabels[5]}
                                value={5}
                                className="tab"
                            />
                            <Tab
                                label={difficultyLabels[6]}
                                value={6}
                                className="tab"
                            />
                        </Tabs>
                        <Filters filter={filter} actions={actions} />
                        <div className="overflowScroll">
                            <Table>
                                <TableHead className="tableHead">
                                    <TableRow>
                                        <TableCell>Boss name</TableCell>
                                        <TableCell>Fastest</TableCell>
                                        <TableCell>Dps</TableCell>
                                        <TableCell>Hps</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {raidData.encounters.map((boss, index) => {
                                        const currentBoss =
                                            filteredData[boss.encounter_name];
                                        return (
                                            <TableRow
                                                key={currentBoss.bossName}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <Typography color="inherit">
                                                        <span className="textBold">
                                                            <RouterLink
                                                                to={`/raid/${raidName}/${
                                                                    currentBoss.bossName
                                                                }`}
                                                            >
                                                                <Link
                                                                    component="span"
                                                                    color="inherit"
                                                                >
                                                                    {
                                                                        currentBoss.bossName
                                                                    }
                                                                </Link>
                                                            </RouterLink>
                                                        </span>
                                                    </Typography>
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {currentBoss.fastestKills
                                                        .guilddata ? (
                                                        <Typography color="inherit">
                                                            <LogLink
                                                                logId={
                                                                    currentBoss
                                                                        .fastestKills
                                                                        .log_id
                                                                }
                                                                realm={
                                                                    currentBoss
                                                                        .fastestKills
                                                                        .realm
                                                                }
                                                            />{" "}
                                                            <span className="textBold">
                                                                {convertFightTime(
                                                                    currentBoss
                                                                        .fastestKills
                                                                        .fight_time
                                                                )}{" "}
                                                            </span>
                                                            {currentBoss
                                                                .fastestKills
                                                                .guilddata
                                                                .name ? (
                                                                <RouterLink
                                                                    to={`/guild/${
                                                                        currentBoss
                                                                            .fastestKills
                                                                            .guilddata
                                                                            .name
                                                                    }?realm=${
                                                                        currentBoss
                                                                            .fastestKills
                                                                            .realm
                                                                    }`}
                                                                >
                                                                    <Link
                                                                        component="span"
                                                                        style={{
                                                                            color: currentBoss
                                                                                .fastestKills
                                                                                .guilddata
                                                                                .faction
                                                                                ? factionColors.horde
                                                                                : factionColors.alliance
                                                                        }}
                                                                    >
                                                                        {
                                                                            currentBoss
                                                                                .fastestKills
                                                                                .guilddata
                                                                                .name
                                                                        }
                                                                    </Link>
                                                                </RouterLink>
                                                            ) : (
                                                                "Random"
                                                            )}
                                                        </Typography>
                                                    ) : (
                                                        <Typography>
                                                            No data
                                                        </Typography>
                                                    )}
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {currentBoss.bestDps
                                                        .name ? (
                                                        <Typography color="inherit">
                                                            <span className="bossInfoCharContainer">
                                                                <span className="textBold">
                                                                    {new Intl.NumberFormat().format(
                                                                        Math.round(
                                                                            currentBoss
                                                                                .bestDps
                                                                                .dps
                                                                        )
                                                                    )}{" "}
                                                                </span>
                                                                <br />

                                                                <span className="textBold">
                                                                    {
                                                                        currentBoss
                                                                            .bestDps
                                                                            .ilvl
                                                                    }{" "}
                                                                </span>
                                                                <Tooltip
                                                                    title={
                                                                        specs[
                                                                            currentBoss
                                                                                .bestDps
                                                                                .spec
                                                                        ].label
                                                                    }
                                                                >
                                                                    <Avatar
                                                                        component="span"
                                                                        src={getSpecImg(
                                                                            specs[
                                                                                currentBoss
                                                                                    .bestDps
                                                                                    .spec
                                                                            ]
                                                                                .image
                                                                        )}
                                                                        className="classSpecAvatar"
                                                                    />
                                                                </Tooltip>

                                                                <span
                                                                    style={{
                                                                        color:
                                                                            classColors[
                                                                                specToClass[
                                                                                    currentBoss
                                                                                        .bestDps
                                                                                        .spec
                                                                                ]
                                                                            ]
                                                                    }}
                                                                    className={
                                                                        "bossInfoCharName"
                                                                    }
                                                                >
                                                                    <RouterLink
                                                                        to={`/player/${
                                                                            currentBoss
                                                                                .bestDps
                                                                                .name
                                                                        }?realm=${
                                                                            currentBoss
                                                                                .bestDps
                                                                                .realm
                                                                        }`}
                                                                    >
                                                                        <Link
                                                                            component="span"
                                                                            color="inherit"
                                                                        >
                                                                            {
                                                                                currentBoss
                                                                                    .bestDps
                                                                                    .name
                                                                            }
                                                                        </Link>
                                                                    </RouterLink>
                                                                </span>
                                                            </span>
                                                        </Typography>
                                                    ) : (
                                                        <Typography>
                                                            No data
                                                        </Typography>
                                                    )}
                                                </TableCell>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {currentBoss.bestHps
                                                        .name ? (
                                                        <Typography color="inherit">
                                                            <span className="textBold">
                                                                {new Intl.NumberFormat().format(
                                                                    Math.round(
                                                                        currentBoss
                                                                            .bestHps
                                                                            .hps
                                                                    )
                                                                )}{" "}
                                                            </span>
                                                            <br />
                                                            <span className="bossInfoCharContainer">
                                                                <span className="textBold">
                                                                    {
                                                                        currentBoss
                                                                            .bestHps
                                                                            .ilvl
                                                                    }{" "}
                                                                </span>
                                                                <Tooltip
                                                                    title={
                                                                        specs[
                                                                            currentBoss
                                                                                .bestHps
                                                                                .spec
                                                                        ].label
                                                                    }
                                                                >
                                                                    <Avatar
                                                                        component="span"
                                                                        src={getSpecImg(
                                                                            specs[
                                                                                currentBoss
                                                                                    .bestHps
                                                                                    .spec
                                                                            ]
                                                                                .image
                                                                        )}
                                                                        className="classSpecAvatar"
                                                                    />
                                                                </Tooltip>

                                                                <span
                                                                    style={{
                                                                        color:
                                                                            classColors[
                                                                                specToClass[
                                                                                    currentBoss
                                                                                        .bestHps
                                                                                        .spec
                                                                                ]
                                                                            ]
                                                                    }}
                                                                    className={
                                                                        "bossInfoCharName"
                                                                    }
                                                                >
                                                                    <RouterLink
                                                                        to={`/player/${
                                                                            currentBoss
                                                                                .bestHps
                                                                                .name
                                                                        }?realm=${
                                                                            currentBoss
                                                                                .bestHps
                                                                                .realm
                                                                        }`}
                                                                    >
                                                                        <Link
                                                                            component="span"
                                                                            color="inherit"
                                                                        >
                                                                            {
                                                                                currentBoss
                                                                                    .bestHps
                                                                                    .name
                                                                            }
                                                                        </Link>
                                                                    </RouterLink>
                                                                </span>
                                                            </span>
                                                        </Typography>
                                                    ) : (
                                                        <Typography>
                                                            No data
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        raid: state.raidInfo.raid,
        diff: state.raidInfo.selectedDiff
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ raidFetch, raidInfoChangeDiff }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme()(RaidBosses));
