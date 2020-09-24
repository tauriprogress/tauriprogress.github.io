import React, { useState } from "react";
import { useSelector } from "react-redux";

import { withStyles } from "@material-ui/core";

import Drawer from "@material-ui/core/Drawer";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

function styles(theme) {
    return {
        drawerPaper: {
            padding: theme.spacing(2),
            width: "260px"
        }
    };
}

function SearchBar({ classes }) {
    const { loading, error } = useSelector(state => ({
        loading: state.guildList.loading,
        error: state.guildList.error
    }));

    const [drawerOpen, setDrawer] = useState(false);

    return (
        <React.Fragment>
            <span onClick={() => setDrawer(true)}>Search</span>
            <Drawer
                open={drawerOpen}
                onClose={() => setDrawer(false)}
                anchor="left"
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                {loading && <Loading />}
                {error && <ErrorMessage message={error} />}
                <SearchGuild closeDrawer={() => setDrawer(false)} />
                <SearchPlayer closeDrawer={() => setDrawer(false)} />
            </Drawer>
        </React.Fragment>
    );
}

export default withStyles(styles)(SearchBar);
