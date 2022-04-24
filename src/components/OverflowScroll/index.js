import React from "react";
import { withStyles } from "@mui/styles";

function styles(theme) {
    return {
        overflowScroll: {
            overflowX: "scroll",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
                display: "none"
            }
        }
    };
}

function OverflowScroll({ classes, children, ...props }) {
    return (
        <div
            {...props}
            className={`${classes.overflowScroll} ${props.className}`}
        >
            {children}
        </div>
    );
}

export default withStyles(styles)(OverflowScroll);
