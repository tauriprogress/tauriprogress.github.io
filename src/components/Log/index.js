import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import validateRealm from "../Router/validateRealm";

import Container from "@mui/material/Container";

import LogTitle from "./LogTitle";
import LogMembers from "./LogMembers";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { logFetch } from "../../redux/actions";
import { logEntireDataSelector } from "../../redux/log/selectors";

function Log({ match, location }) {
    const { data, loading, error } = useSelector(logEntireDataSelector);

    const dispatch = useDispatch();

    const logId = match.params.logId;
    const realm = unescape(location.query.realm);

    useEffect(() => {
        dispatch(logFetch({ logId, realm }));
    }, [logId, realm, dispatch]);

    return (
        <section>
            {loading && <Loading />}

            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() => dispatch(logFetch({ logId, realm }))}
                />
            )}

            {!loading && !error && !!data && (
                <Container>
                    <LogTitle data={data} />
                    <LogMembers data={data} />
                </Container>
            )}
        </section>
    );
}

export default validateRealm()(Log);
