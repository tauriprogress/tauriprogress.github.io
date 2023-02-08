import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Typography from "@mui/material/Typography";

import { raidBossKillCountFetch } from "../../redux/actions";
import { raidBossKillCountCountSelector } from "../../redux/selectors";

import { environmentDifficultyNamesSelector } from "../../redux/selectors";

function RaidBossTitle({ raidId, bossName, difficulty }) {
    const { killCount, difficultyNames } = useSelector(
        (state) => ({
            killCount: raidBossKillCountCountSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            raidBossKillCountFetch({
                raidId,
                bossName,
                difficulty,
            })
        );
    }, [raidId, bossName, difficulty, dispatch]);

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
