import { difficultyLabels } from "tauriprogress-constants";
import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import RaidBoss from "./RaidBoss";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { raidBossFetch, raidInfoChangeDiff } from "../../redux/actions";

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
        const { loading, data, error, bossName } = this.props.raidBoss;
        const { diff, raidInfoChangeDiff } = this.props;

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
    return bindActionCreators({ raidBossFetch, raidInfoChangeDiff }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayRaidBoss);
