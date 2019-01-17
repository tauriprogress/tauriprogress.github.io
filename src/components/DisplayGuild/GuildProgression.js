import React from "react";
import { connect } from "react-redux";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import MetaDataList from "../MetaDataList";
import GuildBoss from "./GuildBoss";
import GuildBossSummary from "./GuildBossSummary";

import { getBossesDefeated } from "./helpers";

import { raidName } from "../../constants/currentContent";
import difficultyLabels from "../../constants/difficultyLabels";

class GuildProgression extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bossName: Object.keys(this.props.progression[raidName][5])[0],
            tab: 5
        };
        this.bossNameChange = this.bossNameChange.bind(this);
        this.tabChange = this.tabChange.bind(this);
    }

    bossNameChange(value) {
        this.setState({ ...this.state, bossName: value });
    }

    tabChange(e, value) {
        this.setState({ ...this.state, tab: value });
    }

    render() {
        const { progression, raidBosses } = this.props;
        const bosses = progression[raidName];
        let bossesDefeated = getBossesDefeated(raidBosses, progression);
        let metaData = [];
        for (let boss of raidBosses) {
            metaData.push({
                label: (
                    <span
                        className={
                            boss.encounter_name === this.state.bossName
                                ? "textBold bossName active"
                                : "textBold bossName"
                        }
                        onClick={() => this.bossNameChange(boss.encounter_name)}
                    >
                        {boss.encounter_name}
                    </span>
                ),
                value: bossesDefeated[boss.encounter_name] ? (
                    <span className="green bossValue">Defeated</span>
                ) : (
                    <span className="red bossValue">Alive</span>
                )
            });
        }
        let boss = bosses[this.state.tab][this.state.bossName];

        return (
            <div className="displayGuildProgression">
                <aside>
                    <MetaDataList
                        className="displayGuildProgressionBosses"
                        title="Progression"
                        values={metaData}
                        notBold={true}
                    />
                </aside>
                <div className="overflowScroll">
                    <GuildBossSummary
                        bossName={`${this.state.bossName} ${
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
        raidBosses: state.raids[0].encounters
    };
}

export default connect(mapStateToProps)(GuildProgression);
