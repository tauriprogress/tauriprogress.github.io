import React from "react";

import { Link as RouterLink, useLocation } from "react-router-dom";
import Link from "@material-ui/core/Link";

function LogLink({ children, logId, realm, ...rest }) {
    const location = useLocation();
    return (
        <Link
            component={RouterLink}
            color="inherit"
            to={{
                pathname: `/log/${logId}`,
                search: `?realm=${realm}`,
                state: { background: location }
            }}
            {...rest}
        >
            {children}
        </Link>
    );
}

export default LogLink;
