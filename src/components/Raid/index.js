import React from "react";

import RaidSummary from "../RaidSummary";
import RaidBoss from "../RaidBoss";

function Raid({ match }) {
    return !match.params.bossName ? (
        <RaidSummary match={match} />
    ) : (
        <RaidBoss match={match} />
    );
}

export default Raid;
