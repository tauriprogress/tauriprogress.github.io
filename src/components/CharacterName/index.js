import React from "react";

import { withTheme, withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import Avatar from "../Avatar";

import { getSpecImg, getRaceImg, getRaceName } from "../../helpers";

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
    const specs = useSelector(state => state.environment.specs);

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
                    component={RouterLink}
                    to={`/character/${character.name}?realm=${realmName}`}
                    style={{
                        color: theme.palette.classColors[character.class].text
                    }}
                    {...rest}
                >
                    {character.name}
                </Link>
            ) : (
                <Link
                    href={linkTo}
                    style={{
                        color: theme.palette.classColors[character.class].text
                    }}
                    {...rest}
                >
                    {character.name}
                </Link>
            )}
        </React.Fragment>
    );
}

export default withStyles(styles)(withTheme(CharacterName));
