import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import RaidBosses from "./RaidBosses";
import RaidBossList from "../RaidBossList";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { raidFetch } from "../../redux/actions";

class DisplayRaid extends React.PureComponent {
    componentDidMount() {
        const raidName = this.props.match.params.raidName;
        this.props.raidFetch(raidName);
    }
    render() {
        const { loading, data, error } = this.props.raid;
        return (
            <section className="displayRaid">
                <div className="displayRaidContentContainer">
                    <aside>
                        <RaidBossList raid={this.props.raidData} />
                    </aside>
                    <div className="displayRaidContent">
                        {loading && <Loading />}
                        {error && <ErrorMessage message={error} />}
                        {!loading && !error && data && (
                            <RaidBosses
                                data={data}
                                raidName={this.props.match.params.raidName}
                                raidBosses={this.props.raidData.encounters}
                            />
                        )}
                    </div>
                </div>
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
    return bindActionCreators({ raidFetch }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayRaid);
