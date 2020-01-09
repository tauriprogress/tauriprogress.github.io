import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import GuildTitle from "./GuildTitle";
import GuildProgSummary from "./GuildProgSummary";
import GuildRoster from "./GuildRoster";
import GuildProgression from "./GuildProgression";
import GuildLastestKills from "./GuildLastestKills";
import AsideContainer from "../AsideContainer";

import { guildFetch, guildSelectTab } from "../../redux/actions";

function Guild({ match, location }) {
    const urlGuildName = match.params.guildName;
    const urlRealm = new URLSearchParams(location.search).get("realm");

    const { loading, loaded, error, tab } = useSelector(state => ({
        loading: state.guild.loading,
        loaded: state.guild.data ? true : false,
        error: state.guild.error
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(guildFetch({ guildName: urlGuildName, realm: urlRealm }));
    }, [urlGuildName, urlRealm]);
    return (
        <section>
            {loading && <Loading />}

            {error && <ErrorMessage message={error} />}

            {!loading && !error && loaded && (
                <React.Fragment>
                    <AsideContainer AsideComponent={GuildTitle}>
                        <GuildProgSummary />
                    </AsideContainer>
                    <GuildRoster />
                    <GuildProgression />
                    <GuildLastestKills />
                </React.Fragment>
            )}
        </section>
    );
}

export default Guild;
