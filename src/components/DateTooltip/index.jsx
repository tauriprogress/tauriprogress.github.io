import React from "react";

import Tooltip from "@mui/material/Tooltip";
import { dateTextHours } from "../../helpers";

function DateTooltip({ date, children }) {
    return (
        <Tooltip title={dateTextHours(date)}>
            <span>{children}</span>
        </Tooltip>
    );
}

export default DateTooltip;
