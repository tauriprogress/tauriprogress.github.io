import React from "react";
import Page from "../Page";
import { withRealmGroupName } from "../Router/withRealmGroupName";
import { Button } from "@mui/material";
import { PATREON_CLIENT } from "../../helpers";
import { getPatreonRedirect } from "./helpers";

const patreonUrl = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${PATREON_CLIENT}`;

function WeeklyChallengeVote() {
    return (
        <Page>
            <Button
                color="secondary"
                variant="contained"
                href={`${patreonUrl}&redirect_uri=${getPatreonRedirect()}`}
            >
                LogIn with Patreon
            </Button>
        </Page>
    );
}

export default withRealmGroupName(
    React.memo(WeeklyChallengeVote, (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    })
);
