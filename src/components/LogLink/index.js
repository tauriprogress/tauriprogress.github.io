import React from "react";
import { useSelector } from "react-redux";

import Link from "../Link";

function LogLink({ children, logId, realm, ...rest }) {
    const location = useSelector(state => state.router.location);

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
