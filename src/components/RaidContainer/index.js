import React from "react";
import { useSelector } from "react-redux";

import Raid from "../Raid";
import RaidBossList from "../RaidBossList";
import RaidBoss from "../RaidBoss";

function RaidContainer({ match }) {
    const { raidData, selected, error } = useSelector(state => ({
        raidData: state.raidInfo.raid.raidData,
        selected: state.raidInfo.raid.selected
    }));

    return (
        <section className="raidContainer">
            {!error && (
                <aside>
                    {raidData && (
                        <RaidBossList raid={raidData} selected={selected} />
                    )}
                </aside>
            )}
            <div className="raidContainerContent">
                {!match.params.bossName ? (
                    <Raid match={match} />
                ) : (
                    <RaidBoss match={match} />
                )}
            </div>
        </section>
    );
}

export default RaidContainer;
