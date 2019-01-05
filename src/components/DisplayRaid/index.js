import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CircularProgress from "@material-ui/core/CircularProgress";

import RaidBossSummary from "../RaidBossSummary";

import { raidFill, raidSetError, raidSetLoading } from "../../redux/actions";

import { serverUrl } from "../../constants/urls";

class DisplayRaid extends React.PureComponent {
    componentDidMount() {
        const raidName = this.props.match.params.raidName;
        this.props.raidSetLoading(true);
        fetch(`${serverUrl}/getraid`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                raidName: raidName
            })
        })
            .then(res => res.json())
            .then(res => {
                if (!res.success) {
                    throw new Error(res.errorstring);
                } else {
                    this.props.raidFill(res.response);
                }
            })
            .catch(err => this.props.raidSetError(err.message));
    }
    render() {
        const { loading, data, error } = this.props.raid;
        return (
            <section className="displayRaid">
                {loading && (
                    <div className="displayRaidLoaderContainer">
                        <CircularProgress
                            className="displayRaidLoader"
                            color="secondary"
                        />
                    </div>
                )}
                {error && <span className="red">{error}</span>}
                {data.map(boss => (
                    <RaidBossSummary
                        bossData={boss}
                        raidName={this.props.match.params.raidName}
                        key={boss.bossName}
                    />
                ))}
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        raid: state.raid
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { raidFill, raidSetError, raidSetLoading },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayRaid);
