import React from "react";
import Page from "../Page";
import { withRealmGroupName } from "../Router/withRealmGroupName";

function WeeklyChallengeVote() {
    return (
        <Page>
            <section>vote</section>
        </Page>
    );
}

export default withRealmGroupName(
    React.memo(WeeklyChallengeVote, (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    })
);
