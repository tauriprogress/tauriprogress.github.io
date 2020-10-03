import { raidNameToId, specToClass, specs } from "tauriprogress-constants";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import Container from "@material-ui/core/Container";

import { withTheme, withStyles } from "@material-ui/core/styles";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import BossSummary from "./BossSummary";

import { applyFilter } from "./helpers";

import { convertFightTime, getSpecImg } from "../../helpers";

import { fetchRaidSummary } from "../../redux/actions";

function styles(theme) {
    return {
        container: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }
    };
}

function RaidSummary({ classes, match, theme }) {
    const {
        palette: { classColors, factionColors }
    } = theme;

    const raidName = match.params.raidName;

    const { loading, error, data, raid, filter, specs } = useSelector(state => {
        return {
            ...state.raidSummary,
            raid: state.environment.currentContent.raids.reduce((acc, raid) => {
                if (raid.name === raidName) {
                    acc = raid;
                }
                return acc;
            }, null),
            filter: state.raid.filter,
            specs: state.environment.specs
        };
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (raidName || (!data && !loading))
            dispatch(fetchRaidSummary(raidNameToId[raidName]));
    }, []);

    return (
        <div>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!error && !loading && data && (
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
                                bossInfo={boss}
                                data={bossData}
                                key={boss.name}
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

export default withStyles(styles)(withTheme(RaidSummary));
