import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import RaidBossList from "../RaidBossList";
import RaidBoss from "./RaidBoss";

import {
    raidBossSetError,
    raidBossInitRequest,
    raidBossFill
} from "../../redux/actions";

import { getBossData } from "./helpers";

class DisplayRaidBoss extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 5
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        const raidName = this.props.match.params.raidName;
        const bossName = this.props.match.params.bossName;

        if (
            raidName !== this.props.raidBoss.raidName ||
            bossName !== this.props.raidBoss.bossName
        ) {
            let diff = new URLSearchParams(this.props.location.search).get(
                "diff"
            );
            if (diff) {
                this.setState({ ...this.state, value: diff === "25" ? 6 : 5 });
            }

            getBossData(raidName, bossName, {
                raidBossInitRequest: this.props.raidBossInitRequest,
                raidBossFill: this.props.raidBossFill,
                raidBossSetError: this.props.raidBossSetError
            });
        }
    }

    componentDidMount() {
        const raidName = this.props.match.params.raidName;
        const bossName = this.props.match.params.bossName;

        let diff = new URLSearchParams(this.props.location.search).get("diff");
        if (diff) {
            this.setState({ ...this.state, value: diff === "25" ? 6 : 5 });
        }

        getBossData(raidName, bossName, {
            raidBossInitRequest: this.props.raidBossInitRequest,
            raidBossFill: this.props.raidBossFill,
            raidBossSetError: this.props.raidBossSetError
        });
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
                {loading && (
                    <div className="displayRaidBossLoaderContainer">
                        <CircularProgress color="secondary" />
                    </div>
                )}
                {error && <span className="red">{error}</span>}

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
    return bindActionCreators(
        { raidBossSetError, raidBossInitRequest, raidBossFill },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayRaidBoss);
