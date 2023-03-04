import React from "react";
import { useSelector } from "react-redux";

import { Link as RegularLink, useTheme } from "@mui/material";
import Link from "../Link";
import Avatar from "../Avatar";

import { getRaceImg, getRaceName, getSpecImg } from "../../helpers";
import { environmentCharacterSpecsSelector } from "../../redux/selectors";

function CharacterName({
    character,
    realmName,
    specIcon,
    specIconTitle,
    raceIconStyles = {},
    specIconStyles = {},
    linkTo,
    ...rest
}) {
    const theme = useTheme();
    const specs = useSelector(environmentCharacterSpecsSelector);

    const specImageName = character.spec
        ? specs[character.spec].image
        : "undefined";

    const specTitle = character.spec ? specs[character.spec].label : "No spec";

    return (
        <React.Fragment>
            <Avatar
                src={specIcon || getSpecImg(specImageName)}
                title={specIconTitle || specTitle}
                sx={raceIconStyles}
            />

            <Avatar
                src={getRaceImg(character.race)}
                title={getRaceName(character.race)}
                sx={specIconStyles}
            />

            {(() => {
                switch (linkTo) {
                    case undefined:
                        return (
                            <Link
                                to={`/character/${character.name}?realm=${realmName}`}
                                style={{
                                    color: theme.palette.classColors[
                                        character.class
                                    ].text,
                                }}
                                {...rest}
                            >
                                {character.name}
                            </Link>
                        );
                    case "nolink":
                        return (
                            <span
                                style={{
                                    color: theme.palette.classColors[
                                        character.class
                                    ].text,
                                }}
                                {...rest}
                            >
                                {character.name}
                            </span>
                        );

                    default:
                        return (
                            <RegularLink
                                href={linkTo}
                                style={{
                                    color: theme.palette.classColors[
                                        character.class
                                    ].text,
                                }}
                                {...rest}
                            >
                                {character.name}
                            </RegularLink>
                        );
                }
            })()}
        </React.Fragment>
    );
}

export default CharacterName;
