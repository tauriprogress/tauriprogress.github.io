import React from "react";
import { withStyles } from "@material-ui/styles";

function styles(theme) {
    return {
        overflowScroll: {
            overflowX: "scroll"
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
