import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CircularProgress from "@material-ui/core/CircularProgress";

import PlayerTitle from "./PlayerTitle";
import PlayerStats from "./PlayerStats";
import PlayerProgression from "./PlayerProgression";

import {
    playerSetError,
    playerSetLoading,
    playerFill
} from "../../redux/actions";

import { raidName } from "../../constants/currentContent";

class DisplayPlayer extends React.PureComponent {
    componentDidMount() {
        const playerName = this.props.match.params.playerName;
        const realm = new URLSearchParams(this.props.location.search).get(
            "realm"
        );

        this.props.playerSetLoading(true);
        fetch("https:/ossified-hyacinth.glitch.me/getplayer", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                playerName: playerName,
                raidName: raidName,
                realm: realm
            })
        })
            .then(res => res.json())
            .then(res => {
                if (!res.success) {
                    throw new Error(res.errorstring);
                } else {
                    this.props.playerFill(res.response);
                }
            })
            .catch(err => this.props.playerSetError(err.message));
    }
    render() {
        const { data, loading, error } = this.props.player;

        return (
            <section className="displayPlayer">
                {loading && (
                    <div className="displayPlayerLoaderContainer">
                        <CircularProgress
                            className="displayPlayerLoader"
                            color="secondary"
                        />
                    </div>
                )}

                {error && <span className="red">{error}</span>}
                {!loading && !error && data && (
                    <React.Fragment>
                        <PlayerTitle data={data} />
                        <div className="displayPlayerContentContainer">
                            <PlayerStats data={data} />
                            <PlayerProgression
                                data={data.progression[raidName]}
                            />
                        </div>
                    </React.Fragment>
                )}
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        player: state.player
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            playerSetError,
            playerSetLoading,
            playerFill
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayPlayer);
