import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Typography from "@material-ui/core/Typography";

import RaidBoss from "./RaidBoss";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { raidBossFetch } from "../../redux/actions";

class DisplayRaidBoss extends React.PureComponent {
    componentDidMount() {
        const raidName = this.props.match.params.raidName;
        const bossName = this.props.match.params.bossName;

        if (
            this.props.raidBoss.raidName !== raidName ||
            this.props.raidBoss.bossName !== bossName
        ) {
            this.props.raidBossFetch({
                raidName,
                bossName
            });
        }
    }

    render() {
        const { diff } = this.props;
        const { loading, data, error, bossName } = this.props.raidBoss;

        return (
            <React.Fragment>
                {loading && <Loading />}
                {error && <ErrorMessage message={error} />}
                {!loading && !error && data && (
                    <React.Fragment>
                        <div className="displayRaidBossTitle">
                            <Typography variant="h4">{bossName}</Typography>
                            <Typography variant="h6">
                                {data[diff].killCount} Kills
                            </Typography>
                        </div>
                        <RaidBoss data={data[diff]} />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        raidBoss: state.raidBoss
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ raidBossFetch }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayRaidBoss);
