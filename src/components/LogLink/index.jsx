import React from "react";

import Link from "../Link";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";

const BoldLogLink = styled(LogLink)({
    fontWeight: "bold",
});

function LogLink({ children, logId, realm, ...rest }) {
    const location = useLocation();

    return (
        <Link
            color="inherit"
            to={{
                pathname: `/log/${logId}`,
                search: `?realm=${realm}`,
                state: { ...location.state, background: location },
            }}
            {...rest}
        >
            {children}
        </Link>
    );
}

export default BoldLogLink;
