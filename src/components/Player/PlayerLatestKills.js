import { difficultyLabels } from "tauriprogress-constants";
import React from "react";
import { useSelector } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import LogLink from "../LogLink";

import { convertFightTime } from "../../helpers";

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

function PlayerLatestKills({ classes }) {
    const { loading, error, data } = useSelector(
        state => state.player.latestKills
    );
    const realm = useSelector(state => state.player.realm);

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
                            <React.Fragment key={log.log_id}>
                                <ListItem>
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

export default withStyles(styles)(PlayerLatestKills);
