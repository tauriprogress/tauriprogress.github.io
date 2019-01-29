import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Info from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";

function LogLink({ logId, realm }) {
    return (
        <span className="textBold ">
            <Tooltip title={"Logs"}>
                <RouterLink to={`/log/${logId}?realm=${realm}`}>
                    <Link component="span" color="inherit">
                        <Info className="logLink" fontSize="small" />
                    </Link>
                </RouterLink>
            </Tooltip>
        </span>
    );
}

export default LogLink;
