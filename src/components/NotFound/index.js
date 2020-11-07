import React from "react";
import Typography from "@material-ui/core/Typography";

import Page from "../Page";

function NotFound() {
    return (
        <Page title={`Not Found | Tauri Progress`}>
            <section className="notFound">
                <Typography variant="h1">404</Typography>
                <Typography variant="h6">You seem te be lost. :/</Typography>
            </section>
        </Page>
    );
}

export default NotFound;
