import React from "react";
import Container from "@mui/material/Container";

function PerfChartContainer({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

export default PerfChartContainer;
