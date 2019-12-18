import { characterClasses, characterRaces } from "tauriprogress-constants";
import { armoryUrl } from "tauriprogress-constants/urls";

import React from "react";
import { useSelector } from "react-redux";

import { withTheme } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import SpecImg from "../SpecImg";

import { talentTreeToImage } from "../../helpers";

function PlayerTitle({ theme }) {
    const data = useSelector(state => state.player.data.data);
    if (!data) {
        return <div />;
    }
    const {
        palette: { classColors, factionColors }
    } = theme;
    const fullSpecName = `${data["treeName_" + data.activeSpec]} ${
        characterClasses[data.class]
    }`;

    return (
        <Container style={{ textAlign: "center" }}>
            <Typography variant="h4">
                <Link
                    href={`${armoryUrl}?${data.character_url_string.replace(
                        "amp;",
                        ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: classColors[data.class].text
                    }}
                >
                    {data.name}
                </Link>{" "}
                <SpecImg
                    title={fullSpecName}
                    src={talentTreeToImage(fullSpecName)}
                    style={{
                        width: "25px",
                        height: "25px",
                        transform: "translate(0, 4px)"
                    }}
                />
            </Typography>
            <Typography variant="button">
                <Typography>
                    <Link
                        component={RouterLink}
                        color="inherit"
                        to={`/guild/${data.guildName}?realm=${data.realm}`}
                        style={{
                            color:
                                data.faction_string_class === "Alliance"
                                    ? factionColors.alliance
                                    : factionColors.horde
                        }}
                    >
                        {data.guildName}
                    </Link>
                </Typography>
            </Typography>
            <Typography variant="caption" color="textSecondary">
                {data.realm}
            </Typography>
            <br />
            <Typography variant="caption" color="textSecondary">
                {data.faction_string_class}, {characterRaces[data.race]}
            </Typography>
        </Container>
    );
}

export default withTheme(PlayerTitle);
