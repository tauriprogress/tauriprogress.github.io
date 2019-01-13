import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

function Loading() {
    return (
        <div className="loaderContainer">
            <CircularProgress
                className="additionalInfoLoader"
                color="secondary"
            />
        </div>
    );
}

export default Loading;
