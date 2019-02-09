import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";

import { raidBossFetch } from "../../redux/actions";

function styles(theme) {
    return {
        listItem: {
            "&:hover *": {
                color: `${theme.palette.secondary.main} !important`
            }
        },
        listItemSelected: {
            "& *": {
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
        }
    };
}

class RaidBossList extends React.PureComponent {
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
        const { raid, classes, selected } = this.props;
        return (
            <Card className={`${classes.container} raidBossList`}>
                <ListItem
                    className={`raidBossListTitle ${classes.listItem} ${
                        classes.listTitle
                    }`}
                    button
                    onClick={this.handleClick}
                    style={{
                        background: "url(" + raid.picture + ")"
                    }}
                >
                    <ListItemText inset primary={raid.name} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        <ListItem
                            className={classes.listItem}
                            component="li"
                            button
                            classes={{
                                selected: classes.listItemSelected
                            }}
                            selected={selected === 0}
                        >
                            <RouterLink to={`/raid/${raid.name}`}>
                                <ListItemText primary="Summary" />
                            </RouterLink>
                        </ListItem>
                        {raid.encounters.map((encounter, index) => {
                            let name = encounter.encounter_name;
                            let linkTo = `/raid/${raid.name}/${
                                encounter.encounter_name
                            }`;

                            return (
                                <ListItem
                                    className={classes.listItem}
                                    component="li"
                                    button
                                    key={name}
                                    classes={{
                                        selected: classes.listItemSelected
                                    }}
                                    selected={selected === index + 1}
                                >
                                    <RouterLink
                                        to={linkTo}
                                        onClick={() =>
                                            this.props.raidBossFetch({
                                                raidName: raid.name,
                                                bossName:
                                                    encounter.encounter_name
                                            })
                                        }
                                    >
                                        <ListItemText primary={name} />
                                    </RouterLink>
                                </ListItem>
                            );
                        })}
                    </List>
                </Collapse>
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ raidBossFetch }, dispatch);
}

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(RaidBossList));
