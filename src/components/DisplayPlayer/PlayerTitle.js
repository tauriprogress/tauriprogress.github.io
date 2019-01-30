import { characterClasses } from "tauriprogress-constants";
import { armoryUrl } from "tauriprogress-constants/urls";

import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { withTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

import { talentTreeToImage } from "./helpers";

function PlayerTitle({ data, theme }) {
    const {
        palette: { classColors, factionColors }
    } = theme;
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
                            color: classColors[data.class]
                        }}
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
                    style={{
                        color:
                            data.faction_string_class === "Alliance"
                                ? factionColors.alliance
                                : factionColors.horde
                    }}
                >
                    <Typography color="inherit">
                        <RouterLink
                            to={`/guild/${data.guildName}?realm=${data.realm}`}
                        >
                            <Link component="span" color="inherit">
                                {data.guildName}
                            </Link>
                        </RouterLink>
                    </Typography>
                </span>
            </Typography>

            <Typography variant="caption">
                {data.realm}, {data.faction_string_class}
            </Typography>
        </div>
    );
}

export default withTheme()(PlayerTitle);
