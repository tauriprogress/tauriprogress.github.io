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
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                        >
                            <Tab label="Dps" className="tab" />
                            <Tab label="Hps" className="tab" />
                            <Tab label="Fastest Kills" className="tab" />
                        </Tabs>
                        {getChild(this.state.value, data)}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

function getChild(value, data) {
    switch (value) {
        case 0:
            return (
                <CharacterLadder
                    data={data.dps}
                    type={"dps"}
                    disableFilter={{
                        faction: true,
                        realm: true
                    }}
                />
            );
        case 1:
            return (
                <CharacterLadder
                    data={data.hps}
                    type={"hps"}
                    disableFilter={{
                        faction: true,
                        realm: true
                    }}
                />
            );
        case 2:
            return <GuildFastestKills data={data.fastestKills} />;
        default:
            return 0;
    }
}

export default GuildBoss;
