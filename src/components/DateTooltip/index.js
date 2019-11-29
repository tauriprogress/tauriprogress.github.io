import React from "react";

import Tooltip from "@material-ui/core/Tooltip";

function DateTooltip({ date, children }) {
    return (
        <Tooltip
            title={`${("0" + date.getHours()).slice(-2)}:${(
                "0" + date.getMinutes()
            ).slice(-2)}`}
        >
            <span>{children}</span>
        </Tooltip>
    );
}

export default DateTooltip;
