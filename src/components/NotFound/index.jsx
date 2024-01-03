import React from "react";
import Typography from "@mui/material/Typography";

import Page from "../Page";

function NotFound() {
    return (
        <Page title={`Not Found | Tauri Progress`}>
            <section className="notFound">
                <Typography variant="h1">404</Typography>
                <Typography variant="h6">Not found</Typography>
            </section>
        </Page>
    );
}

export default NotFound;
