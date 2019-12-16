import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import GuildTitle from "./GuildTitle";
import GuildProgression from "./GuildProgression";
import GuildRoster from "./GuildRoster";
import GuildLatestKills from "./GuildLatestKills";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { guildFetch, guildSelectTab } from "../../redux/actions";

function Guild({ match, location }) {
    const urlGuildName = match.params.guildName;
    const urlRealm = new URLSearchParams(location.search).get("realm");

    const { data, loading, error, tab } = useSelector(state => state.guild);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(guildFetch({ guildName: urlGuildName, realm: urlRealm }));
    }, [urlGuildName, urlRealm]);

    return (
        <section style={{ margin: "0 10px" }}>
            {loading && <Loading />}

            {error && <ErrorMessage message={error} />}

            {!loading && !error && data && (
                <React.Fragment>
                    <GuildTitle />
                    <AppBar position="static" style={{ marginBottom: "3px" }}>
                        <Tabs
                            value={tab}
                            onChange={(e, value) =>
                                dispatch(guildSelectTab(value))
                            }
                            indicatorColor="secondary"
                            variant="scrollable"
                            scrollButtons="on"
                            className="displayGuildNavTabs"
                        >
                            <Tab label="Progression" className="tab" />
                            <Tab label="Latest kills" className="tab" />
                            <Tab label="Roster" className="tab" />
                        </Tabs>
                    </AppBar>
                    {(() => {
                        switch (tab) {
                            case 0:
                                return (
                                    <GuildProgression
                                        progression={data.progression}
                                    />
                                );
                            case 1:
                                return (
                                    <GuildLatestKills
                                        data={data.progression.latestKills}
                                        realm={data.realm}
                                    />
                                );
                            case 2:
                                return <GuildRoster data={data.guildList} />;
                            default:
                                return null;
                        }
                    })()}
                </React.Fragment>
            )}
        </section>
    );
}

export default Guild;
