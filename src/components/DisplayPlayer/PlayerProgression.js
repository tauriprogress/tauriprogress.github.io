import { raidName } from "tauriprogress-constants/currentContent";
import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Typography } from "@material-ui/core";

import SkadaChartRaid from "../SkadaChartRaid";

import { displayHealing } from "./helpers";

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
        const { data } = this.props;

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
                <div className="displayPlayerProgressionChartContainer">
                    <div>
                        <Typography variant="h5">Damage</Typography>
                        <SkadaChartRaid
                            raidName={raidName}
                            data={data[raidName][this.state.value]}
                            variant="dps"
                        />
                    </div>
                    {displayHealing(data[raidName][this.state.value]) && (
                        <div>
                            <Typography variant="h5">Heal</Typography>
                            <SkadaChartRaid
                                raidName={raidName}
                                data={data[raidName][this.state.value]}
                                variant="hps"
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default PlayerProgression;
