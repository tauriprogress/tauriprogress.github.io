import React from "react";

import { useLocation } from "react-router-dom";
import Link from "../Link";

function LogLink({ children, logId, realm, ...rest }) {
    const location = useLocation();
    return (
        <Link
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
