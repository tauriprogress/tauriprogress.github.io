import React from "react";

import RaidSummary from "../RaidSummary";
import RaidBoss from "../RaidBoss";

import RaidFilter from "../RaidFilter";

function Raid({ match }) {
    return (
        <React.Fragment>
            <RaidFilter />
            {!match.params.bossName ? (
                <RaidSummary match={match} />
            ) : (
                <RaidBoss match={match} />
            )}
        </React.Fragment>
    );
}

export default Raid;
