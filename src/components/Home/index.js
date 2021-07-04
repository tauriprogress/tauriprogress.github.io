import React from "react";
import { useSelector } from "react-redux";

import GuildList from "../GuildList";
import SeasonalCountdown from "../SeasonalCountdown";

function Home() {
    const { isSeasonal, isSeasonRunning } = useSelector(
        state => state.seasonal
    );
    if (isSeasonal && !isSeasonRunning) {
        return <SeasonalCountdown />;
    }
    return <GuildList />;
}

export default Home;
