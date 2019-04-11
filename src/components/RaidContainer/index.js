import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DisplayRaid from "../DisplayRaid";
import RaidBossList from "../RaidBossList";
import DisplayRaidBoss from "../DisplayRaidBoss";

import { raidFetch, raidBossFetch } from "../../redux/actions";

function RaidContainer({ match, raidData, selected, error }) {
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
                {!match.params.bossName ? (
                    <DisplayRaid match={match} />
                ) : (
                    <DisplayRaidBoss match={match} />
                )}
            </div>
        </section>
    );
}

function mapStateToProps(state) {
    return {
        raidData: state.raidInfo.raid.raidData,
        selected: state.raidInfo.raid.selected
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ raidFetch, raidBossFetch }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RaidContainer);
