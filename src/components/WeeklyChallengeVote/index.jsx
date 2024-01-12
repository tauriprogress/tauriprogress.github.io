import React from "react";
import Page from "../Page";
import { withRealmGroupName } from "../Router/withRealmGroupName";
import { Button } from "@mui/material";
import { PATREON_CLIENT } from "../../helpers";
import { getPatreonRedirect } from "./helpers";
import { userEntireSelector } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { userLoginLogout } from "../../redux/actions";

const patreonUrl = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${PATREON_CLIENT}`;

function WeeklyChallengeVote() {
    const { user, isMember } = useSelector(userEntireSelector);
    const dispatch = useDispatch();

    return (
        <Page>
            {user ? (
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => dispatch(userLoginLogout())}
                >
                    Log out
                </Button>
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

export default withRealmGroupName(
    React.memo(WeeklyChallengeVote, (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    })
);
