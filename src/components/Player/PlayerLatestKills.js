import { difficultyLabels } from "tauriprogress-constants";
import React from "react";
import { useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import SideCard from "../SideCard";

import DisplayDate from "../DisplayDate";

function styles(theme) {
    return {
        title: {
            backgroundColor: theme.palette.primary.main,
            "& *": {
                color: `${theme.palette.primary.contrastText} !important`
            },
            borderRadius: "4px"
        },
        bossName: {
            fontWeight: "bold"
        },
        container: {
            margin: "0 10px",
            width: "260px"
        }
    };
}

function PlayerLatestKills({ classes }) {
    const { loading, error, data } = useSelector(
        state => state.player.latestKills
    );
    const realm = useSelector(state => state.player.realm);

    return (
        <SideCard title={"Latest Kills"}>
            <List>
                {loading && <Loading />}
                {error && <ErrorMessage message={error} />}
                {data &&
                    data.logs.map(log => {
                        const date = new Date(log.killtime * 1000);
                        return (
                            <React.Fragment key={log.log_id}>
                                <Link
                                    component={RouterLink}
                                    color="inherit"
                                    to={`/log/${log.log_id}?realm=${realm}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <ListItem>
                                        <Grid container direction="column">
                                            <Grid item>
                                                <Typography
                                                    className={classes.bossName}
                                                >
                                                    {`${
                                                        log.encounter_data
                                                            .encounter_name
                                                    } ${
                                                        difficultyLabels[
                                                            log.difficulty
                                                        ]
                                                    }`}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid
                                                    container
                                                    wrap="nowrap"
                                                    justify="space-between"
                                                >
                                                    <Grid item>
                                                        <Typography>
                                                            <DisplayDate
                                                                date={date}
                                                            />
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography align="right">
                                                            {`${(
                                                                "0" +
                                                                date.getHours()
                                                            ).slice(-2)}:${(
                                                                "0" +
                                                                date.getMinutes()
                                                            ).slice(-2)}`}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </Link>

                                <Divider />
                            </React.Fragment>
                        );
                    })}
            </List>
        </SideCard>
    );
}

export default withStyles(styles)(PlayerLatestKills);
