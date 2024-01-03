import React, { useEffect } from "react";
import queryString from "query-string";

import { useSelector, useDispatch } from "react-redux";

import { validateRealm } from "../Router/validateRealm";

import LogTitle from "./LogTitle";
import LogBody from "./LogBody";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { logFetch } from "../../redux/actions";
import { logEntireDataSelector } from "../../redux/log/selectors";
import { styled } from "@mui/system";
import { useLocation, useRouteMatch } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
}));

export function Component() {
    const location = useLocation();
    const match = useRouteMatch();
    const { data, loading, error } = useSelector(logEntireDataSelector);

    const dispatch = useDispatch();

    const logId = match.params.logId;
    const realm = decodeURI(queryString.parse(location.search).realm);

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
                    <LogBody data={data} realm={realm} />
                </Container>
            )}
        </section>
    );
}

export const Log = validateRealm()(Component);
