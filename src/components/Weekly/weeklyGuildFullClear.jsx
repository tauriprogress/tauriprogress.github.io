import React from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    environmentDifficultiesSelector,
    environmentDifficultyNamesSelector,
    weeklyGuildFullClearEntireSelector,
} from "../../redux/selectors";
import GuildLeaderboardList from "../GuildLeaderboardList";
import ErrorMessage from "../ErrorMessage";
import { weeklyGuildFullClearFetch } from "../../redux/actions";
import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import DataContainer from "./DataContainer";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const SecondaryText = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    paddingTop: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

function WeeklyGuildFullClear() {
    const { guilds, error } = useSelector(weeklyGuildFullClearEntireSelector);
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(weeklyGuildFullClearFetch());
    }, [location, dispatch]);

    return (
        <React.Fragment>
            {guilds && !!Object.keys(guilds).length && (
                <>
                    <Typography variant="h4" align="center" marginTop={"60px"}>
                        Best clears this week
                    </Typography>
                    <DisplayGuilds data={guilds} />
                </>
            )}
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() => dispatch(weeklyGuildFullClearFetch())}
                />
            )}
        </React.Fragment>
    );
}

function DisplayGuilds({ data }) {
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
                        data={data[diff]}
                        xs={xs}
                    />
                );
            })}
        </Grid>
    );
}

function GuildList({ data, difficultyName, xs }) {
    return (
        <DataContainer difficultyName={difficultyName} xs={xs}>
            {data ? (
                <GuildLeaderboardList guilds={data} />
            ) : (
                <SecondaryText>No data yet</SecondaryText>
            )}
        </DataContainer>
    );
}

export default React.memo(WeeklyGuildFullClear);
