import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import LogTitle from "./LogTitle";
import LogMembers from "./LogMembers";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { fightLogFetch } from "../../redux/actions";

function FightLog({ match, location }) {
    const { loading, error, data } = useSelector(state => state.fightLog);

    const dispatch = useDispatch();

    useEffect(() => {
        const logId = match.params.logId;
        const realm = new URLSearchParams(location.search).get("realm");
        dispatch(fightLogFetch({ logId, realm }));
    }, []);

    return (
        <section className="fightLog">
            {loading && <Loading />}

            {error && <ErrorMessage message={error} />}

            {!loading && !error && data && (
                <div className="fightLogContentContainer">
                    <LogTitle data={data} />
                    <LogMembers data={data} />
                </div>
            )}
        </section>
    );
}

export default FightLog;
