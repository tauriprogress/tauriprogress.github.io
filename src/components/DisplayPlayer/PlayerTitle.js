import React from "react";

import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import characterClassColors from "../../constants/characterClassColors";
import { armoryUrl } from "../../constants/urls";
import characterClasses from "../../constants/characterClasses";

import { talentTreeToImage } from "./helpers";

function PlayerTitle({ data }) {
    const fullSpecName = `${data.treeName_0} ${characterClasses[data.class]}`;
    return (
        <div className="displayPlayerTitle">
            <Typography variant="h4">
                <a
                    href={`${armoryUrl}?${data.character_url_string.replace(
                        "amp;",
                        ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span
                        style={{
                            color: characterClassColors[data.class]
                        }}
                        className={data.class === 5 ? "outline" : ""}
                    >
                        {data.name}
                    </span>
                </a>

                <Tooltip
                    title={
                        <span className="textCapitalize">{fullSpecName}</span>
                    }
                >
                    <Avatar
                        component="span"
                        src={talentTreeToImage(fullSpecName)}
                        className="classSpecAvatar displayPlayerAvatar"
                    />
                </Tooltip>
            </Typography>
            <Typography variant="button">
                <span
                    className={
                        data.faction_string_class === "Alliance"
                            ? "blue"
                            : "red"
                    }
                >
                    <Link to={`/guild/${data.guildName}?realm=${data.realm}`}>
                        {data.guildName}
                    </Link>
                </span>
            </Typography>

            <Typography variant="caption">
                {data.realm}, {data.faction_string_class}
            </Typography>
        </div>
    );
}

export default PlayerTitle;
