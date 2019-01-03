import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PlayerBosses from "./PlayerBosses";

class PlayerProgression extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 5
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, value) {
        this.setState({ ...this.state, value: value });
    }
    render() {
        return (
            <div className="displayPlayerProgression">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="secondary"
                    className="displayPlayerTabs"
                >
                    <Tab label="10 HC" className="tab" value={5} />
                    <Tab label="25 HC" className="tab" value={6} />
                </Tabs>
                <PlayerBosses data={this.props.data[this.state.value]} />
            </div>
        );
    }
}

export default PlayerProgression;
