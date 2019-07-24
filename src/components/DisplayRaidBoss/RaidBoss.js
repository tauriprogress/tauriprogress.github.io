import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import FastestKills from "./FastestKills";
import LatestKills from "./LatestKills";
import RaidBossStats from "./RaidBossStats";
import CharacterLadder from "../CharacterLadder";

import { raidBossSelectTab } from "../../redux/actions";

function RaidBoss({ data, selectedTab, raidBossSelectTab }) {
    return (
        <React.Fragment>
            <Tabs
                value={selectedTab}
                onChange={(e, value) => raidBossSelectTab(value)}
                indicatorColor="secondary"
                variant="scrollable"
                scrollButtons="on"
            >
                <Tab label="Dps" className="tab" />
                <Tab label="Hps" className="tab" />
                <Tab label="Fastest" className="tab" />
                <Tab label="Latest" className="tab" />
                <Tab label="Stats" className="tab" />
            </Tabs>
            {getChild(selectedTab, data)}
        </React.Fragment>
    );
}

function getChild(value, data) {
    switch (value) {
        case 0:
        case 1:
            return (
                <CharacterLadder
                    data={value === 0 ? data.dps : data.hps}
                    type={value === 0 ? "dps" : "hps"}
                />
            );
        case 2:
            return <FastestKills data={data.fastestKills} />;
        case 3:
            return <LatestKills data={data.latestKills} />;
        case 4:
            return <RaidBossStats data={data.stats} />;
        default:
            return 0;
    }
}

function mapStateToProps(state) {
    return {
        selectedTab: state.raidBoss.selectedTab
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ raidBossSelectTab }, dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RaidBoss);
