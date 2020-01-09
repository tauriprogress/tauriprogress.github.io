import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import { dateTextHours } from "../../helpers";

function DateTooltip({ date, children }) {
    return (
        <Tooltip title={dateTextHours(date)}>
            <span>{children}</span>
        </Tooltip>
    );
}

export default DateTooltip;
