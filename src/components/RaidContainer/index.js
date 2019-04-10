import { difficultyLabels } from "tauriprogress-constants";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import DisplayRaid from "../DisplayRaid";
import RaidBossList from "../RaidBossList";
import DisplayRaidBoss from "../DisplayRaidBoss";

import { raidFetch, raidBossFetch } from "../../redux/actions";

class RaidContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            diff: 5
        };

        this.changeDiff = this.changeDiff.bind(this);
    }

    changeDiff(e, diff) {
        this.setState({ ...this.state, diff });
    }

    render() {
        const { match, raidData, selected, error } = this.props;

        return (
            <section className="raidContainer">
                {!error && (
                    <aside>
                        {raidData && (
                            <RaidBossList raid={raidData} selected={selected} />
                        )}
                    </aside>
                )}
                <div className="raidContainerContent">
                    {!error && (
                        <Tabs
                            value={this.state.diff}
                            onChange={this.changeDiff}
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
                    )}

                    {!match.params.bossName ? (
                        <DisplayRaid match={match} diff={this.state.diff} />
                    ) : (
                        <DisplayRaidBoss match={match} diff={this.state.diff} />
                    )}
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        raidData: state.raidInfo.raid.raidData,
        selected: state.raidInfo.raid.selected,
        error: state.raidInfo.raid.error
            ? state.raidInfo.raid.error
            : state.raidBoss.error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ raidFetch, raidBossFetch }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RaidContainer);
