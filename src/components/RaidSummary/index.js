import { raidNameId } from "tauriprogress-constants";
import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Container from "@mui/material/Container";

import withStyles from '@mui/styles/withStyles';
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import BossSummary from "./BossSummary";

import { raidSummaryFetch, navigationSetItem } from "../../redux/actions";

import {
    raidFilterSelector,
    raidSummaryEntireSelector,
    environmentRaidsSelector,
    environmentCharacterSpecsSelector,
    environmentIsSeasonalSelector,
} from "../../redux/selectors";

function styles(theme) {
    return {
        container: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
        },
    };
}

function RaidSummary({ classes, raidName }) {
    const { loading, error, data, raids, filter, specs, raidId, isSeasonal } =
        useSelector((state) => {
            return {
                ...raidSummaryEntireSelector(state),
                raids: environmentRaidsSelector(state),
                filter: raidFilterSelector(state),
                specs: environmentCharacterSpecsSelector(state),
                isSeasonal: environmentIsSeasonalSelector(state),
            };
        }, shallowEqual);
    const raid = raids.reduce((acc, raid) => {
        if (raid.id === raidId) {
            acc = raid;
        }
        return acc;
    }, null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(raidSummaryFetch(raidNameId[raidName]));
        dispatch(navigationSetItem(raidName));

        return () => dispatch(navigationSetItem(null));
    }, [raidName, isSeasonal, dispatch]);

    return (
        <div>
            {loading && <Loading />}
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() =>
                        dispatch(raidSummaryFetch(raidNameId[raidName]))
                    }
                />
            )}
            {!raid && (
                <ErrorMessage message={`${raidName} is not a valid raid.`} />
            )}
            {!error && !loading && raid && data && (
                <Container className={classes.container}>
                    {raid.bosses.map((boss) => {
                        let bossData = {};
                        for (const difficulty in boss.bossIdOfDifficulty) {
                            bossData[difficulty] =
                                data[
                                    `${boss.bossIdOfDifficulty[difficulty]} ${difficulty}`
                                ];
                        }
                        return (
                            <BossSummary
                                key={boss.name}
                                bossInfo={boss}
                                data={bossData}
                                filter={filter}
                                specs={specs}
                            />
                        );
                    })}
                </Container>
            )}
        </div>
    );
}

export default withStyles(styles)(React.memo(RaidSummary));
