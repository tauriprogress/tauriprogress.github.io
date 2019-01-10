import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Warning from "@material-ui/icons/Warning";

import FastestKills from "./FastestKills";
import LatestKills from "./LatestKills";
import CharacterLadder from "../CharacterLadder";

import valuesCorrectSince from "../../constants/valuesCorrectSince";

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
                    <Tab label="Fastest" className="tab" />
                    <Tab label="Latest" className="tab" />
                    <Tab label="Dps" className="tab" />
                    <Tab label="Hps" className="tab" />
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
            return <LatestKills data={data.latestKills} />;
        case 2:
            return (
                <React.Fragment>
                    {data.bossName === "Durumu the Forgotten" && (
                        <Chip
                            label={`Data collected since ${new Date(
                                valuesCorrectSince * 1000
                            ).toLocaleDateString()} due to a bug.`}
                            avatar={
                                <Avatar>
                                    <Warning color="secondary" />
                                </Avatar>
                            }
                            className="warning"
                            color="primary"
                        />
                    )}
                    <CharacterLadder data={data.dps} type={"dps"} />
                </React.Fragment>
            );
        case 3:
            return <CharacterLadder data={data.hps} type={"hps"} />;
        default:
            return 0;
    }
}

export default RaidBoss;
