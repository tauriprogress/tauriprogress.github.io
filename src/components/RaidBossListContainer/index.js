import React from "react";
import { useSelector } from "react-redux";

import RaidBossList from "../RaidBossList";

function RaidBossListContainer() {
    const raids = useSelector(state => state.raidInfo.raids);
    let raidsArr = [];
    for (let raidName in raids) {
        raidsArr.push(raids[raidName]);
    }

    return (
        <React.Fragment>
            {raidsArr.map(raid => (
                <RaidBossList key={raid.name} raid={raid} />
            ))}
        </React.Fragment>
    );
}

export default RaidBossListContainer;
