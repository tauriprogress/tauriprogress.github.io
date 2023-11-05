import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { weeklyChallengeEntireSelector } from "../../redux/selectors";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { weeklyChallengeFetch } from "../../redux/actions";
import { useEffect } from "react";
import { Typography } from "@mui/material";

function WeeklyChallenge() {
    const { loading, challenge, error } = useSelector(
        weeklyChallengeEntireSelector
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(weeklyChallengeFetch());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Typography variant="h4" align="center">
                WEEKLY CHALLENGE
            </Typography>
            {loading && <Loading />}
            {challenge && JSON.stringify(challenge)}
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() => dispatch(weeklyChallengeFetch())}
                />
            )}
        </React.Fragment>
    );
}

export default React.memo(WeeklyChallenge);
