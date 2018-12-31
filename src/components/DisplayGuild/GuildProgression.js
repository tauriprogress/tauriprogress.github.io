import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import GuildBoss from "./GuildBoss";
import GuildBossSummary from "./GuildBossSummary";

class GuildProgression extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bossName: Object.keys(this.props.bosses)[0]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ ...this.state, bossName: e.target.value });
    }

    render() {
        const { bosses } = this.props;
        let bossNames = [];
        for (let bossName in bosses) {
            bossNames.push(bossName);
        }

        let boss = bosses[this.state.bossName];

        return (
            <React.Fragment>
                <Select
                    value={this.state.bossName}
                    onChange={this.handleChange}
                    inputProps={{
                        name: "bossName"
                    }}
                    className="selectBoss"
                >
                    {bossNames.map(bossName => (
                        <MenuItem value={bossName} key={bossName}>
                            {bossName}
                        </MenuItem>
                    ))}
                </Select>
                <GuildBossSummary data={boss} />
                <GuildBoss data={boss} />
            </React.Fragment>
        );
    }
}

export default GuildProgression;
