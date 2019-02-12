import { difficultyLabels } from "tauriprogress-constants";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import GuildRaidList from "./GuildRaidBossList";
import GuildBoss from "./GuildBoss";
import GuildBossSummary from "./GuildBossSummary";

import { getBossesDefeated } from "./helpers";

import { guildSelectBoss } from "../../redux/actions";

class GuildProgression extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tab: 5
        };
        this.tabChange = this.tabChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.selectedBossName)
            this.props.guildSelectBoss(
                this.props.raid.encounters[0].encounter_name
            );
    }

    tabChange(e, value) {
        this.setState({ ...this.state, tab: value });
    }

    render() {
        const { progression, raid, selectedBossName } = this.props;
        const bosses = progression[raid.name];
        let bossesDefeated = getBossesDefeated(raid.encounters, progression);
        raid.encounters = raid.encounters.map(boss => ({
            ...boss,
            defeated: bossesDefeated[boss.encounter_name] ? true : false
        }));
        let boss = bosses[this.state.tab][selectedBossName];

        return (
            <div className="displayGuildProgression">
                <aside>
                    <GuildRaidList raid={raid} />
                </aside>
                <div className="displayGuildProgressionDataContainer">
                    <GuildBossSummary
                        bossName={`${selectedBossName} ${
                            difficultyLabels[this.state.tab]
                        }`}
                        data={boss}
                    />
                    <Tabs
                        value={this.state.tab}
                        onChange={this.tabChange}
                        indicatorColor="secondary"
                        className="displayGuildDifficultyTab"
                    >
                        <Tab label="10 HC" className="tab" value={5} />
                        <Tab label="25 HC" className="tab" value={6} />
                    </Tabs>
                    <GuildBoss data={boss} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        raid: state.raidInfo.raids[0],
        selectedBossName: state.guild.selectedBossName
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            guildSelectBoss
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GuildProgression);
