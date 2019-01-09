import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CharacterLadder from "../CharacterLadder";
import GuildFastestKills from "./GuildFastestKills";

class GuildBoss extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, value) {
        this.setState({ ...this.state, value: value });
    }

    render() {
        const { data } = this.props;
        return (
            <React.Fragment>
                {data && (
                    <React.Fragment>
                        {" "}
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                        >
                            <Tab label="Fastest Kills" className="tab" />
                            <Tab label="Dps" className="tab" />
                            <Tab label="Hps" className="tab" />
                        </Tabs>
                        {this.state.value === 0 && (
                            <GuildFastestKills data={data.fastestKills} />
                        )}
                        {this.state.value === 1 && (
                            <CharacterLadder data={data.dps} type={"dps"} />
                        )}
                        {this.state.value === 2 && (
                            <CharacterLadder data={data.hps} type={"hps"} />
                        )}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default GuildBoss;
