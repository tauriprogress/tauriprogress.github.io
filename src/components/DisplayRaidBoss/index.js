import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import RaidBossList from "../RaidBossList";
import RaidBoss from "./RaidBoss";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { raidBossFetch } from "../../redux/actions";

class DisplayRaidBoss extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 5
        };

        this.handleChange = this.handleChange.bind(this);
    }

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

    handleChange(e, value) {
        this.setState({ ...this.state, value: value });
    }

    render() {
        const { loading, data, error } = this.props.raidBoss;
        const raidName = this.props.match.params.raidname;
        const bossName = this.props.match.params.bossName;

        let raid = null;
        if (!loading && error !== "Invalid boss name") {
            const { raids } = this.props;
            const filteredRaid = raids.filter(
                raid => raid.raidName === raidName
            );
            if (filteredRaid.length) {
                raid = filteredRaid[0];
            }
        }

        return (
            <section className="displayRaidBoss">
                {loading && <Loading />}
                {error && <ErrorMessage message={error} />}

                {!loading && !error && data && (
                    <div className="displayRaidBossTitle">
                        <Typography variant="h4">{bossName}</Typography>
                        <Typography variant="h6">
                            {data[this.state.value].killCount} Kills
                        </Typography>
                    </div>
                )}

                {!loading && !error && data && (
                    <div className="displayRaidBossContentContainer">
                        {raid && (
                            <aside>
                                <RaidBossList raid={raid} />
                            </aside>
                        )}
                        <div className="displayRaidBossContent">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="secondary"
                            >
                                <Tab label="10 HC" value={5} className="tab" />
                                <Tab label="25 HC" value={6} className="tab" />
                            </Tabs>

                            {getChild(this.state.value, data)}
                        </div>
                    </div>
                )}
            </section>
        );
    }
}

function getChild(value, data) {
    switch (value) {
        case 5:
            return <RaidBoss data={data[value]} />;
        case 6:
            return <RaidBoss data={data[value]} />;
        default:
            return 0;
    }
}

function mapStateToProps(state) {
    return {
        raidBoss: state.raidBoss,
        raids: state.raids
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ raidBossFetch }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayRaidBoss);
