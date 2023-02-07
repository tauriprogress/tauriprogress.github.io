import React from "react";

import { Link as RouterLink, useParams } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";

function Link({ to, children, ...rest }) {
    const { realmGroupName } = useParams();

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

export default Link;
