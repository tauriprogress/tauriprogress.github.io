import React, { useState } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CharacterLadder from "../CharacterLadder";
import GuildFastestKills from "./GuildFastestKills";

function GuildBoss({ data }) {
    const [tab, selectTab] = useState(0);

    return (
        <React.Fragment>
            {data && (
                <React.Fragment>
                    <Tabs
                        value={tab}
                        onChange={(e, tab) => selectTab(tab)}
                        indicatorColor="secondary"
                    >
                        <Tab label="Dps" className="tab" />
                        <Tab label="Hps" className="tab" />
                        <Tab label="Fastest Kills" className="tab" />
                    </Tabs>

                    {(() => {
                        switch (tab) {
                            case 0:
                            case 1:
                                return (
                                    <CharacterLadder
                                        data={tab === 0 ? data.dps : data.hps}
                                        type={tab === 0 ? "dps" : "hps"}
                                        disableFilter={{
                                            faction: true,
                                            realm: true
                                        }}
                                    />
                                );
                            case 2:
                                return (
                                    <GuildFastestKills
                                        data={data.fastestKills}
                                    />
                                );
                            default:
                                return null;
                        }
                    })()}
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default GuildBoss;
