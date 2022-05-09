import React from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import withStyles from "@mui/styles/withStyles";

import Tooltip from "@mui/material/Tooltip";

import ItemTooltipText from "../ItemTooltipText";

import { characterItemsFetch } from "../../redux/actions";
import {
    characterItemsItemSelector,
    characterItemsLoadingSelector,
    characteritemsErrorSelector,
    environmentIconUrlSelector,
} from "../../redux/selectors";

function styles(theme) {
    return {
        tooltip: {
            padding: theme.spacing(1),
            border: "1px solid black",
            fontSize: `${12 / 16}rem`,
            width: "260px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
    };
}

function ItemTooltip({ classes, children, id, ids, realm }) {
    const { loading, error, item, iconUrl } = useSelector(
        (state) => ({
            item: characterItemsItemSelector(state, id),
            loading: characterItemsLoadingSelector(state),
            error: characteritemsErrorSelector(state),
            iconUrl: environmentIconUrlSelector(state),
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    async function onOpen() {
        if (!item) {
            dispatch(characterItemsFetch({ ids, realm }));
        }
    }

    return (
        <React.Fragment>
            <Tooltip
                onOpen={onOpen}
                classes={{
                    tooltip: classes.tooltip,
                }}
                placement="top-end"
                title={
                    <React.Fragment>
                        {loading && "Loading..."}
                        {error && error}

                        {!loading && !error && item && (
                            <ItemTooltipText item={item} iconUrl={iconUrl} />
                        )}
                    </React.Fragment>
                }
            >
                {children}
            </Tooltip>
        </React.Fragment>
    );
}

export default withStyles(styles)(ItemTooltip);
