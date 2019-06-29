import { difficultyLabels } from "tauriprogress-constants";
import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import LogLink from "../LogLink";

import { convertFightTime } from "../DisplayRaid/helpers";

function styles(theme) {
    return {
        title: {
            backgroundColor: theme.palette.primary.main,
            "& *": {
                color: `${theme.palette.primary.contrastText} !important`
            }
        },
        container: {
            backgroundColor: theme.palette.backgroundAccent
        }
    };
}

function PlayerLatestKills({ classes, loading, error, data, realm }) {
    return (
        <div className="playerLatestKills">
            <Card className={`${classes.container} `}>
                <List>
                    <ListItem className={classes.title}>
                        <ListItemText className="playerLatestKillsTitle">
                            Latest Kills
                        </ListItemText>
                    </ListItem>

                    {loading && <Loading />}
                    {error && <ErrorMessage message={error} />}
                    {data &&
                        data.logs.map(log => (
                            <React.Fragment>
                                <ListItem key={log.log_id}>
                                    <ListItemText>
                                        <span className="playerLatestKillsKill">
                                            <span className="playerLatestKillsBossName">
                                                <span className="textBold">
                                                    {`${
                                                        log.encounter_data
                                                            .encounter_name
                                                    } ${
                                                        difficultyLabels[
                                                            log.difficulty
                                                        ]
                                                    }`}
                                                </span>
                                                <span className="playerLatestKillsDate">
                                                    {new Date(
                                                        log.killtime * 1000
                                                    ).toLocaleDateString()}
                                                </span>
                                            </span>

                                            <span className="playerLatestKillsKillTime">
                                                <span>
                                                    {convertFightTime(
                                                        log.fight_time
                                                    )}
                                                </span>
                                                <span className="playerLatestKillsLogContainer">
                                                    <LogLink
                                                        logId={log.log_id}
                                                        realm={realm}
                                                    />
                                                </span>
                                            </span>
                                        </span>
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                </List>
            </Card>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        ...state.player.latestKills,
        realm: state.player.realm
    };
}

export default connect(mapStateToProps)(withStyles(styles)(PlayerLatestKills));
