import React from "react";
import { useSelector } from "react-redux";

import Raid from "../Raid";
import RaidBossList from "../RaidBossList";
import RaidBoss from "../RaidBoss";
import AsideContainer from "../AsideContainer";

function RaidContainer({ match }) {
    const { raidData, selected, error } = useSelector(state => ({
        raidData: state.raidInfo.raid.raidData,
        selected: state.raidInfo.raid.selected
    }));

    return (
        <AsideContainer
            AsideComponent={() =>
                raidData && <RaidBossList raid={raidData} selected={selected} />
            }
        >
            {!match.params.bossName ? (
                <Raid match={match} />
            ) : (
                <RaidBoss match={match} />
            )}
        </AsideContainer>
    );
}

export default RaidContainer;
