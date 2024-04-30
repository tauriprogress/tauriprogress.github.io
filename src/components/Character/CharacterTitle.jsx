import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import Typography from "@mui/material/Typography";

import Avatar from "../Avatar";
import Link from "../Link";

import {
    getClassImg,
    getFactionImg,
    getRaceImg,
    getSpecImg,
    talentTreeToSpec,
} from "../../helpers";
import {
    characterDataSelector,
    environmentCharacterClassNamesSelector,
    environmentCharacterSpecsSelector,
} from "../../redux/selectors";

import { Grid, styled, useTheme } from "@mui/material";
import { useRouteMatch } from "react-router-dom";

const CharacterName = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    fontSize: "36px",
    textTransform: "uppercase",
    lineHeight: 1,

    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
}));

const CharacterNameContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
}));

const GuildName = styled(Typography)(({ theme }) => ({
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
    display: "block",
    lineHeight: 1,
}));

const CharacterImage = styled("img")(({ theme }) => ({
    height: "56px",
    width: "56px",
    marginRight: theme.spacing(1),
    borderRadius: "5px",
    backgroundColor: theme.palette.background.dark,
    display: "block",
}));

const Container = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const SecondaryText = styled("span")(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
    height: "20px",
    width: "20px",
}));

const GoldenText = styled("span")(({ theme }) => ({
    color: theme.palette.text.golden,
    fontWeight: "bold",
}));

const CharacterNameRow = styled(Grid)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    flexWrap: "nowrap",
}));

const CharacterDetailContainer = styled(Grid)(({ theme }) => ({
    fontWeight: "bold",
    flexDirection: "column",
}));

const CharacterDetailRow = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
}));

const CharacterSpecNameContainer = styled(Grid)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

function CharacterTitle() {
    const match = useRouteMatch();
    const theme = useTheme();

    const matchCharName = match.params.characterName;

    const { data, specs } = useSelector(
        (state) => ({
            data: characterDataSelector(state),
            specs: environmentCharacterSpecsSelector(state),
        }),
        shallowEqual
    );

    const classColors = theme.palette.classColors;

    const specId = data.specName && talentTreeToSpec(data.specName, specs);

    const characterImageSrc =
        (specId && getSpecImg(specs[specId].image)) ||
        getClassImg(data.class || "undefined");

    return (
        <Container container>
            <Grid
                item
                style={{
                    maxWidth: "100%",
                }}
            >
                <CharacterNameRow container>
                    <Grid item>
                        <CharacterImage src={characterImageSrc} />
                    </Grid>
                    <CharacterNameContainer item>
                        <CharacterName
                            style={{
                                color:
                                    (data.class &&
                                        classColors[data.class].text) ||
                                    "inherit",
                            }}
                            variant="h4"
                        >
                            {data.name || matchCharName || "Undefined"}
                        </CharacterName>
                        {data.realm && (
                            <Typography>
                                <SecondaryText>{data.realm}</SecondaryText>
                            </Typography>
                        )}
                    </CharacterNameContainer>
                </CharacterNameRow>
            </Grid>
            {specId && (
                <>
                    <Grid item>
                        <CharacterDetails data={data} />
                    </Grid>
                </>
            )}
        </Container>
    );
}

function CharacterDetails({ data }) {
    const characterClassNames = useSelector(
        environmentCharacterClassNamesSelector
    );

    console.log(data);
    const theme = useTheme();
    const factionColors = theme.palette.factionColors;

    return (
        <CharacterDetailContainer container>
            <CharacterDetailRow item container>
                <CharacterSpecNameContainer item>
                    <CustomAvatar
                        title={data.specName}
                        src={getRaceImg(data.race)}
                    />{" "}
                    {data.specName} {characterClassNames[data.class]}
                </CharacterSpecNameContainer>
                <Grid item>
                    <GoldenText>
                        LEVEL {data.lvl} ILVL {data.ilvl}
                    </GoldenText>
                </Grid>
            </CharacterDetailRow>
            <CharacterDetailRow item>
                <GuildName variant="button">
                    <Link
                        color="inherit"
                        to={`/guild/${data.guild}?realm=${data.realm}`}
                        style={{
                            color:
                                data.faction === 0
                                    ? factionColors.alliance
                                    : factionColors.horde,
                        }}
                    >
                        <CustomAvatar
                            title={data.faction === 0 ? "Alliance" : "Horde"}
                            src={getFactionImg(data.faction)}
                        />
                        {data.guild}
                    </Link>
                </GuildName>
            </CharacterDetailRow>
        </CharacterDetailContainer>
    );
}

export default CharacterTitle;
