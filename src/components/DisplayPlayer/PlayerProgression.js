import { raidName } from "tauriprogress-constants/currentContent";
import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import SkadaChartRaid from "../SkadaChartRaid";

import { displayHealing } from "./helpers";

class PlayerProgression extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: 5
        };
        this.changeDifficulty = this.changeDifficulty.bind(this);
    }

    changeDifficulty(e, difficulty) {
        this.setState({ ...this.state, difficulty: difficulty });
    }

    render() {
        const { data, characterClass } = this.props;
        const { difficulty } = this.state;

        return (
            <div className="displayPlayerProgression">
                <Tabs
                    value={difficulty}
                    onChange={this.changeDifficulty}
                    indicatorColor="secondary"
                    className="displayPlayerTabs"
                >
                    <Tab label="10 HC" className="tab" value={5} />
                    <Tab label="25 HC" className="tab" value={6} />
                </Tabs>
                <div className="displayPlayerProgressionChartContainer">
                    <SkadaChartRaid
                        raidName={raidName}
                        data={data[raidName][difficulty]}
                        characterClass={characterClass}
                        variant="dps"
                    />
                    {displayHealing(data[raidName][difficulty]) && (
                        <SkadaChartRaid
                            raidName={raidName}
                            data={data[raidName][difficulty]}
                            characterClass={characterClass}
                            variant="hps"
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default PlayerProgression;
