import React from "react";

import { shallowEqual, useSelector } from "react-redux";

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
    environmentIconUrlSelector,
} from "../../redux/selectors";
import { styled, useTheme } from "@mui/material";

const Icon = styled("div")(() => ({
    position: "relative",
    lineHeight: 1,
    width: "36px",
    height: "36px",
    border: "1px solid #333",
    backgroundSize: "123% 123%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
}));

const TextContainer = styled(Grid)(({ theme }) => ({
    alignItems: "center",
    display: "flex",
    overflow: "hidden",
    padding: `0 ${theme.spacing(0.5)}`,
}));
const ItemName = styled(Typography)(() => ({
    lineHeight: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const ItemLevel = styled(Typography)(() => ({
    fontSize: `${12 / 16}rem`,
}));

function CharacterItems() {
    const theme = useTheme();
    const { characterItems, iconUrl, realm } = useSelector(
        (state) => ({
            characterItems: characterDataIncompleteItemsSelector(state),
            realm: characterRealmSelector(state),
            iconUrl: environmentIconUrlSelector(state),
        }),
        shallowEqual
    );
    if (!characterItems) {
        return <div />;
    }

    return (
        <TitledContainer title="Items">
            <List>
                {characterItems.map(
                    (item) =>
                        item.name && (
                            <React.Fragment key={item.guid}>
                                <CharacterItemTooltip
                                    itemMeta={item}
                                    realm={realm}
                                >
                                    <ListItem>
                                        <Grid container wrap="nowrap">
                                            <Grid item>
                                                <Icon
                                                    style={{
                                                        backgroundImage: `url(${iconUrl}/medium/${item.icon}.png)`,
                                                        borderColor:
                                                            theme.palette
                                                                .qualityColors[
                                                                item.rarity
                                                            ],
                                                    }}
                                                />
                                            </Grid>
                                            <TextContainer item>
                                                <div
                                                    style={{
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <ItemName
                                                        style={{
                                                            color: theme.palette
                                                                .qualityColors[
                                                                item.rarity
                                                            ],
                                                        }}
                                                    >
                                                        {item.name}
                                                    </ItemName>
                                                    <ItemLevel color="textSecondary">
                                                        {item.ilevel}
                                                    </ItemLevel>
                                                </div>
                                            </TextContainer>
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

export default CharacterItems;
