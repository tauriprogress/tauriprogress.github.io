import React from "react";

import Page from "../Page";
import RaidSummary from "../RaidSummary";
import RaidBoss from "../RaidBoss";

import RaidFilter from "../RaidFilter";

function Raid({ match }) {
    const raidName = match.params.raidName;
    const bossName = match.params.bossName;

    let title = raidName;
    let Component = RaidSummary;

    if (bossName) {
        title = bossName;
        Component = RaidBoss;
    }

    return (
        <Page title={`${title} | Tauri Progress`}>
            <RaidFilter />
            <Component raidName={raidName} bossName={bossName} />
        </Page>
    );
}

export default React.memo(Raid, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
