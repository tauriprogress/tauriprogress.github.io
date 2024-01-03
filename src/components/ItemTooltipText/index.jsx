import { itemSlotNames } from "tauriprogress-constants";
import React from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { numberWithCommas } from "../../helpers";

import { styled } from "@mui/material";

const greenColor = "#1EFF00";
const yellowColor = "#FFD100";
const lightYellowColor = "#FFFF98";
const greyColor = "#9d9d9d";
const whiteColor = "#FFFFFF";

const Text = styled(Typography)(({ theme }) => ({
    fontSize: "inherit",
    lineHeight: 1,
    margin: "2px 0",
}));

const GreenText = styled(Text)(({ theme }) => ({
    color: greenColor,
}));

const YellowText = styled(Text)(({ theme }) => ({
    color: yellowColor,
}));

const WhiteText = styled(Text)(({ theme }) => ({
    color: whiteColor,
}));

const ItemStat = styled(Text)(({ theme, type }) => ({
    color: type > 7 ? greenColor : whiteColor,
}));

const SocketInfoDesc = styled(Text)(({ theme, valid }) => ({
    color: valid ? greenColor : greyColor,
}));

const SocketInfoSpell = styled(Text)(({ theme, active }) => ({
    color: active ? greenColor : greyColor,
}));

const SocketIcon = styled("img")(({ theme }) => ({
    width: "14px",
    height: "14px",
    transform: "translate(0, 3px)",
    marginRight: "2px",
}));

const SetItem = styled(Text)(({ theme, have }) => ({
    color: have ? lightYellowColor : greyColor,
    marginLeft: "4px",
}));

const ContainerMarginTop = styled("div")(({ theme }) => ({
    marginTop: "20px",
}));

const ItemName = styled(Text)(({ theme, quality }) => ({
    color: theme.qualityColors[quality],
}));

function ItemTooltipText({ item, iconUrl }) {
    if (item.ItemSetInfo.base) {
        item.ItemSetInfo.base.equipped = item.ItemSetInfo.base.Items.reduce(
            (acc, curr) => {
                if (curr.have) {
                    return acc + 1;
                }

                return acc;
            },
            0
        );

        item.ItemSetInfo.base.Spells = item.ItemSetInfo.base.Spells.filter(
            (spell) => spell.threshold
        );
    }

    return (
        <React.Fragment>
            <ItemName quality={item.Quality}>{item.name}</ItemName>
            <GreenText>{item.itemnamedescription}</GreenText>
            {item.ItemLevel && (
                <YellowText>Item Level {item.ItemLevel}</YellowText>
            )}
            {item.upgrademaxlevel > 0 && (
                <YellowText>
                    Upgrade Level: {item.upgradelevel}/{item.upgrademaxlevel}
                </YellowText>
            )}

            <WhiteText>{item.bonding}</WhiteText>
            <WhiteText>{item.item_equip}</WhiteText>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <WhiteText>{itemSlotNames[item.InventoryType]}</WhiteText>
                </Grid>
                <Grid item>
                    <WhiteText>
                        {item.m_subClassName !== "Miscellaneous" &&
                            item.m_subClassName}
                    </WhiteText>
                </Grid>
            </Grid>
            {item.Armory > 0 && (
                <WhiteText>{numberWithCommas(item.Armory)} Armor</WhiteText>
            )}

            {item.BaseMaxDamage > 0 && (
                <React.Fragment>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <WhiteText>
                                {numberWithCommas(item.BaseMinDamage)} -{" "}
                                {numberWithCommas(item.BaseMaxDamage)}
                            </WhiteText>
                        </Grid>
                        <Grid item>
                            <WhiteText>
                                Speed {(item.Delay / 1000).toFixed(2)}
                            </WhiteText>
                        </Grid>
                    </Grid>

                    <WhiteText>
                        (
                        {numberWithCommas(
                            Math.round(
                                item.BaseMinDamage +
                                    (item.BaseMaxDamage / 2 / item.Delay) * 1000
                            )
                        )}{" "}
                        damage per second)
                    </WhiteText>
                </React.Fragment>
            )}
            {item.ItemStat.map((stat) =>
                stat.value ? (
                    <ItemStat key={stat.type} type={stat.type}>
                        {numberWithCommas(
                            decodeURIComponent(stat.StatDescription)
                        )}
                    </ItemStat>
                ) : null
            )}

            <ContainerMarginTop>
                {item.pernamentEnchDesc && (
                    <GreenText>
                        Enchanted: {decodeURIComponent(item.pernamentEnchDesc)}
                    </GreenText>
                )}
                {item.socketInfo.sockets.map((socket, index) => (
                    <WhiteText key={index}>
                        <SocketIcon
                            src={
                                socket.gem
                                    ? `${iconUrl}${socket.gem.icon}`
                                    : socket.icon
                            }
                            alt=""
                        />
                        {socket.gem ? socket.gem.desc : socket.desc}
                    </WhiteText>
                ))}
                {item.socketInfo.desc && (
                    <SocketInfoDesc valid={+item.socketInfo.bonusCompleted}>
                        Socket bonus: {item.socketInfo.desc}
                    </SocketInfoDesc>
                )}
                {item.useenchantment && (
                    <GreenText>Use: {item.useenchantment}</GreenText>
                )}
            </ContainerMarginTop>
            {item.MaxDurability > 0 && (
                <WhiteText>
                    Durability: {`${item.curDurability}/${item.MaxDurability}`}
                </WhiteText>
            )}
            {item.classes !== "" && (
                <WhiteText>Classes: {item.classes}</WhiteText>
            )}
            {item.RequiredLevel > 0 && (
                <WhiteText>Requires level {item.RequiredLevel}</WhiteText>
            )}

            {item.ItemSetInfo.base && (
                <ContainerMarginTop>
                    <YellowText>{`${item.ItemSetInfo.base.name}(${item.ItemSetInfo.base.equipped}/${item.ItemSetInfo.base.Items.length})`}</YellowText>
                    {item.ItemSetInfo.base.Items.map((setItem, index) => (
                        <SetItem key={index} have={+setItem.have}>
                            {setItem.name}
                        </SetItem>
                    ))}
                    {item.ItemSetInfo.base.Spells.length && (
                        <ContainerMarginTop>
                            {item.ItemSetInfo.base.Spells.map(
                                (effect, index) => (
                                    <SocketInfoSpell
                                        key={index}
                                        active={
                                            +(
                                                effect.threshold <=
                                                item.ItemSetInfo.base.equipped
                                            )
                                        }
                                    >
                                        {`(${effect.threshold}) Set: ${effect.spell}`}
                                    </SocketInfoSpell>
                                )
                            )}
                        </ContainerMarginTop>
                    )}
                </ContainerMarginTop>
            )}
            {item.SpellId.length ? (
                <ContainerMarginTop>
                    {item.SpellId.map((spell, index) =>
                        spell !== "" ? (
                            <GreenText key={index}>
                                Equip: {spell.replace("0rocrppm.", "")}
                            </GreenText>
                        ) : null
                    )}
                </ContainerMarginTop>
            ) : null}
        </React.Fragment>
    );
}

export default ItemTooltipText;
