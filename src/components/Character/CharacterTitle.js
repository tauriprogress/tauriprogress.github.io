import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Avatar from "../Avatar";
import CharacterName from "../CharacterName";
import Link from "../Link";

import { getFactionImg, talentTreeToSpec } from "../../helpers";
import {
    characterDataSelector,
    environmentArmoryUrlSelector,
    environmentCharacterClassNamesSelector,
    environmentCharacterSpecsSelector,
} from "../../redux/selectors";

import { styled, useTheme } from "@mui/material";

const CustomContainer = styled(Container)(({ theme }) => ({
    textAlign: "center",
}));

const CharacterNameContainer = styled(Typography)(({ theme }) => ({
    paddingBottom: 0,
    lineHeight: 1,
}));
const GuildName = styled(Typography)(({ theme }) => ({
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
    display: "block",
    lineHeight: 1,
}));
const CharacterMetaData = styled(Typography)(({ theme }) => ({
    padding: 0,
    fontSize: `${12 / 16}rem`,
    lineHeight: 1,
}));

function CharacterTitle() {
    const theme = useTheme();
    const { data, armoryUrl, characterClassNames, specs } = useSelector(
        (state) => ({
            data: characterDataSelector(state),
            armoryUrl: environmentArmoryUrlSelector(state),
            characterClassNames: environmentCharacterClassNamesSelector(state),
            specs: environmentCharacterSpecsSelector(state),
        }),
        shallowEqual
    );

    if (!data) {
        return <div />;
    }
    const {
        palette: { factionColors },
    } = theme;
    const fullSpecName = `${data["treeName_" + data.activeSpec]} ${
        characterClassNames[data.class]
    }`;

    const avatarStyle = {
        width: "30px",
        height: "30px",
        transform: "translate(0, -4px)",
        marginRight: theme.spacing(0.4),
    };

    return (
        <CustomContainer>
            <CharacterNameContainer variant="h4">
                <CharacterName
                    character={{
                        name: data.tname || data.name,
                        spec: talentTreeToSpec(fullSpecName, specs),
                        race: `${data.race},${data.gender}`,
                        class: data.class,
                    }}
                    specIconStyles={avatarStyle}
                    raceIconStyles={avatarStyle}
                    linkTo={
                        armoryUrl
                            ? `${armoryUrl}?${data.character_url_string.replace(
                                  "amp;",
                                  ""
                              )}`
                            : "nolink"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                />
            </CharacterNameContainer>
            <GuildName variant="button">
                <Link
                    color="inherit"
                    to={`/guild/${data.guildName}?realm=${data.realm}`}
                    style={{
                        color:
                            data.faction_string_class === "Alliance"
                                ? factionColors.alliance
                                : factionColors.horde,
                    }}
                >
                    {data.guildName}
                </Link>
            </GuildName>
            <CharacterMetaData color="textSecondary">
                <span
                    style={{
                        color:
                            data.faction_string_class === "Alliance"
                                ? factionColors.alliance
                                : factionColors.horde,
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
            </CharacterMetaData>
        </CustomContainer>
    );
}

export default CharacterTitle;
