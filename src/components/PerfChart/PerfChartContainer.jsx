import React from "react";

function PerfChartContainer({ children, ...rest }) {
    return <div {...rest}>{children}</div>;
}

export default PerfChartContainer;
