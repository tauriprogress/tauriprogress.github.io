import React from "react";
import { useSelector } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import LatestKills from "../LatestKills";

function styles(theme) {
    return {
        container: {
            backgroundColor: theme.palette.background.accent,

            padding: `${theme.spacing(4)}px ${theme.spacing(1)}px`
        },
        latestKills: {
            maxWidth: "500px",
            margin: "auto"
        }
    };
}

function PlayerLatestKills({ classes }) {
    const { loading, error, data } = useSelector(
        state => state.player.latestKills
    );
    const realm = useSelector(state => state.player.realm);
    const logs = data ? data.logs : [];
    return (
        <div className={classes.container}>
            <LatestKills
                logs={logs}
                realm={realm}
                className={classes.latestKills}
            >
                <Typography variant="h6">Latest Kills</Typography>
                {(() => {
                    if (loading) {
                        return <Loading />;
                    } else if (error) {
                        return <ErrorMessage message={error} />;
                    } else if (!logs.length) {
                        return <Typography>No data</Typography>;
                    } else {
                        return null;
                    }
                })()}
            </LatestKills>
        </div>
    );
}

export default withStyles(styles)(PlayerLatestKills);
