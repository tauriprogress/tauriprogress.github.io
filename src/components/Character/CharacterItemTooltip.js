import React from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Tooltip from "@mui/material/Tooltip";

import ItemTooltipText from "../ItemTooltipText";

import { characterItemsFetch } from "../../redux/actions";
import {
    characteritemsErrorSelector,
    characterItemsItemSelector,
    characterItemsLoadingSelector,
    environmentIconUrlSelector,
} from "../../redux/selectors";

function ItemTooltip({ children, itemMeta, realm }) {
    const { loading, error, item, iconUrl } = useSelector(
        (state) => ({
            item: characterItemsItemSelector(state, itemMeta.guid),
            loading: characterItemsLoadingSelector(state),
            error: characteritemsErrorSelector(state),
            iconUrl: environmentIconUrlSelector(state),
        }),
        shallowEqual
    );

    const dispatch = useDispatch();

    async function onOpen() {
        if (!item) {
            dispatch(
                characterItemsFetch({
                    items: [
                        {
                            id: itemMeta.guid,
                            pcs: itemMeta.queryParams
                                ? itemMeta.queryParams.replace("pcs=", "")
                                : undefined,
                        },
                    ],
                    realm,
                })
            );
        }
    }

    return (
        <React.Fragment>
            <Tooltip
                onOpen={onOpen}
                PopperProps={{
                    sx: {
                        "& .MuiTooltip-tooltip": {
                            padding: "7px",
                            border: "1px solid black",
                            fontSize: `${12 / 16}rem`,
                            width: "260px",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                        },
                    },
                }}
                placement={window.innerWidth > 600 ? "left" : "bottom"}
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

export default ItemTooltip;
