import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

function SpecImg({ src, title, ...rest }) {
    return (
        <Tooltip title={title} component="span">
            <Avatar src={src} {...rest} />
        </Tooltip>
    );
}

export default SpecImg;
