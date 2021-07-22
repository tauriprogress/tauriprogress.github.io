import React from "react";
import { useSelector } from "react-redux";

import Page from "../Page";
import RaidSummary from "../RaidSummary";
import RaidBoss from "../RaidBoss";

import RaidFilter from "../RaidFilter";

import { replaceUrlSearchQuery } from "../../helpers";

function Raid({ match }) {
    const selectedTab = useSelector(state => state.raidBoss.tab.selectedTab);
    let filter = useSelector(state => state.raid.filter);
    let title = match.params.raidName;
    let Component = RaidSummary;

    if (match.params.bossName) {
        filter = { ...filter, tab: selectedTab };
        title = match.params.bossName;
        Component = RaidBoss;
    }

    replaceUrlSearchQuery(filter);

    return (
        <Page title={`${title} | Tauri Progress`}>
            <RaidFilter />
            <Component match={match} />
        </Page>
    );
}

export default React.memo(Raid, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
