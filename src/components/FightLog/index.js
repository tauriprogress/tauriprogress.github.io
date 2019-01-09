import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import LogTitle from "./LogTitle";
import LogMembers from "./LogMembers";

import {
    fightLogSetError,
    fightLogSetLoading,
    fightLogFill
} from "../../redux/actions";

import { serverUrl } from "../../constants/urls";

class FightLog extends React.PureComponent {
    componentDidMount() {
        const logId = this.props.match.params.logId;
        const realm = new URLSearchParams(this.props.location.search).get(
            "realm"
        );

        this.props.fightLogSetLoading(true);
        fetch(`${serverUrl}/getlog`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                logId: logId,
                realm: realm
            })
        })
            .then(res => res.json())
            .then(res => {
                if (!res.success) {
                    throw new Error(res.errorstring);
                } else {
                    this.props.fightLogFill(res.response);
                }
            })
            .catch(err => this.props.fightLogSetError(err.message));
    }

    render() {
        const { loading, error, data } = this.props.fightLog;

        return (
            <section className="fightLog">
                {loading && (
                    <div className="fightLogLoaderContainer">
                        <CircularProgress
                            className="displayPlayerLoader"
                            color="secondary"
                        />
                    </div>
                )}

                {error && <span className="red">{error}</span>}

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
    return bindActionCreators(
        { fightLogSetError, fightLogSetLoading, fightLogFill },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FightLog);
