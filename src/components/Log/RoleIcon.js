import React from "react";

import { withStyles } from "@material-ui/core/styles";

function styles(theme) {
    return {
        img: {
            height: "12px",
            width: "12px",
            marginLeft: "2px",
            transform: "translate(0, 1px)"
        }
    };
}

function RoleIcon({ classes, src }) {
    return <img src={src} alt="" className={classes.img} />;
}

export default withStyles(styles)(RoleIcon);
