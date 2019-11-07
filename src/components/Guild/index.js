import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { withTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import GuildProgression from "./GuildProgression";
import GuildRoster from "./GuildRoster";
import GuildLatestKills from "./GuildLatestKills";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { guildFetch, guildSelectTab } from "../../redux/actions";

function Guild({ theme, match, location }) {
    const urlGuildName = match.params.guildName;
    const urlRealm = new URLSearchParams(location.search).get("realm");

    const {
        palette: { factionColors }
    } = theme;

    const { data, loading, error, tab } = useSelector(state => state.guild);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(guildFetch({ guildName: urlGuildName, realm: urlRealm }));
    }, [urlGuildName, urlRealm]);

    return (
        <section className="displayGuild">
            {loading && <Loading />}

            {error && <ErrorMessage message={error} />}

            {!loading && !error && data && (
                <React.Fragment>
                    <div className="displayGuildTitle">
                        <Typography
                            variant="h4"
                            style={{
                                color:
                                    data.gFaction === 0
                                        ? factionColors.alliance
                                        : factionColors.horde
                            }}
                        >
                            {data.guildName}
                        </Typography>
                        <Typography variant="caption">
                            {data.guildMembersCount} members
                        </Typography>
                        <Typography variant="caption">
                            {data.realm},{" "}
                            {data.gFaction === 0 ? "Alliance" : "Horde"}
                        </Typography>
                    </div>
                    <div className="displayGuildContentContainer">
                        <AppBar position="static">
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
                        <div className="displayGuildContent">
                            {tab === 0 && (
                                <GuildProgression
                                    progression={data.progression}
                                />
                            )}
                            {tab === 1 && (
                                <GuildLatestKills
                                    data={data.progression.latestKills}
                                    realm={data.realm}
                                />
                            )}
                            {tab === 2 && <GuildRoster data={data.guildList} />}
                        </div>
                    </div>
                </React.Fragment>
            )}
        </section>
    );
}

export default withTheme()(Guild);
