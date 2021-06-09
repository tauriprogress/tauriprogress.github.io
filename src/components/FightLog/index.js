import React, { useEffect } from "react";
import queryString from "query-string";

import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import validateRealm from "../Router/validateRealm";

import Container from "@material-ui/core/Container";

import Page from "../Page";
import LogTitle from "./LogTitle";
import LogMembers from "./LogMembers";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { fetchFightLog } from "../../redux/actions";

function FightLog({ match }) {
    const location = useLocation();
    const { loading, error, data } = useSelector(state => state.fightLog);

    const dispatch = useDispatch();

    const logId = match.params.logId;
    const realm = queryString.parse(location.search).realm;

    useEffect(() => {
        dispatch(fetchFightLog({ logId, realm }));
    }, [logId, realm, dispatch]);

    return (
        <Page
            title={
                location.background
                    ? `Log ${match.params.logId} | Tauri Progress`
                    : null
            }
        >
            <section>
                {loading && <Loading />}

                {error && <ErrorMessage message={error} />}

                {!loading && !error && data && (
                    <Container>
                        <LogTitle data={data} />
                        <LogMembers data={data} />
                    </Container>
                )}
            </section>
        </Page>
    );
}

export default validateRealm()(FightLog);
