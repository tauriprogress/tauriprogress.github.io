import React from "react";

import { withTheme, withStyles } from "@material-ui/core/styles";

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

function CharacterName({ theme, classes, character, realmName, specs }) {
    return (
        <React.Fragment>
            <Avatar
                src={getSpecImg(specs[character.spec].image)}
                title={specs[character.spec].label || "No spec"}
            />

            <Avatar
                src={getRaceImg(character.race)}
                title={getRaceName(character.race)}
                className={classes.margin}
            />

            <Link
                component={RouterLink}
                to={`/character/${character.name}?realm=${realmName}`}
                style={{
                    color: theme.palette.classColors[character.class].text
                }}
            >
                {character.name}
            </Link>
        </React.Fragment>
    );
}

export default withStyles(styles)(withTheme(CharacterName));
