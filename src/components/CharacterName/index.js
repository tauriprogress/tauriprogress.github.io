import React from "react";

import withTheme from "@mui/styles/withTheme";
import { useSelector } from "react-redux";

import Link from "../Link";
import { Link as RegularLink } from "@mui/material";

import Avatar from "../Avatar";

import { getSpecImg, getRaceImg, getRaceName } from "../../helpers";
import { environmentCharacterSpecsSelector } from "../../redux/selectors";

function CharacterName({
    theme,
    character,
    realmName,
    specIcon,
    specIconTitle,
    raceIconClass = "",
    specIconClass = "",
    linkTo,
    ...rest
}) {
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
                className={specIconClass}
            />

            <Avatar
                src={getRaceImg(character.race)}
                title={getRaceName(character.race)}
                className={`${raceIconClass}`}
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

export default withTheme(CharacterName);
