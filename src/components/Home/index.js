import React from "react";
import { useSelector } from "react-redux";

import GuildList from "../GuildList";
import SeasonalCountdown from "../SeasonalCountdown";
import Page from "../Page";

import { environmentEntireSeasonalSelector } from "../../redux/selectors";

function Home() {
    const { isSeasonal, isSeasonRunning } = useSelector(
        environmentEntireSeasonalSelector
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
