import React from "react";

import RaidBossListContainer from "../RaidBossListContainer";
import GuildList from "../GuildList";
import OverflowScroll from "../OverflowScroll";
import AsideContainer from "../AsideContainer";

function Home() {
    return (
        <AsideContainer AsideComponent={RaidBossListContainer}>
            <OverflowScroll>
                <GuildList />
            </OverflowScroll>
        </AsideContainer>
    );
}

export default Home;
