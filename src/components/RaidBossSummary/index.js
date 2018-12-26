import React from "react";

import { Link } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import BossInfo from "./BossInfo";

class RaidBossSummary extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 5
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
        const { bossData, raidName } = this.props;
        return (
            <Card className="raidBossSummary">
                <AppBar position="static" className="raidBossSummaryAppBar">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        className="raidBossSummaryTabs"
                        indicatorColor="secondary"
                    >
                        <Tab
                            label="10 HC"
                            value={5}
                            className="raidBossSummaryTab"
                        />
                        <Tab
                            label="25 HC"
                            value={6}
                            className="raidBossSummaryTab"
                        />
                    </Tabs>
                </AppBar>
                <Typography variant="h6">{bossData.bossName}</Typography>
                <SwipeableViews
                    axis={"x"}
                    index={this.state.value - 5}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <BossInfo boss={bossData[5]} />
                    <BossInfo boss={bossData[6]} />
                </SwipeableViews>
                <Link to={`/raid/${raidName}/${bossData.bossName}`}>
                    <Button
                        className="raidBossSummaryButton"
                        variant="outlined"
                        color="primary"
                    >
                        MORE INFO
                    </Button>
                </Link>
            </Card>
        );
    }
}

export default RaidBossSummary;
