import React from "react";
import { Link } from "react-router-dom";
import Info from "@material-ui/icons/Info";

function LogLink({ logId, realm }) {
    return (
        <span className="textBold ">
            <Link to={`/log/${logId}?realm=${realm}`}>
                <Info className="logLink" fontSize="small" />
            </Link>
        </span>
    );
}

export default LogLink;
