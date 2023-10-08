import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import ElevatedLinearProgress from "../ElevatedLinearProgress";
import ErrorMessage from "../ErrorMessage";
import Page from "../Page";
import GuildLeaderboardFilter from "./GuildLeaderboardFilter";
import GuildLeaderboardList from "../GuildLeaderboardList";

import {
    filterGuilds,
    transformGuildFastestKillToLeaderboardItems,
    transformGuildFullClearRankingToLeaderboardItems,
} from "./helpers";

import {
    guildLeaderboardFetch,
    guildLeaderboardSetTab,
} from "../../redux/actions";

import { styled } from "@mui/system";
import { guildLeaderboardEntireSelector } from "../../redux/selectors";

export const SecondaryTextSpan = styled("span")(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

function GuildLeaderboard() {
    const { data, loading, error, filter, selectedTab } = useSelector(
        (state) => ({
            ...guildLeaderboardEntireSelector(state),
        }),
        shallowEqual
    );
    const dispatch = useDispatch();

    const selectedTabName = selectedTab === 0 ? "fullClear" : "fastestKills";

    const filteredGuilds = filterGuilds(filter, selectedTabName, data);

    const guilds =
        selectedTab === 0
            ? transformGuildFullClearRankingToLeaderboardItems(
                  filteredGuilds,
                  filter
              )
            : transformGuildFastestKillToLeaderboardItems(
                  filteredGuilds,
                  filter
              );

    useEffect(() => {
        dispatch(guildLeaderboardFetch());
    }, [dispatch]);

    return (
        <Page title={"Guild Leaderboard | Tauri Progress"}>
            <section>
                <GuildLeaderboardFilter />
                <Tabs
                    value={selectedTab}
                    onChange={(e, value) =>
                        dispatch(guildLeaderboardSetTab(value))
                    }
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="FULL CLEAR" value={0} />
                    <Tab label="BEST KILLS" value={1} />
                </Tabs>
                {loading && <ElevatedLinearProgress top="40px" />}

                <GuildLeaderboardList guilds={guilds} />
                {error && (
                    <ErrorMessage
                        message={error}
                        refresh={() => dispatch(guildLeaderboardFetch())}
                    />
                )}
            </section>
        </Page>
    );
}

export default React.memo(GuildLeaderboard, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
