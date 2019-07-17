import React from "react";
import { connect } from "react-redux";

function RaidBossStats({ stats }) {
    return (
        <div className="displayRaidBossStatsContainer">
            {JSON.stringify(stats)}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        stats: state.raidBoss.stats
    };
}

export default connect(mapStateToProps)(RaidBossStats);
