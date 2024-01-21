import React, { useEffect } from "react";
import Page from "../Page";
import { withRealmGroupName } from "../Router/withRealmGroupName";
import { Button } from "@mui/material";
import { PATREON_CLIENT } from "../../helpers";
import { getPatreonRedirect } from "./helpers";
import { userEntireSelector, voteEntireSelector } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { userLoginLogout, weeklyChallengeVoteFetch } from "../../redux/actions";
import Loading from "../Loading";

const patreonUrl = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${PATREON_CLIENT}`;

function WeeklyChallengeVote() {
    const { user, isMember } = useSelector(userEntireSelector);
    const { votes, error, loading } = useSelector(voteEntireSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(weeklyChallengeVoteFetch());
    }, [dispatch]);

    return (
        <Page>
            {loading && <Loading />}
            {!loading && !!votes.length && <DisplayVotes votes={votes} />}
            {user ? (
                <>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => dispatch(userLoginLogout())}
                    >
                        Log out
                    </Button>
                </>
            ) : (
                <Button
                    color="secondary"
                    variant="contained"
                    href={`${patreonUrl}&redirect_uri=${getPatreonRedirect()}`}
                >
                    LogIn with Patreon
                </Button>
            )}
        </Page>
    );
}

function DisplayVotes({ votes }) {
    return JSON.stringify(votes);
}

export default withRealmGroupName(
    React.memo(WeeklyChallengeVote, (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    })
);
