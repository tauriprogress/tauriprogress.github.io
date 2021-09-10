import React, { useEffect } from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import CharacterLadder from "../CharacterLadder";

import {
    fetchRaidBossCharacters,
    setRaidBossPage,
    fetchRaidBossKillCount
} from "../../redux/actions";

import { raidFilterSelector } from "../../redux/selectors";

function Characters({ raidId, bossName, combatMetric }) {
    const { loading, data, error, filter, page, dataSpecificationString } =
        useSelector(state => {
            return {
                ...state.raidBoss.characters,
                filter: raidFilterSelector(state),
                page: state.raidBoss.page.currentPage
            };
        }, shallowEqual);

    const pageSize = 30;

    function changePage(e, newPage) {
        dispatch(setRaidBossPage(newPage));
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            fetchRaidBossCharacters({
                raidId,
                bossName,
                combatMetric,
                filters: filter,
                page,
                pageSize
            })
        );
    }, [raidId, bossName, combatMetric, filter, page, pageSize, dispatch]);

    return (
        <React.Fragment>
            {loading && <Loading />}
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() =>
                        dispatch(
                            fetchRaidBossCharacters({
                                raidId,
                                bossName,
                                combatMetric,
                                filters: filter,
                                page,
                                pageSize
                            })
                        ) &&
                        dispatch(
                            fetchRaidBossKillCount({
                                raidId,
                                bossName,
                                difficulty: filter.difficulty
                            })
                        )
                    }
                />
            )}
            {!loading &&
                !error &&
                data &&
                dataSpecificationString.includes(combatMetric) && (
                    <CharacterLadder
                        sliced={true}
                        data={data.characters}
                        type={combatMetric}
                        page={page}
                        pageSize={pageSize}
                        onPageChange={changePage}
                        itemCount={data.itemCount}
                    />
                )}
        </React.Fragment>
    );
}

export default Characters;
