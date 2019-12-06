import React from "react";

import { withStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";
import Info from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";

function styles(theme) {
    return {
        icon: {
            transform: "translate(0, 5px)"
        }
    };
}

function LogLink({ classes, logId, realm }) {
    return (
        <Tooltip title={"Logs"}>
            <Link
                component={RouterLink}
                color="inherit"
                to={`/log/${logId}?realm=${realm}`}
            >
                <Info className={classes.icon} />
            </Link>
        </Tooltip>
    );
}

export default withStyles(styles)(LogLink);
