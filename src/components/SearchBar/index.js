import React, { useState } from "react";
import { useSelector } from "react-redux";

import Drawer from "@material-ui/core/Drawer";

import SearchGuild from "./SearchGuild";
import SearchPlayer from "./SearchPlayer";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

function SearchBar() {
    const { loading, error } = useSelector(state => ({
        loading: state.guilds.loading,
        error: state.guilds.error
    }));

    const [drawerOpen, setDrawer] = useState(false);

    return (
        <React.Fragment>
            <span
                className="navOption"
                id="navSearch"
                onClick={() => setDrawer(true)}
            >
                Search
            </span>
            <Drawer
                open={drawerOpen}
                onClose={() => setDrawer(false)}
                anchor="left"
                className="searchBar"
            >
                {loading && <Loading />}
                {error && <ErrorMessage message={error} />}
                <React.Fragment>
                    <SearchGuild closeDrawer={() => setDrawer(false)} />
                    <SearchPlayer closeDrawer={() => setDrawer(false)} />
                </React.Fragment>
            </Drawer>
        </React.Fragment>
    );
}

export default SearchBar;
