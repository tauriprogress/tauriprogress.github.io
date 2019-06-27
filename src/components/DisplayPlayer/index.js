import { raidName } from "tauriprogress-constants/currentContent";
import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PlayerTitle from "./PlayerTitle";
import PlayerStats from "./PlayerStats";
import PlayerProgression from "./PlayerProgression";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { playerFetch } from "../../redux/actions";

class DisplayPlayer extends React.PureComponent {
    componentDidMount() {
        const playerName = this.props.match.params.playerName;
        const realm = new URLSearchParams(this.props.location.search).get(
            "realm"
        );
        this.props.playerFetch({ playerName, realm });
    }

    render() {
        const { data, loading, error } = this.props.player;

        return (
            <section className="displayPlayer">
                {loading && <Loading />}

                {error && <ErrorMessage message={error} />}
                {!loading && !error && data && (
                    <React.Fragment>
                        <PlayerTitle data={data} />
                        <div className="displayPlayerContentContainer">
                            <PlayerStats data={data} />
                            <PlayerProgression
                                data={data.progression}
                                raidBosses={this.props.raidBosses}
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
        player: state.player,
        raidBosses: state.raidInfo.raids[raidName].encounters
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            playerFetch
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayPlayer);
