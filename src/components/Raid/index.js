import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Page from "../Page";
import RaidSummary from "../RaidSummary";
import RaidBoss from "../RaidBoss";

import RaidFilter from "../RaidFilter";

import { replaceHistory } from "../../redux/actions";
import {
    raidFilterSelector,
    raidBossTabSelectedTabSelector
} from "../../redux/selectors";

function Raid({ match }) {
    const selectedTab = useSelector(raidBossTabSelectedTabSelector);
    let filter = useSelector(raidFilterSelector);

    const dispatch = useDispatch();

    const raidName = match.params.raidName;
    const bossName = match.params.bossName;

    let title = raidName;
    let Component = RaidSummary;

    useEffect(() => {
        if (bossName) {
            dispatch(replaceHistory({ ...filter, tab: selectedTab }));
        } else {
            dispatch(replaceHistory({ ...filter }));
        }
    }, [filter, selectedTab, bossName, dispatch]);

    if (bossName) {
        title = bossName;
        Component = RaidBoss;
    }

    return (
        <Page title={`${title} | Tauri Progress`}>
            <RaidFilter />
            <Component raidName={raidName} bossName={bossName} />
        </Page>
    );
}

export default React.memo(Raid, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
