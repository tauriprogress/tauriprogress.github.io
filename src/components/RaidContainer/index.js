import React from "react";
import { useSelector } from "react-redux";

import DisplayRaid from "../DisplayRaid";
import RaidBossList from "../RaidBossList";
import DisplayRaidBoss from "../DisplayRaidBoss";

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
                    <DisplayRaid match={match} />
                ) : (
                    <DisplayRaidBoss match={match} />
                )}
            </div>
        </section>
    );
}

export default RaidContainer;
