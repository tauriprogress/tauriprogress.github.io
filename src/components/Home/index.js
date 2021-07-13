import React from "react";
import { useSelector } from "react-redux";

import GuildList from "../GuildList";
import SeasonalCountdown from "../SeasonalCountdown";
import Page from "../Page";

function Home() {
    const { isSeasonal, isSeasonRunning } = useSelector(
        state => state.environment.seasonal
    );

    return (
        <Page>
            {isSeasonal && !isSeasonRunning ? (
                <SeasonalCountdown />
            ) : (
                <GuildList />
            )}
        </Page>
    );
}

export default Home;
