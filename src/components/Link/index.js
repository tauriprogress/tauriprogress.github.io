import React from "react";

import { Link as RouterLink } from "react-router-dom";
import { Link as MaterialLink } from "@material-ui/core";

function Link({ to, children, ...rest }) {
    return (
        <MaterialLink
            component={RouterLink}
            color="inherit"
            to={location => {
                let isSeasonal = !!location.pathname.match(/^\/seasonal/i);

                if (!isSeasonal) {
                    return to;
                } else {
                    if (typeof to === "string") {
                        return "/seasonal" + to;
                    } else {
                        return { ...to, pathname: "/seasonal" + to.pathname };
                    }
                }
            }}
            {...rest}
        >
            {children}
        </MaterialLink>
    );
}

export default Link;
