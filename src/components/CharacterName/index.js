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

    return (
        <React.Fragment>
            <Avatar
                src={specIcon || getSpecImg(specs[character.spec].image)}
                title={
                    specIconTitle || specs[character.spec].label || "No spec"
                }
                className={specIconClass}
            />

            <Avatar
                src={getRaceImg(character.race)}
                title={getRaceName(character.race)}
                className={`${raceIconClass}`}
            />
            {!linkTo ? (
                <Link
                    to={`/character/${character.name}?realm=${realmName}`}
                    style={{
                        color: theme.palette.classColors[character.class].text,
                    }}
                    {...rest}
                >
                    {character.name}
                </Link>
            ) : (
                <RegularLink
                    href={linkTo}
                    style={{
                        color: theme.palette.classColors[character.class].text,
                    }}
                    {...rest}
                >
                    {character.name}
                </RegularLink>
            )}
        </React.Fragment>
    );
}

export default withTheme(CharacterName);
