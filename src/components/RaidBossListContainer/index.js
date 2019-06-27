import React from "react";
import { connect } from "react-redux";

import RaidBossList from "../RaidBossList";

function RaidBossListContainer({ raids }) {
    let raidsArr = [];
    for (let raidName in raids) {
        raidsArr.push(raids[raidName]);
    }

    return (
        <aside>
            {raidsArr.map(raid => (
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
