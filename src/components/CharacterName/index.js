import React from "react";

import { withTheme, withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import Link from "../Link";
import { Link as RegularLink } from "@material-ui/core";

import Avatar from "../Avatar";

import { getSpecImg, getRaceImg, getRaceName } from "../../helpers";
import { environmentCharacterSpecsSelector } from "../../redux/selectors";
function styles(theme) {
    return {
        margin: {
            margin: "0 2px"
        }
    };
}

function CharacterName({
    theme,
    classes,
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
                className={`${classes.margin} ${raceIconClass}`}
            />
            {!linkTo ? (
                <Link
                    to={`/character/${character.name}?realm=${realmName}`}
                    style={{
                        color: theme.palette.classColors[character.class].text
                    }}
                    {...rest}
                >
                    {character.name}
                </Link>
            ) : (
                <RegularLink
                    href={linkTo}
                    style={{
                        color: theme.palette.classColors[character.class].text
                    }}
                    {...rest}
                >
                    {character.name}
                </RegularLink>
            )}
        </React.Fragment>
    );
}

export default withStyles(styles)(withTheme(CharacterName));
