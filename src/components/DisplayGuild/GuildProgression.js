import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import GuildBoss from "./GuildBoss";
import GuildBossSummary from "./GuildBossSummary";

import { raidName } from "../../constants/currentContent";

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

    bossNameChange(e) {
        this.setState({ ...this.state, bossName: e.target.value });
    }

    tabChange(e, value) {
        this.setState({ ...this.state, tab: value });
    }

    render() {
        const { progression } = this.props;
        const bosses = progression[raidName];
        let bossNames = [];
        for (let bossName in bosses[this.state.tab]) {
            bossNames.push(bossName);
        }
        if (bossNames.length === 0)
            bossNames.push(
                "The guild has not defeated any boss in this difficulty."
            );
        let boss = bosses[this.state.tab][this.state.bossName];

        return (
            <React.Fragment>
                <Tabs
                    value={this.state.tab}
                    onChange={this.tabChange}
                    indicatorColor="secondary"
                    className="displayGuildDifficultyTab"
                >
                    <Tab label="10 HC" className="tab" value={5} />
                    <Tab label="25 HC" className="tab" value={6} />
                </Tabs>
                <Select
                    value={this.state.bossName}
                    onChange={this.bossNameChange}
                    inputProps={{
                        name: "bossName"
                    }}
                    className="displayGuildSelectBoss"
                >
                    {bossNames.map(bossName => (
                        <MenuItem value={bossName} key={bossName}>
                            {bossName}
                        </MenuItem>
                    ))}
                </Select>
                <React.Fragment>
                    <GuildBossSummary data={boss} />
                    <GuildBoss data={boss} />
                </React.Fragment>
            </React.Fragment>
        );
    }
}
/*

*/
export default GuildProgression;
