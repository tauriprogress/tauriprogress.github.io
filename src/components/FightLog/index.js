import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LogTitle from "./LogTitle";
import LogMembers from "./LogMembers";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { fightLogFetch } from "../../redux/actions";

class FightLog extends React.PureComponent {
    componentDidMount() {
        const logId = this.props.match.params.logId;
        const realm = new URLSearchParams(this.props.location.search).get(
            "realm"
        );

        this.props.fightLogFetch({ logId, realm });
    }

    render() {
        const { loading, error, data } = this.props.fightLog;

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
}

function mapStateToProps(state) {
    return {
        fightLog: state.fightLog
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fightLogFetch }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FightLog);
