import { difficultyLabels } from "tauriprogress-constants";
import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Refresh from "@material-ui/icons/Refresh";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";

import RaidBoss from "./RaidBoss";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import {
    raidBossFetch,
    raidInfoChangeDiff,
    raidBossUpdateStart
} from "../../redux/actions";

import { lastUpdatedTime } from "./helpers";

function styles(theme) {
    return {
        fab: {
            width: "20px",
            height: "20px",
            minHeight: "20px"
        }
    };
}
class DisplayRaidBoss extends React.PureComponent {
    componentDidMount() {
        const raidName = this.props.match.params.raidName;
        const bossName = this.props.match.params.bossName;

        if (
            this.props.raidBoss.raidName !== raidName ||
            this.props.raidBoss.bossName !== bossName
        ) {
            this.props.raidBossFetch({
                raidName,
                bossName
            });
        }
    }
    render() {
        const {
            loading,
            data,
            error,
            bossName,
            raidName,
            update
        } = this.props.raidBoss;
        const {
            diff,
            raidInfoChangeDiff,
            raidBossUpdateStart,
            classes
        } = this.props;

        return (
            <React.Fragment>
                {loading && <Loading />}
                {error && <ErrorMessage message={error} />}
                {!error && data && (
                    <React.Fragment>
                        {!loading && (
                            <div className="displayRaidBossTitle">
                                <Typography variant="h4">
                                    {bossName} {difficultyLabels[diff]}
                                </Typography>
                                <Typography variant="body2">
                                    {data[diff].killCount} Kills
                                </Typography>
                            </div>
                        )}

                        <div className="displayRaidBossDiffTabContainer">
                            <Tabs
                                value={diff}
                                onChange={(e, value) =>
                                    raidInfoChangeDiff(value)
                                }
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
                            {!loading && (
                                <div className="displayRaidBossDiffTabContainerUpdate">
                                    {!update.loading ? (
                                        <React.Fragment>
                                            {!update.error && update.wait && (
                                                <Typography className="updateError">
                                                    {`Please wait ${
                                                        update.wait
                                                    } seconds`}{" "}
                                                    <Fab
                                                        color="primary"
                                                        onClick={() =>
                                                            raidBossUpdateStart(
                                                                {
                                                                    raidName: raidName,
                                                                    bossName: bossName
                                                                }
                                                            )
                                                        }
                                                        className={classes.fab}
                                                    >
                                                        <Refresh fontSize="small" />
                                                    </Fab>
                                                </Typography>
                                            )}
                                            {update.error && (
                                                <Tooltip title={update.error}>
                                                    <Typography className="updateError">
                                                        Error{" "}
                                                        <Fab
                                                            color="primary"
                                                            onClick={() =>
                                                                raidBossUpdateStart(
                                                                    {
                                                                        raidName: raidName,
                                                                        bossName: bossName
                                                                    }
                                                                )
                                                            }
                                                            className={
                                                                classes.fab
                                                            }
                                                        >
                                                            <Refresh fontSize="small" />
                                                        </Fab>
                                                    </Typography>
                                                </Tooltip>
                                            )}
                                            {!update.error && !update.wait && (
                                                <Typography variant="body2">
                                                    <React.Fragment>
                                                        {`${lastUpdatedTime(
                                                            data[diff]
                                                                .lastUpdated
                                                        )} ago`}
                                                    </React.Fragment>{" "}
                                                    <Fab
                                                        color="primary"
                                                        onClick={() =>
                                                            raidBossUpdateStart(
                                                                {
                                                                    raidName: raidName,
                                                                    bossName: bossName
                                                                }
                                                            )
                                                        }
                                                        className={classes.fab}
                                                    >
                                                        <Refresh fontSize="small" />
                                                    </Fab>
                                                </Typography>
                                            )}
                                        </React.Fragment>
                                    ) : (
                                        <CircularProgress
                                            color="secondary"
                                            size={20}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                        <RaidBoss data={!loading ? data[diff] : {}} />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        raidBoss: state.raidBoss,
        diff: state.raidInfo.selectedDiff
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { raidBossFetch, raidInfoChangeDiff, raidBossUpdateStart },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DisplayRaidBoss));
