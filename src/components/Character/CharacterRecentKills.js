import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import RecentKills from "../RecentKills";

function styles(theme) {
    return {
        container: {
            padding: `${theme.spacing(4)}px ${theme.spacing(1)}px`
        },
        recentKills: {
            maxWidth: "500px",
            margin: "auto"
        }
    };
}

function CharacterRecentKills({ classes }) {
    const { loading, error, data, realm } = useSelector(
        state => ({
            ...state.character.recentKills,
            realm: state.character.realm
        }),
        shallowEqual
    );

    const logs = data ? data.logs : [];

    return (
        <div className={classes.container}>
            <RecentKills
                logs={logs}
                realm={realm}
                className={classes.recentKills}
            >
                <Typography variant="h6">Recent Kills</Typography>
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
            </RecentKills>
        </div>
    );
}

export default withStyles(styles)(CharacterRecentKills);
