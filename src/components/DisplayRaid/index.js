import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import RaidBosses from "./RaidBosses";
import RaidBossList from "../RaidBossList";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

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
                {loading && <Loading />}
                {error && <ErrorMessage message={error} />}
                {!loading && !error && data && (
                    <div className="displayRaidContentContainer">
                        <aside>
                            <RaidBossList raid={this.props.raidData} />
                        </aside>
                        <RaidBosses
                            data={data}
                            raidName={this.props.match.params.raidName}
                            raidBosses={this.props.raidData.encounters}
                        />
                    </div>
                )}
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        raid: state.raid,
        raidData: state.raids[0]
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
