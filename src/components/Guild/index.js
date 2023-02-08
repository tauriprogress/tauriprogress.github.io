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
import GuildKillSummary from "./GuildKillSummary";
import GuildRecentKills from "./GuildRecentKills";
import AsideContainer from "../AsideContainer";
import SelectRealm from "../SelectRealm";

import { guildFetch } from "../../redux/actions";

import {
    guildLoadingSelector,
    guildDataExistsSelector,
    guildErrorSelector,
} from "../../redux/guild/selectors";

function Guild({ match, location }) {
    const guildName = match.params.guildName;
    const realm = queryString.parse(location.search).realm;

    const { loading, loaded, error } = useSelector(
        (state) => ({
            loading: guildLoadingSelector(state),
            loaded: guildDataExistsSelector(state),
            error: guildErrorSelector(state),
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(guildFetch({ guildName: guildName, realm: realm }));
    }, [guildName, realm, dispatch]);

    return (
        <Page title={`${match.params.guildName} | Tauri Progress`}>
            <section>
                {loading && <Loading />}

                {error && (
                    <React.Fragment>
                        <ErrorMessage
                            message={error}
                            refresh={() =>
                                dispatch(
                                    guildFetch({
                                        guildName: guildName,
                                        realm: realm,
                                    })
                                )
                            }
                        />
                        {error === "guild not found" && <SelectRealm />}
                    </React.Fragment>
                )}

                {!loading && !error && loaded && (
                    <React.Fragment>
                        <AsideContainer AsideComponent={GuildTitle}>
                            <GuildProgSummary />
                        </AsideContainer>

                        <GuildRoster />
                        <GuildKillSummary />
                        <GuildRecentKills />
                        <GuildBossKillsDays />
                    </React.Fragment>
                )}
            </section>
        </Page>
    );
}

export default validateRealm()(
    React.memo(Guild, (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    })
);
