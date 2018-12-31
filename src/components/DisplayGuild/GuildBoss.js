import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CharacterLadder from "../CharacterLadder";

class GuildBoss extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
    }

    handleChange(e, value) {
        this.setState({ ...this.state, value: value });
    }

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { data } = this.props;
        return (
            <React.Fragment>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="secondary"
                >
                    <Tab label="Dps" className="tab" />
                    <Tab label="Hps" className="tab" />
                </Tabs>
                {this.state.value === 0 && (
                    <CharacterLadder data={data.dps} type={"dps"} />
                )}
                {this.state.value === 1 && (
                    <CharacterLadder data={data.hps} type={"hps"} />
                )}
            </React.Fragment>
        );
    }
}

export default GuildBoss;
