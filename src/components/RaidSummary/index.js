import { raidNameToId } from "tauriprogress-constants";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Container from "@material-ui/core/Container";

import { withStyles } from "@material-ui/core/styles";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import BossSummary from "./BossSummary";

import {
    fetchRaidSummary,
    setSelectedNavigationItem
} from "../../redux/actions";

function styles(theme) {
    return {
        container: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }
    };
}

function RaidSummary({ classes, match }) {
    const raidName = match.params.raidName;

    const { raidId, loading, error, data, raid, filter, specs } = useSelector(
        state => {
            return {
                ...state.raidSummary,
                raid: state.environment.currentContent.raids.reduce(
                    (acc, raid) => {
                        if (raid.id === state.raidSummary.raidId) {
                            acc = raid;
                        }
                        return acc;
                    },
                    null
                ),
                filter: state.raid.filter,
                specs: state.environment.specs
            };
        }
    );

    const dispatch = useDispatch();
    useEffect(() => {
        if (raidNameToId[raidName] !== raidId) {
            dispatch(fetchRaidSummary(raidNameToId[raidName]));
        }
        dispatch(setSelectedNavigationItem(raidName));

        return () => dispatch(setSelectedNavigationItem(null));
    }, [raidName]);

    return (
        <div>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!raid && (
                <ErrorMessage message={`${raidName} is not a valid raid.`} />
            )}
            {!error && !loading && raid && data && (
                <Container className={classes.container}>
                    {raid.bosses.map(boss => {
                        let bossData = {};
                        for (const difficulty in boss.difficultyIds) {
                            bossData[difficulty] =
                                data[
                                    `${boss.difficultyIds[difficulty]} ${difficulty}`
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

export default withStyles(styles)(RaidSummary);
