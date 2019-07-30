import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PlayerTitle from "./PlayerTitle";
import PlayerStats from "./PlayerStats";
import PlayerProgression from "./PlayerProgression";
import PlayerLatestKills from "./PlayerLatestKills";
import ErrorMessage from "../ErrorMessage";

import { playerDataFetch } from "../../redux/actions";

class DisplayPlayer extends React.PureComponent {
    componentDidMount() {
        const playerName = this.props.match.params.playerName;
        const realm = new URLSearchParams(this.props.location.search).get(
            "realm"
        );
        this.props.playerDataFetch({ playerName, realm });
    }

    render() {
        const { error } = this.props;
        return (
            <section className="displayPlayer">
                {error ? (
                    <ErrorMessage message={error} />
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
}

function mapStateToProps(state) {
    return {
        error: state.player.data.error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            playerDataFetch
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayPlayer);
