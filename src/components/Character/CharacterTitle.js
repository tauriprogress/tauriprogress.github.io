import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import { withStyles, withTheme } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import CharacterName from "../CharacterName";
import Avatar from "../Avatar";
import Link from "../Link";

import { talentTreeToSpec, getFactionImg } from "../../helpers";

function styles(theme) {
    return {
        characterName: {
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
        avatar: {
            width: "30px",
            height: "30px",
            transform: "translate(0, 4px)",
            marginRight: theme.spacing(0.4)
        },
        characterMetaData: {
            padding: 0,
            fontSize: `${12 / 16}rem`,
            lineHeight: 1
        }
    };
}

function CharacterTitle({ classes, theme }) {
    const { data, armoryUrl, characterClassNames, specs } = useSelector(
        state => ({
            data: state.character.data.data,
            armoryUrl: state.environment.urls.armory,
            characterClassNames: state.environment.characterClassNames,
            specs: state.environment.specs
        }),
        shallowEqual
    );

    if (!data) {
        return <div />;
    }
    const {
        palette: { factionColors }
    } = theme;
    const fullSpecName = `${data["treeName_" + data.activeSpec]} ${
        characterClassNames[data.class]
    }`;

    return (
        <Container className={classes.container}>
            <Typography variant="h4" className={classes.characterName}>
                <CharacterName
                    character={{
                        name: data.tname || data.name,
                        spec: talentTreeToSpec(fullSpecName, specs),
                        race: `${data.race},${data.gender}`,
                        class: data.class
                    }}
                    specIconClass={classes.avatar}
                    raceIconClass={classes.avatar}
                    linkTo={`${armoryUrl}?${data.character_url_string.replace(
                        "amp;",
                        ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                />
            </Typography>
            <Typography variant="button" className={classes.guildName}>
                <Link
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
                className={classes.characterMetaData}
                color="textSecondary"
            >
                <span
                    style={{
                        color:
                            data.faction_string_class === "Alliance"
                                ? factionColors.alliance
                                : factionColors.horde
                    }}
                >
                    <Avatar
                        src={getFactionImg(
                            data.faction_string_class === "Alliance" ? 0 : 1
                        )}
                        title={data.faction_string_class}
                    />{" "}
                    {data.faction_string_class}
                </span>{" "}
                {data.realm}
                <br />
                LEVEL {data.level}, ILVL {data.avgitemlevel}
            </Typography>
        </Container>
    );
}

export default withStyles(styles)(withTheme(CharacterTitle));
