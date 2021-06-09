import React from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";

import Page from "../Page";
import RaidSummary from "../RaidSummary";
import RaidBoss from "../RaidBoss";

import RaidFilter from "../RaidFilter";

function Raid({ match }) {
    const filter = queryString.stringify(
        useSelector(state => state.raid.filter)
    );
    if (filter !== window.location.search) {
        window.history.replaceState(
            window.history.state,
            document.title,
            `${window.location.origin}${window.location.pathname}?${filter}`
        );
    }
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
