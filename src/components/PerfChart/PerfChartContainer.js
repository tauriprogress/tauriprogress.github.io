import React from "react";
import Container from "@material-ui/core/Container";

function PerfChartContainer({ children, ...rest }) {
    return <Container {...rest}>{children}</Container>;
}

export default PerfChartContainer;
