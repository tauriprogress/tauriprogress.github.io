import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";

import { raidBossKillCountFetch } from "../../redux/actions";
import { raidBossKillCountCountSelector } from "../../redux/selectors";

import {
    environmentDifficultyNamesSelector,
    environmentIsSeasonalSelector,
} from "../../redux/selectors";

function RaidBossTitle({ raidId, bossName, difficulty }) {
    const killCount = useSelector(raidBossKillCountCountSelector);
    const difficultyNames = useSelector(environmentDifficultyNamesSelector);
    const isSeasonal = useSelector(environmentIsSeasonalSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(raidBossKillCountFetch({ raidId, bossName, difficulty }));
    }, [raidId, bossName, difficulty, isSeasonal, dispatch]);

    return (
        <React.Fragment>
            <Typography variant="h4" align="center">
                {`${bossName} ${difficultyNames[difficulty]}`}
            </Typography>
            <Typography
                component="p"
                variant="caption"
                color="textSecondary"
                align="center"
            >
                <span
                    style={{
                        whiteSpace: "nowrap",
                    }}
                >
                    {killCount} Kills
                </span>
            </Typography>
        </React.Fragment>
    );
}

export default RaidBossTitle;
