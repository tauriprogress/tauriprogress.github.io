import { raidNameToId, specToClass, specs } from "tauriprogress-constants";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { withTheme, withStyles } from "@material-ui/core/styles";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { applyFilter } from "./helpers";

import { convertFightTime, getSpecImg } from "../../helpers";

import { fetchRaidSummary } from "../../redux/actions";

function useFilter(initialState) {
    const [filter, setFilter] = useState(initialState);

    function changeFilter(filterOptions) {
        setFilter({
            ...filter,
            spec: filterOptions.filterName === "class" ? "" : filter.spec,
            [filterOptions.filterName]: filterOptions.value
        });
    }

    return [filter, changeFilter];
}

function styles(theme) {
    return {
        boldText: {
            fontWeight: "bold"
        },
        cell: {
            padding: theme.spacing(1)
        }
    };
}

function RaidSummary({ classes, match, theme }) {
    const {
        palette: { classColors, factionColors }
    } = theme;

    const { loading, error, data } = useSelector(state => {
        return {
            ...state.raidSummary
        };
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (match.params.raidName || (!data && !loading))
            dispatch(fetchRaidSummary(raidNameToId[match.params.raidName]));
    }, []);

    return (
        <div>
            {JSON.stringify(error)}
            {JSON.stringify(data)}
        </div>
    );
}

export default withStyles(styles)(withTheme(RaidSummary));
