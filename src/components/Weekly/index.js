import React from "react";
import Page from "../Page";
import { withRealmGroupName } from "../Router/withRealmGroupName";

function Weekly() {
    return (
        <Page>
            <div>weekly display</div>
        </Page>
    );
}

export default withRealmGroupName(
    React.memo(Weekly, (prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    })
);
