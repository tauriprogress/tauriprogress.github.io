import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import FastestKills from "./FastestKills";
import CharacterLadder from "./CharacterLadder";

class RaidBoss extends React.PureComponent {
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
                    <Tab label="Fastest kills" className="tab" />
                    <Tab label="Best Dps" className="tab" />
                    <Tab label="Best Hps" className="tab" />
                </Tabs>

                {getChild(this.state.value, data)}
            </React.Fragment>
        );
    }
}

function getChild(value, data) {
    switch (value) {
        case 0:
            return <FastestKills data={data.fastestKills} />;
        case 1:
            return <CharacterLadder data={data.dps} type={"dps"} />;
        case 2:
            return <CharacterLadder data={data.hps} type={"hps"} />;
        default:
            return 0;
    }
}

export default RaidBoss;
