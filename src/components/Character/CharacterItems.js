import React from "react";

import { useSelector } from "react-redux";

import { withStyles, withTheme } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import CharacterItemTooltip from "./CharacterItemTooltip";
import SideCard from "../SideCard";

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
        listItem: {
            padding: theme.spacing(0.5)
        },
        textContainer: {
            alignItems: "center",
            display: "flex",
            overflow: "hidden",
            padding: `0 ${theme.spacing(0.5)}px`
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
    const { data, iconUrl } = useSelector(state => ({
        data: state.character.data.data,
        iconUrl: state.environment.urls.icon
    }));
    if (!data) {
        return <div />;
    }

    const ids = data.characterItems.reduce(
        (acc, curr) => (curr.guid ? [...acc, curr.guid] : acc),
        []
    );

    return (
        <SideCard title="Items">
            <List>
                {data.characterItems.map(
                    item =>
                        item.name && (
                            <React.Fragment key={item.name}>
                                <CharacterItemTooltip
                                    id={item.guid}
                                    realm={data.realm}
                                    ids={ids}
                                >
                                    <ListItem className={classes.listItem}>
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
                                                            color:
                                                                theme.palette
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
        </SideCard>
    );
}

export default withStyles(styles)(withTheme(CharacterItems));
