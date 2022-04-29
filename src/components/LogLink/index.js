import React from "react";
import { useSelector } from "react-redux";

import Link from "../Link";
import { styled } from "@mui/system";

const BoldLogLink = styled(LogLink)({
    fontWeight: "bold",
});

function LogLink({ children, logId, realm, ...rest }) {
    const location = useSelector((state) => state.router.location);

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
