import React from "react";
import { useSelector } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import LatestKills from "../LatestKills";

function styles(theme) {
    return {
        container: {
            height: "600px"
        }
    };
}

function PlayerLatestKills({ classes }) {
    const { loading, error, data } = useSelector(
        state => state.player.latestKills
    );
    const realm = useSelector(state => state.player.realm);

    return (
        <LatestKills
            logs={data ? data.logs : []}
            realm={realm}
            className={classes.container}
        >
            {(() => {
                if (loading) {
                    return <Loading />;
                } else if (error) {
                    return <ErrorMessage message={error} />;
                } else {
                    return null;
                }
            })()}
        </LatestKills>
    );
}

export default withStyles(styles)(PlayerLatestKills);
