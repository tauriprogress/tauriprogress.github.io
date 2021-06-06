import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

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

import { getRealmFromLocation } from "../../helpers";

function Guild({ match, location }) {
    const guildName = match.params.guildName;
    const realm = getRealmFromLocation(location);

    const { loading, loaded, error } = useSelector(state => ({
        loading: state.guild.loading,
        loaded: state.guild.data ? true : false,
        error: state.guild.error
    }));

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
