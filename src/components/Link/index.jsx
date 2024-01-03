import React from "react";

import { Link as RouterLink } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";
import { withRealmGroupName } from "../Router/withRealmGroupName";

function Link({ to, children, realmGroupName, ...rest }) {
    const goTo =
        typeof to === "string"
            ? `/${realmGroupName}` + to
            : { ...to, pathname: `/${realmGroupName}` + to.pathname };

    return (
        <MaterialLink
            component={RouterLink}
            color="inherit"
            to={goTo}
            {...rest}
        >
            {children}
        </MaterialLink>
    );
}

export default withRealmGroupName(React.memo(Link));
