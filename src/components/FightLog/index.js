import React, { useEffect } from "react";

import { useLocation, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Container from "@material-ui/core/Container";

import LogTitle from "./LogTitle";
import LogMembers from "./LogMembers";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { fightLogFetch } from "../../redux/actions";
import { getRealmFromLocation } from "../../helpers";

function FightLog() {
    const location = useLocation();
    const match = useRouteMatch("/log/:logId");
    const { loading, error, data } = useSelector(state => state.fightLog);

    const dispatch = useDispatch();

    useEffect(() => {
        const logId = match.params.logId;
        const realm = getRealmFromLocation(location);
        dispatch(fightLogFetch({ logId, realm }));
    }, []);

    return (
        <section className="fightLog">
            {loading && <Loading />}

            {error && <ErrorMessage message={error} />}

            {!loading && !error && data && (
                <Container>
                    <LogTitle data={data} />
                    <LogMembers data={data} />
                </Container>
            )}
        </section>
    );
}

export default FightLog;
