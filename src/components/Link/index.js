import React from "react";
import { useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";
import { Link as MaterialLink } from "@mui/material";

import { environmentIsSeasonalSelector } from "../../redux/selectors";

function Link({ to, children, ...rest }) {
    const isSeasonal = useSelector(environmentIsSeasonalSelector);
    const goTo = !isSeasonal
        ? to
        : typeof to === "string"
        ? "/seasonal" + to
        : { ...to, pathname: "/seasonal" + to.pathname };
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
