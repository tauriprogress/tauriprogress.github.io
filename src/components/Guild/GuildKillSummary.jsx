import React from "react";

import GuildBossFilter from "./GuildBossFilter";
import GuildBoss from "./GuildBoss";

function GuildKillSummary() {
    return (
        <React.Fragment>
            <GuildBossFilter />
            <GuildBoss />
        </React.Fragment>
    );
}

export default GuildKillSummary;
