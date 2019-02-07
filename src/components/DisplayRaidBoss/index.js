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
        const {
            loading,
            data,
            error,
            bossName,
            raidData
        } = this.props.raidBoss;

        return (
            <section className="displayRaidBoss">
                <div className="displayRaidBossContentContainer">
                    <aside>
                        {raidData && <RaidBossList raid={raidData} />}
                    </aside>
                    <div className="displayRaidBossContent">
                        {loading && <Loading />}
                        {error && <ErrorMessage message={error} />}
                        {!loading && !error && data && (
                            <React.Fragment>
                                <div className="displayRaidBossTitle">
                                    <Typography variant="h4">
                                        {bossName}
                                    </Typography>
                                    <Typography variant="h6">
                                        {data[this.state.value].killCount} Kills
                                    </Typography>
                                </div>
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    indicatorColor="secondary"
                                >
                                    <Tab
                                        label="10 HC"
                                        value={5}
                                        className="tab"
                                    />
                                    <Tab
                                        label="25 HC"
                                        value={6}
                                        className="tab"
                                    />
                                </Tabs>

                                {getChild(this.state.value, data)}
                            </React.Fragment>
                        )}
                    </div>
                </div>
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
        raidBoss: state.raidInfo.raidBoss
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ raidBossFetch }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayRaidBoss);
