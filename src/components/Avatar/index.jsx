import React from "react";

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

function CustomAvatar({ src, title, ...rest }) {
    return (
        <Tooltip title={title} component="span">
            <Avatar src={src} {...rest} />
        </Tooltip>
    );
}

export default CustomAvatar;
