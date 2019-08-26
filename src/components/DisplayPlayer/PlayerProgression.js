import { raidName } from "tauriprogress-constants/currentContent";

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import SkadaChartRaid from "../SkadaChartRaid";

import { displayHealing } from "./helpers";

import {
    playerProgressionFetch,
    playerProgressionSelectRaid
} from "../../redux/actions";

function styles(theme) {
    return {
        listItem: {
            "&:hover *": {
                color: `${theme.palette.secondary.main} !important`
            }
        },
        listTitle: {
            backgroundColor: `${theme.palette.primary.main} !important`,
            "& *": {
                color: theme.palette.primary.contrastText
            }
        }
    };
}
class PlayerProgression extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: 5,
            raidName
        };
        this.changeDifficulty = this.changeDifficulty.bind(this);
        this.changeRaid = this.changeRaid.bind(this);
    }

    changeDifficulty(e, difficulty) {
        this.setState({ ...this.state, difficulty });
    }

    changeRaid(raidName) {
        this.props.playerProgressionSelectRaid(raidName);
        if (!this.props.data[raidName]) {
            this.props.playerProgressionFetch({
                playerName: this.props.playerName,
                realm: this.props.realm,
                raidName,
                characterClass: this.props.characterClass
            });
        }

        this.setState({ ...this.state, raidName });
    }

    render() {
        const {
            data,
            loading,
            error,
            characterClass,
            raids,
            selectedRaid,
            classes
        } = this.props;
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
                <List className="displayPlayerProgressionRaidNames">
                    {raids.map(raid => (
                        <ListItem
                            key={raid.name}
                            className={`${classes.listItem} ${classes.listTitle}`}
                            button
                            onClick={() => this.changeRaid(raid.name)}
                            style={{
                                background: "url(" + raid.picture + ")"
                            }}
                            classes={{
                                selected: classes.listItemSelected
                            }}
                            selected={selectedRaid === raid.name}
                            component="li"
                        >
                            <ListItemText inset primary={raid.name} />
                        </ListItem>
                    ))}
                </List>

                <div className="displayPlayerProgressionChartContainer">
                    {loading && <Loading />}
                    {!loading && error && <ErrorMessage message={error} />}
                    {data && data[selectedRaid] && (
                        <React.Fragment>
                            <SkadaChartRaid
                                raidName={selectedRaid}
                                data={data[selectedRaid][difficulty]}
                                characterClass={characterClass}
                                variant="dps"
                            />
                            {displayHealing(data[selectedRaid][difficulty]) && (
                                <SkadaChartRaid
                                    raidName={selectedRaid}
                                    data={data[selectedRaid][difficulty]}
                                    characterClass={characterClass}
                                    variant="hps"
                                />
                            )}
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let raids = [];

    for (let raidName in state.raidInfo.raids) {
        raids.push(state.raidInfo.raids[raidName]);
    }

    return {
        ...state.player.progression,
        playerName: state.player.data.data && state.player.data.data.name,
        realm: state.player.data.data && state.player.data.data.realm,
        characterClass: state.player.data.data && state.player.data.data.class,
        raids
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            playerProgressionFetch,
            playerProgressionSelectRaid
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(PlayerProgression));
