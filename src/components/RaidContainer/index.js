import React from "react";
import { useSelector } from "react-redux";

import Raid from "../Raid";
import RaidBoss from "../RaidBoss";

function RaidContainer({ match }) {
    const { raidData, selected } = useSelector(state => ({
        raidData: state.raidInfo.raid.raidData,
        selected: state.raidInfo.raid.selected
    }));

    return !match.params.bossName ? (
        <Raid match={match} />
    ) : (
        <RaidBoss match={match} />
    );
}

export default RaidContainer;
