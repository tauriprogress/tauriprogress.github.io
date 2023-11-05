import React from "react";
import Page from "../Page";
import { withRealmGroupName } from "../Router/withRealmGroupName";
import WeeklyGuildFullClear from "./weeklyGuildFullClear";
import WeeklyChallenge from "./weeklyChallenge";

function Weekly() {
    return (
        <Page>
            <section>
                <WeeklyChallenge />
                <WeeklyGuildFullClear />
            </section>
        </Page>
    );
}

export default withRealmGroupName(
    React.memo(Weekly, (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    })
);
