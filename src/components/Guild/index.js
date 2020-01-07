import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import GuildIntroduction from "./GuildIntroduction";
import GuildProgSummary from "./GuildProgSummary";
import GuildRoster from "./GuildRoster";

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
                    <Grid container>
                        <Grid item>
                            <GuildIntroduction />
                        </Grid>
                        <Grid item style={{ flex: "1" }}>
                            <GuildProgSummary />
                        </Grid>
                    </Grid>
                    <GuildRoster />
                </React.Fragment>
            )}
        </section>
    );
}

export default Guild;
