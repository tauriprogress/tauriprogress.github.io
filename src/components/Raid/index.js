import React from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";

import Page from "../Page";
import RaidSummary from "../RaidSummary";
import RaidBoss from "../RaidBoss";

import RaidFilter from "../RaidFilter";

function Raid({ match }) {
    const selectedTab = useSelector(state => state.raidBoss.selectedTab);
    let filter = useSelector(state => state.raid.filter);
    let title = match.params.raidName;
    let Component = RaidSummary;

    if (match.params.bossName) {
        filter = { ...filter, tab: selectedTab };
        title = match.params.bossName;
        Component = RaidBoss;
    }

    const searchQuery = queryString.stringify(filter);

    if (searchQuery !== window.location.search) {
        window.history.replaceState(
            window.history.state,
            document.title,
            `${window.location.origin}${window.location.pathname}?${searchQuery}`
        );
    }

    return (
        <Page title={`${title} | Tauri Progress`}>
            <RaidFilter />
            <Component match={match} />
        </Page>
    );
}

export default Raid;
