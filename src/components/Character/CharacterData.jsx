import React from "react";

import { getClassBackgroundImg } from "../../helpers";
import { characterClassSelector } from "../../redux/selectors";

import CharacterTitle from "./CharacterTitle";
import { styled } from "@mui/material";
import CharacterItems from "./CharacterItems";
import { useSelector } from "react-redux";

const Section = styled("section")(({ theme }) => ({
    position: "relative",
    paddingBottom: theme.spacing(8),
}));

const BackgroundImage = styled("div")(({ theme }) => ({
    width: "100%",
    height: "100%",
    opacity: 0.3,
    position: "absolute",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -1,
    "&:before": {
        position: "absolute",
        top: "0",
        left: "0",
        display: "block",
        height: "100%",
        width: "100%",
        content: "''",
        background: `linear-gradient(0deg, ${theme.palette.background.default} 0%, rgba(255, 255, 255, 0.1) 15%, rgba(255, 255, 255, 0.0) 50%, rgba(255, 255, 255, 0.1) 85%, ${theme.palette.background.default} 100%)`,
    },
}));

function BackgroundImageContainer() {
    const characterClass = useSelector(characterClassSelector);
    return (
        <BackgroundImage
            style={{
                backgroundImage: `url(${getClassBackgroundImg(
                    characterClass || "default"
                )})`,
            }}
        />
    );
}

function CharacterData() {
    return (
        <Section>
            <BackgroundImageContainer />
            <CharacterTitle />
            <CharacterItems />
        </Section>
    );
}

/**  */
export default CharacterData;
