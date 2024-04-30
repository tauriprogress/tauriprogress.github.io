import React from "react";

import { shallowEqual, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import CharacterItemTooltip from "./CharacterItemTooltip";
import CharacterStats from "./CharacterStats";
import {
    characterRealmSelector,
    characterDataIncompleteItemsSelector,
    environmentIconUrlSelector,
} from "../../redux/selectors";

import { Tooltip, styled, useTheme } from "@mui/material";
import { capitalize, getInventorySlotImg } from "../../helpers";

const ItemIcon = styled("div")(() => ({
    width: "50px",
    height: "50px",
    display: "block",
    border: "1px solid #222",
    backgroundSize: "115% 115%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
}));

const InventoryItemContainer = styled(Grid)(({ theme }) => ({
    margin: `${theme.spacing(0.25)} ${theme.spacing(0.5)}`,
}));

const ItemNameContainer = styled(Grid)(({ theme }) => ({
    alignItems: "center",
    display: "flex",
    overflow: "hidden",
    padding: `0 ${theme.spacing(0.5)}`,
    "@media only screen and (max-width: 1250px)": {
        display: "none",
    },
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

const UpperItemsContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    flexWrap: "nowrap",
    padding: theme.spacing(3),
}));

const StatsContainer = styled(Grid)(() => ({
    flex: 1,
    maxWidth: "400px",
    minWidth: "180px",
}));

const leftPanelIndecies = [0, 8];
const rightPanelIndecies = [8, 16];
const weaponPanelIndecies = [16, 18];

const inventorySlotNames = [
    "head",
    "neck",
    "shoulder",
    "back",
    "chest",
    "shirt",
    "tabard",
    "wrists",
    "hands",
    "waist",
    "legs",
    "feet",
    "finger",
    "finger",
    "trinket",
    "trinket",
    "mainhand",
    "secondaryhand",
];

function CharacterItems() {
    const { characterItems } = useSelector(
        (state) => ({
            characterItems: characterDataIncompleteItemsSelector(state),
        }),
        shallowEqual
    );

    function getItems(index1, index2) {
        return (characterItems && characterItems.slice(index1, index2)) || [];
    }

    return (
        <Grid container>
            <UpperItemsContainer container>
                <Grid item>
                    <ItemsPanel
                        inventorySlots={inventorySlotNames.slice(
                            leftPanelIndecies[0],
                            leftPanelIndecies[1]
                        )}
                        items={getItems(
                            leftPanelIndecies[0],
                            leftPanelIndecies[1]
                        )}
                    />
                </Grid>
                <StatsContainer item>
                    <CharacterStats />
                </StatsContainer>
                <Grid item>
                    <ItemsPanel
                        inventorySlots={inventorySlotNames.slice(
                            rightPanelIndecies[0],
                            rightPanelIndecies[1]
                        )}
                        items={getItems(
                            rightPanelIndecies[0],
                            rightPanelIndecies[1]
                        )}
                        alignLeft
                    />
                </Grid>
            </UpperItemsContainer>
            <Grid container>
                <ItemsPanel
                    inventorySlots={inventorySlotNames.slice(
                        weaponPanelIndecies[0],
                        weaponPanelIndecies[1]
                    )}
                    items={getItems(
                        weaponPanelIndecies[0],
                        weaponPanelIndecies[1]
                    )}
                    horizontal
                />
            </Grid>
        </Grid>
    );
}

function ItemsPanel({ horizontal, inventorySlots, items, alignLeft }) {
    const theme = useTheme();
    const qualityColors = theme.palette.qualityColors;

    const { iconUrl, realm } = useSelector(
        (state) => ({
            iconUrl: environmentIconUrlSelector(state),
            realm: characterRealmSelector(state),
        }),
        shallowEqual
    );
    return (
        <Grid
            container
            direction={horizontal ? "row" : "column"}
            justifyContent={"center"}
        >
            {inventorySlots.map((slotName, index) => {
                const item = items[index] && items[index].name && items[index];

                const DisplayTooltip = ({ children }) => {
                    return item ? (
                        <CharacterItemTooltip
                            itemMeta={item}
                            realm={realm}
                            placement={alignLeft ? "left" : "right"}
                        >
                            {children}
                        </CharacterItemTooltip>
                    ) : (
                        <Tooltip title={capitalize(slotName)} component="span">
                            {children}
                        </Tooltip>
                    );
                };
                return (
                    <InventoryItemContainer item key={slotName + index}>
                        <Grid
                            container
                            wrap="nowrap"
                            flexDirection={
                                alignLeft || (horizontal && index === 0)
                                    ? "row-reverse"
                                    : "row"
                            }
                        >
                            <Grid item>
                                <DisplayTooltip>
                                    <ItemIcon
                                        style={{
                                            backgroundImage: item
                                                ? `url(${iconUrl}/large/${item.icon}.png)`
                                                : `url(${getInventorySlotImg(
                                                      slotName
                                                  )})`,
                                            borderColor: item
                                                ? qualityColors[item.rarity]
                                                : "#333",
                                        }}
                                    />
                                </DisplayTooltip>
                            </Grid>
                            {item && (
                                <ItemNameContainer item>
                                    <div
                                        style={{
                                            overflow: "hidden",
                                        }}
                                    >
                                        <ItemName
                                            style={{
                                                color: theme.palette
                                                    .qualityColors[item.rarity],
                                            }}
                                        >
                                            {item.name}
                                        </ItemName>
                                        <ItemLevel
                                            color="textSecondary"
                                            style={{
                                                textAlign:
                                                    alignLeft ||
                                                    (horizontal && index === 0)
                                                        ? "right"
                                                        : "left",
                                            }}
                                        >
                                            {item.ilevel}
                                        </ItemLevel>
                                    </div>
                                </ItemNameContainer>
                            )}
                        </Grid>
                    </InventoryItemContainer>
                );
            })}
        </Grid>
    );
}

export default CharacterItems;
