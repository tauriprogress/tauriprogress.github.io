import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";

import ItemTooltipText from "../ItemTooltipText";

import { playerItemsFetch } from "../../redux/actions";

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
    const { loading, error, item } = useSelector(state => ({
        item: state.player.items.data[id],
        loading: state.player.items.loading,
        error: state.player.items.error
    }));
    const dispatch = useDispatch();

    async function onOpen() {
        if (!item) {
            dispatch(playerItemsFetch({ ids, realm }));
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
                        <ItemTooltipText item={item} />
                    )}
                </React.Fragment>
            }
        >
            {children}
        </Tooltip>
    );
}

export default withStyles(styles)(ItemTooltip);
