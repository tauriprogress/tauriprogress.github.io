import React from "react";

import { shallowEqual, useSelector } from "react-redux";

import withStyles from '@mui/styles/withStyles';
import withTheme from '@mui/styles/withTheme';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import CharacterItemTooltip from "./CharacterItemTooltip";
import TitledContainer from "../TitledContainer";
import {
    characterRealmSelector,
    characterDataIncompleteItemsSelector,
    environmentIconUrlSelector
} from "../../redux/selectors";

function styles(theme) {
    return {
        icon: {
            position: "relative",
            lineHeight: 1,
            width: "36px",
            height: "36px",
            border: "1px solid #333",
            backgroundSize: "123% 123%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        },
        textContainer: {
            alignItems: "center",
            display: "flex",
            overflow: "hidden",
            padding: `0 ${theme.spacing(0.5)}`
        },
        itemName: {
            lineHeight: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        itemLevel: {
            fontSize: `${12 / 16}rem`
        }
    };
}

function CharacterItems({ classes, theme }) {
    const { characterItems, iconUrl, realm } = useSelector(
        state => ({
            characterItems: characterDataIncompleteItemsSelector(state),
            realm: characterRealmSelector(state),
            iconUrl: environmentIconUrlSelector(state)
        }),
        shallowEqual
    );
    if (!characterItems) {
        return <div />;
    }

    const ids = characterItems.reduce(
        (acc, curr) => (curr.guid ? [...acc, curr.guid] : acc),
        []
    );

    return (
        <TitledContainer title="Items">
            <List>
                {characterItems.map(
                    item =>
                        item.name && (
                            <React.Fragment key={item.guid}>
                                <CharacterItemTooltip
                                    id={item.guid}
                                    realm={realm}
                                    ids={ids}
                                >
                                    <ListItem>
                                        <Grid container wrap="nowrap">
                                            <Grid
                                                item
                                                className={
                                                    classes.iconContainer
                                                }
                                            >
                                                <div
                                                    className={classes.icon}
                                                    style={{
                                                        backgroundImage: `url(${iconUrl}/medium/${item.icon}.png)`,
                                                        borderColor:
                                                            theme.palette
                                                                .qualityColors[
                                                                item.rarity
                                                            ]
                                                    }}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                className={
                                                    classes.textContainer
                                                }
                                            >
                                                <div
                                                    style={{
                                                        overflow: "hidden"
                                                    }}
                                                >
                                                    <Typography
                                                        className={
                                                            classes.itemName
                                                        }
                                                        style={{
                                                            color: theme.palette
                                                                .qualityColors[
                                                                item.rarity
                                                            ]
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <Typography
                                                        color="textSecondary"
                                                        className={
                                                            classes.itemLevel
                                                        }
                                                    >
                                                        {item.ilevel}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </CharacterItemTooltip>
                                <Divider />
                            </React.Fragment>
                        )
                )}
            </List>
        </TitledContainer>
    );
}

export default withStyles(styles)(withTheme(CharacterItems));
