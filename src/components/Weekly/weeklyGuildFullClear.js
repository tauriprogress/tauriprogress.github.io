import React from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    environmentDifficultiesSelector,
    environmentDifficultyNamesSelector,
    weeklyGuildFullClearEntireSelector,
} from "../../redux/selectors";
import GuildLeaderboardList from "../GuildLeaderboardList";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { weeklyGuildFullClearFetch } from "../../redux/actions";
import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";

const GuildsContainer = styled(Grid)(({ theme }) => ({
    minWidth: "300px",
    margin: "0 auto",
    padding: theme.spacing(2),
}));

const SecondaryText = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    paddingTop: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

function WeeklyGuildFullClear() {
    const { loading, guilds, error } = useSelector(
        weeklyGuildFullClearEntireSelector
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(weeklyGuildFullClearFetch());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Typography variant="h4" align="center">
                Best clears this week
            </Typography>
            {loading && <Loading />}
            {guilds && <DisplayGuilds guilds={guilds} />}
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() => dispatch(weeklyGuildFullClearFetch())}
                />
            )}
        </React.Fragment>
    );
}

function DisplayGuilds({ guilds }) {
    const { difficulties, difficultyNames } = useSelector(
        (state) => ({
            difficulties: environmentDifficultiesSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
        }),
        shallowEqual
    );
    const xs = Math.floor(12 / difficulties.length);
    return (
        <Grid container>
            {difficulties.map((diff) => {
                return (
                    <GuildList
                        key={diff}
                        difficultyName={difficultyNames[diff]}
                        guilds={guilds[diff]}
                        xs={xs}
                    />
                );
            })}
        </Grid>
    );
}

function GuildList({ guilds, difficultyName, xs }) {
    return (
        <GuildsContainer item xs={xs}>
            <Typography variant="h6" align="center">
                {difficultyName}
            </Typography>
            {guilds.length ? (
                <GuildLeaderboardList guilds={guilds} />
            ) : (
                <SecondaryText>No clear yet</SecondaryText>
            )}
        </GuildsContainer>
    );
}

export default React.memo(WeeklyGuildFullClear);
