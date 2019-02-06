import React from "react";
import { connect } from "react-redux";

import RaidBossList from "../RaidBossList";

function RaidBossListContainer({ raids }) {
    return (
        <aside>
            {raids.map(raid => (
                <RaidBossList key={raid.name} raid={raid} />
            ))}
        </aside>
    );
}

function mapStateToProps(state) {
    return {
        raids: state.raidInfo.raids
    };
}

export default connect(mapStateToProps)(RaidBossListContainer);
