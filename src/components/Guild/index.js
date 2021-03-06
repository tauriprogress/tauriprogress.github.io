import React, { useEffect } from "react";
import queryString from "query-string";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import validateRealm from "../Router/validateRealm";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import Page from "../Page";
import GuildTitle from "./GuildTitle";
import GuildProgSummary from "./GuildProgSummary";
import GuildRoster from "./GuildRoster";
import GuildBossKillsDays from "./GuildBossKillsDays";
import GuildProgression from "./GuildProgression";
import AsideContainer from "../AsideContainer";
import SelectRealm from "../SelectRealm";

import { fetchGuild } from "../../redux/actions";

function Guild({ match, location }) {
    const guildName = match.params.guildName;
    const realm = queryString.parse(location.search).realm;

    const { loading, loaded, error } = useSelector(
        state => ({
            loading: state.guild.loading,
            loaded: !!state.guild.data,
            error: state.guild.error
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGuild({ guildName: guildName, realm: realm }));
    }, [guildName, realm, dispatch]);
    return (
        <Page title={`${match.params.guildName} | Tauri Progress`}>
            <section>
                {loading && <Loading />}

                {error && (
                    <React.Fragment>
                        <ErrorMessage message={error} />
                        {error === "guild not found" && <SelectRealm />}
                    </React.Fragment>
                )}

                {!loading && !error && loaded && (
                    <React.Fragment>
                        <AsideContainer AsideComponent={GuildTitle}>
                            <GuildProgSummary />
                        </AsideContainer>
                        <GuildRoster />
                        <GuildProgression />
                        <GuildBossKillsDays />
                    </React.Fragment>
                )}
            </section>
        </Page>
    );
}

export default validateRealm()(Guild);
