import React from "react";

import { dateToString } from "../../helpers";

function DisplayDate({ date, children, align }) {
    return (
        <span
            style={{
                fontFamily: "Roboto Mono"
            }}
            className={align === "right" ? "dateToRight" : ""}
        >
            {dateToString(date)}
            {children}
        </span>
    );
}

export default DisplayDate;
