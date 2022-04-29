import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    raidBossKillCountFetch,
    raidBossCharactersFetch,
    raidBossPageSet,
} from "../../redux/actions";
import {
    raidFilterSelector,
    raidBossCharactersEntireSelector,
    raidBossPageCurrentPageSelector,
    environmentIsSeasonalSelector,
} from "../../redux/selectors";

import CharacterLadder from "../CharacterLadder";
import ErrorMessage from "../ErrorMessage";
import LinearProgress from "@mui/material/LinearProgress";
import ElevatedLinearProgress from "../ElevatedLinearProgress";

import { getCombatMetricFromDataSpecificationString } from "./helpers";

function Characters({ raidId, bossName, combatMetric }) {
    const {
        loading,
        characters,
        itemCount,
        error,
        filter,
        page,
        dataSpecificationString,
        isSeasonal,
    } = useSelector((state) => {
        return {
            ...raidBossCharactersEntireSelector(state),
            filter: raidFilterSelector(state),
            page: raidBossPageCurrentPageSelector(state),
            isSeasonal: environmentIsSeasonalSelector(state),
        };
    }, shallowEqual);

    const pageSize = 25;

    function changePage(e, newPage) {
        dispatch(raidBossPageSet(newPage));
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            raidBossCharactersFetch({
                raidId,
                bossName,
                combatMetric,
                filters: filter,
                page,
                pageSize,
            })
        );
    }, [
        raidId,
        bossName,
        combatMetric,
        filter,
        page,
        pageSize,
        isSeasonal,
        dispatch,
    ]);

    return (
        <React.Fragment>
            <CharacterLadder
                sliced={true}
                data={characters}
                combatMetric={getCombatMetricFromDataSpecificationString(
                    dataSpecificationString,
                    combatMetric
                )}
                page={page}
                pageSize={pageSize}
                onPageChange={changePage}
                itemCount={itemCount}
                loading={loading}
            />
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() =>
                        dispatch(
                            raidBossCharactersFetch({
                                raidId,
                                bossName,
                                combatMetric,
                                filters: filter,
                                page,
                                pageSize,
                            })
                        ) &&
                        dispatch(
                            raidBossKillCountFetch({
                                raidId,
                                bossName,
                                difficulty: filter.difficulty,
                            })
                        )
                    }
                />
            )}
        </React.Fragment>
    );
}

export default Characters;
