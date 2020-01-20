import { characterClasses, characterRaces } from "tauriprogress-constants";
import { armoryUrl } from "tauriprogress-constants/urls";

import React from "react";
import { useSelector } from "react-redux";

import { withStyles, withTheme } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import SpecImg from "../SpecImg";

import { talentTreeToImage } from "../../helpers";

function styles(theme) {
    return {
        playerName: {
            paddingBottom: 0,
            lineHeight: 1
        },
        guildName: {
            paddingTop: 0,
            paddingBottom: theme.spacing(1),
            display: "block",
            lineHeight: 1
        },
        container: {
            textAlign: "center"
        },
        specImg: {
            width: "30px",
            height: "30px",
            transform: "translate(0, 4px)",
            marginRight: theme.spacing(0.4)
        },
        playerMetaData: {
            padding: 0,
            fontSize: `${12 / 16}rem`,
            lineHeight: 1
        }
    };
}

function PlayerTitle({ classes, theme }) {
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
        <Container className={classes.container}>
            <Typography variant="h4" className={classes.playerName}>
                <SpecImg
                    title={fullSpecName}
                    src={talentTreeToImage(fullSpecName)}
                    className={classes.specImg}
                />
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
                    {data.tname || data.name}
                </Link>
            </Typography>
            <Typography variant="button" className={classes.guildName}>
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
            <Typography
                className={classes.playerMetaData}
                color="textSecondary"
            >
                Level {data.level} {characterRaces[data.race]}
                <br /> ilvl {data.avgitemlevel}{" "}
                <span
                    style={{
                        color: classColors[data.class].text
                    }}
                >
                    {fullSpecName}
                </span>
                <br />
                {data.realm}{" "}
                <span
                    style={{
                        color:
                            data.faction_string_class === "Alliance"
                                ? factionColors.alliance
                                : factionColors.horde
                    }}
                >
                    {data.faction_string_class}
                </span>
            </Typography>
        </Container>
    );
}

export default withStyles(styles)(withTheme(PlayerTitle));
