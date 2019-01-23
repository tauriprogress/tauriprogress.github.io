import React from "react";
import { Link } from "react-router-dom";
import Info from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

function LogLink({ logId, realm }) {
    return (
        <span className="textBold ">
            <Tooltip title={"Logs"}>
                <Link to={`/log/${logId}?realm=${realm}`}>
                    <Info className="logLink" fontSize="small" />
                </Link>
            </Tooltip>
        </span>
    );
}

export default LogLink;
