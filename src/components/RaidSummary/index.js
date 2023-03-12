import { raidNameId } from "tauriprogress-constants";
import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Container from "@mui/material/Container";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import BossSummary from "./BossSummary";

import { raidSummaryFetch, navigationSetItem } from "../../redux/actions";

import {
    raidFilterSelector,
    raidSummaryEntireSelector,
    environmentRaidsSelector,
    environmentCharacterSpecsSelector,
} from "../../redux/selectors";

import { styled } from "@mui/material";

const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
}));

function RaidSummary({ raidName }) {
    const { loading, error, data, raids, filter, specs, raidId } = useSelector(
        (state) => {
            return {
                ...raidSummaryEntireSelector(state),
                filter: raidFilterSelector(state),
                raids: environmentRaidsSelector(state),
                specs: environmentCharacterSpecsSelector(state),
            };
        },
        shallowEqual
    );
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
    }, [raidName, dispatch]);

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
                <CustomContainer>
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
                </CustomContainer>
            )}
        </div>
    );
}

export default React.memo(RaidSummary);
