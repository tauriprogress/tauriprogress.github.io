import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";

import ItemTooltipText from "../ItemTooltipText";

import { fetchCharacterItems } from "../../redux/actions";

function styles(theme) {
    return {
        tooltip: {
            padding: theme.spacing(1),
            border: "1px solid black",
            fontSize: `${12 / 16}rem`,
            width: "260px",
            backgroundColor: "rgba(0, 0, 0, 0.8)"
        }
    };
}

function ItemTooltip({ classes, children, id, ids, realm }) {
    const { loading, error, item, iconUrl } = useSelector(state => ({
        item: state.character.items.data[id],
        loading: state.character.items.loading,
        error: state.character.items.error,
        iconUrl: state.environment.urls.icon
    }));
    const dispatch = useDispatch();

    async function onOpen() {
        if (!item) {
            dispatch(fetchCharacterItems({ ids, realm }));
        }
    }

    return (
        <Tooltip
            onOpen={onOpen}
            classes={{
                tooltip: classes.tooltip
            }}
            placement={"left"}
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
    );
}

export default withStyles(styles)(ItemTooltip);
