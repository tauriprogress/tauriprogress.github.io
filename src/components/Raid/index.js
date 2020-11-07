import React from "react";

import Page from "../Page";
import RaidSummary from "../RaidSummary";
import RaidBoss from "../RaidBoss";

import RaidFilter from "../RaidFilter";

function Raid({ match }) {
    return (
        <Page
            title={`${
                match.params.bossName || match.params.raidName
            } | Tauri Progress`}
        >
            <RaidFilter />
            {!match.params.bossName ? (
                <RaidSummary match={match} />
            ) : (
                <RaidBoss match={match} />
            )}
        </Page>
    );
}

export default Raid;
