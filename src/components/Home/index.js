import React from "react";

import RaidBossListContainer from "../RaidBossListContainer";
import GuildList from "../GuildList";
import AsideContainer from "../AsideContainer";

function Home() {
    return (
        <AsideContainer AsideComponent={RaidBossListContainer}>
            <GuildList />
        </AsideContainer>
    );
}

export default Home;
