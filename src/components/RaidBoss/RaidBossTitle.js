import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@material-ui/core/Typography";

import { raidBossKillCountFetch } from "../../redux/actions";
import { raidBossKillCountCountSelector } from "../../redux/selectors";

function RaidBossTitle({ raidId, bossName, difficulty }) {
    const killCount = useSelector(raidBossKillCountCountSelector);
    const difficultyNames = useSelector(
        state => state.environment.difficultyNames
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(raidBossKillCountFetch({ raidId, bossName, difficulty }));
    }, [raidId, bossName, difficulty, dispatch]);

    return (
        <Typography variant="h4" align="center">
            {`${bossName} ${difficultyNames[difficulty]}`}
            <Typography variant="caption" color="textSecondary">
                {" "}
                <span
                    style={{
                        whiteSpace: "nowrap"
                    }}
                >
                    {killCount} Kills
                </span>
            </Typography>
        </Typography>
    );
}

export default RaidBossTitle;
