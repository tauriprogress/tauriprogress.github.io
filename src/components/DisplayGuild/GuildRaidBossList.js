import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";

import { guildSelectBoss } from "../../redux/actions";

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
        },
        container: {
            backgroundColor: theme.palette.backgroundAccent
        },
        bossDefeated: {
            borderLeft: `8px solid ${theme.palette.progStateColors.defeated}`
        },
        bossAlive: {
            borderLeft: `8px solid ${theme.palette.progStateColors.alive}`
        }
    };
}

class GuildRaidBossList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            open: this.state.open ? false : true
        });
    }
    render() {
        const { raid, classes, selectedBossName, guildSelectBoss } = this.props;
        return (
            <Card className={`displayGuildRaidBossList ${classes.container}`}>
                <ListItem
                    button
                    onClick={this.handleClick}
                    className={`displayGuildRaidBossListTitle ${
                        classes.listItem
                    } ${classes.listTitle}`}
                    style={{
                        background: "url(" + raid.picture + ")"
                    }}
                >
                    <ListItemText inset primary={raid.name} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {raid.encounters.map((encounter, index) => (
                            <ListItem
                                component="li"
                                button
                                className={`${classes.listItem} ${
                                    encounter.defeated
                                        ? classes.bossDefeated
                                        : classes.bossAlive
                                }`}
                                key={encounter.encounter_name}
                                selected={
                                    selectedBossName ===
                                    encounter.encounter_name
                                }
                                onClick={() =>
                                    guildSelectBoss(encounter.encounter_name)
                                }
                            >
                                <ListItemText
                                    primary={encounter.encounter_name}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedBossName: state.guild.selectedBossName
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            guildSelectBoss
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(GuildRaidBossList));
