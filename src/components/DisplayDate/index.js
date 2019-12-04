import React from "react";

import { dateToString } from "../../helpers";

function DisplayDate({ date, children, align }) {
    return (
        <span className={align === "right" ? "dateToRight" : ""}>
            {dateToString(date)}
            {children}
        </span>
    );
}

export default DisplayDate;
