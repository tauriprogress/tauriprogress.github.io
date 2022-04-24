import { itemSlotNames } from "tauriprogress-constants";
import React from "react";

import withStyles from '@mui/styles/withStyles';
import withTheme from '@mui/styles/withTheme';

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { numberWithCommas } from "../../helpers";

function styles(theme) {
    return {
        text: {
            fontSize: "inherit",
            lineHeight: 1,
            margin: "2px 0"
        },
        textGreen: {
            color: "#1EFF00"
        },
        textYellow: {
            color: "#FFD100"
        },
        textLightYellow: {
            color: "#FFFF98"
        },
        textWhite: {
            color: "#FFFFFF"
        },
        textGrey: {
            color: "#9d9d9d"
        },
        socketIcon: {
            width: "14px",
            height: "14px",
            transform: "translate(0, 3px)",
            marginRight: "2px"
        },
        setItem: {
            marginLeft: "4px"
        },
        containerMarginTop: {
            marginTop: "20px"
        },
        containerMargin: {
            margin: "20px 0"
        }
    };
}

function ItemTooltipText({ classes, theme, item, iconUrl }) {
    return (
        <React.Fragment>
            <Typography
                className={classes.text}
                style={{
                    color: theme.qualityColors[item.Quality]
                }}
            >
                {item.name}
            </Typography>
            <Typography className={`${classes.text} ${classes.textGreen}`}>
                {item.itemnamedescription}
            </Typography>
            {item.ItemLevel && (
                <Typography className={`${classes.text} ${classes.textYellow}`}>
                    Item Level {item.ItemLevel}
                </Typography>
            )}
            {item.upgrademaxlevel > 0 && (
                <Typography className={`${classes.text} ${classes.textYellow}`}>
                    Upgrade Level: {item.upgradelevel}/{item.upgrademaxlevel}
                </Typography>
            )}

            <Typography className={`${classes.text} ${classes.textWhite}`}>
                {item.bonding}
            </Typography>
            <Typography className={`${classes.text} ${classes.textWhite}`}>
                {item.item_equip}
            </Typography>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <Typography
                        className={`${classes.text} ${classes.textWhite}`}
                    >
                        {itemSlotNames[item.InventoryType]}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        className={`${classes.text} ${classes.textWhite}`}
                    >
                        {item.m_subClassName !== "Miscellaneous" &&
                            item.m_subClassName}
                    </Typography>
                </Grid>
            </Grid>
            {item.Armory > 0 && (
                <Typography className={`${classes.text} ${classes.textWhite}`}>
                    {numberWithCommas(item.Armory)} Armor
                </Typography>
            )}

            {item.BaseMaxDamage > 0 && (
                <React.Fragment>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography
                                className={`${classes.text} ${classes.textWhite}`}
                            >
                                {numberWithCommas(item.BaseMinDamage)} -{" "}
                                {numberWithCommas(item.BaseMaxDamage)}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                className={`${classes.text} ${classes.textWhite}`}
                            >
                                Speed {(item.Delay / 1000).toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography
                        className={`${classes.text} ${classes.textWhite}`}
                    >
                        (
                        {numberWithCommas(
                            Math.round(
                                item.BaseMinDamage +
                                    (item.BaseMaxDamage / 2 / item.Delay) * 1000
                            )
                        )}{" "}
                        damage per second)
                    </Typography>
                </React.Fragment>
            )}
            {item.ItemStat.map(stat =>
                stat.value ? (
                    <Typography
                        key={stat.type}
                        className={`${classes.text} ${
                            stat.type > 7
                                ? classes.textGreen
                                : classes.textWhite
                        }`}
                    >
                        {numberWithCommas(
                            decodeURIComponent(stat.StatDescription)
                        )}
                    </Typography>
                ) : null
            )}

            <div className={classes.containerMargin}>
                {item.pernamentEnchDesc && (
                    <Typography
                        className={`${classes.text} ${classes.textGreen}`}
                    >
                        Enchanted: {decodeURIComponent(item.pernamentEnchDesc)}
                    </Typography>
                )}
                {item.socketInfo.sockets.map((socket, index) => (
                    <Typography
                        key={index}
                        className={`${classes.text} ${classes.textWhite}`}
                    >
                        <img
                            src={
                                socket.gem
                                    ? `${iconUrl}${socket.gem.icon}`
                                    : socket.icon
                            }
                            alt=""
                            className={classes.socketIcon}
                        />
                        {socket.gem ? socket.gem.desc : socket.desc}
                    </Typography>
                ))}
                {item.socketInfo.desc && (
                    <Typography
                        className={`${classes.text} ${
                            item.socketInfo.bonusCompleted
                                ? classes.textGreen
                                : classes.textGrey
                        }`}
                    >
                        Socket bonus: {item.socketInfo.desc}
                    </Typography>
                )}
                {item.useenchantment && (
                    <Typography
                        className={`${classes.text} ${classes.textGreen}`}
                    >
                        Use: {item.useenchantment}
                    </Typography>
                )}
            </div>
            {item.MaxDurability > 0 && (
                <Typography className={`${classes.text} ${classes.textWhite}`}>
                    Durability: {`${item.curDurability}/${item.MaxDurability}`}
                </Typography>
            )}
            {item.classes !== "" && (
                <Typography className={`${classes.text} ${classes.textWhite}`}>
                    Classes: {item.classes}
                </Typography>
            )}
            {item.RequiredLevel > 0 && (
                <Typography className={`${classes.text} ${classes.textWhite}`}>
                    Requires level {item.RequiredLevel}
                </Typography>
            )}

            {item.ItemSetInfo.base && item.set && (
                <div className={classes.containerMarginTop}>
                    <Typography
                        className={`${classes.text} ${classes.textYellow}`}
                    >{`${item.ItemSetInfo.base.name}(${item.set.equipCount}/${item.set.items.length})`}</Typography>
                    {item.set.items.map((setItem, index) => (
                        <Typography
                            key={index}
                            className={`${classes.text} ${classes.setItem} ${
                                setItem.equipped
                                    ? classes.textLightYellow
                                    : classes.textGrey
                            }`}
                        >
                            {setItem.name}
                        </Typography>
                    ))}
                    {item.set.effects.length && (
                        <div className={classes.containerMarginTop}>
                            {item.set.effects.map((effect, index) => (
                                <Typography
                                    key={index}
                                    className={`${classes.text} ${
                                        effect.threshold <= item.set.equipCount
                                            ? classes.textGreen
                                            : classes.textGrey
                                    }`}
                                >
                                    {`(${effect.threshold}) Set: ${effect.spell}`}
                                </Typography>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {item.SpellId.length ? (
                <div className={classes.containerMarginTop}>
                    {item.SpellId.map((spell, index) =>
                        spell !== "" ? (
                            <Typography
                                key={index}
                                className={`${classes.text} ${classes.textGreen}`}
                            >
                                Equip: {spell.replace("0rocrppm.", "")}
                            </Typography>
                        ) : null
                    )}
                </div>
            ) : null}
        </React.Fragment>
    );
}

export default withStyles(styles)(withTheme(ItemTooltipText));
