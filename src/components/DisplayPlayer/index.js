import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../Loading";
import PlayerTitle from "./PlayerTitle";
import PlayerStats from "./PlayerStats";
import PlayerProgression from "./PlayerProgression";
import PlayerLatestKills from "./PlayerLatestKills";
import ErrorMessage from "../ErrorMessage";

import { playerDataFetch } from "../../redux/actions";

function Player({ match, location }) {
    const playerName = match.params.playerName;
    const realm = new URLSearchParams(location.search).get("realm");
    const { loading, error } = useSelector(state => state.player.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(playerDataFetch({ playerName, realm }));
    }, [playerName, realm]);

    return (
        <section className="displayPlayer">
            {error ? (
                <ErrorMessage message={error} />
            ) : loading ? (
                <Loading />
            ) : (
                <React.Fragment>
                    <PlayerTitle />
                    <div className="displayPlayerContentContainer">
                        <PlayerStats />
                        <PlayerProgression />
                        <PlayerLatestKills />
                    </div>
                </React.Fragment>
            )}
        </section>
    );
}

export default Player;
