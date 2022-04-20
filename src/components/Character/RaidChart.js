import { characterClassSpecs } from "tauriprogress-constants";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { withTheme, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import SelectAll from "@material-ui/icons/SelectAll";
import IconMissing from "@material-ui/icons/NotInterested";
import IconTotal from "@material-ui/icons/BarChart";

import LogLink from "../LogLink";
import { PerfChartContainer, PerfChartTitle, PerfChartRow } from "../PerfChart";

import {
    environmentRaidsSelector,
    environmentCharacterSpecsSelector,
    environmentCharacterClassNamesSelector,
} from "../../redux/selectors";

import { getSpecImg, classImg, shortNumber, capitalize } from "../../helpers";

function styles(theme) {
    return {
        container: {
            marginTop: "3px",
            width: "280px",
        },
        specIcon: {
            maxWidth: "100%",
            maxHeight: "100%",
        },
        iconTabContainer: {
            minHeight: "25px !important",
        },
        iconTab: {
            width: "25px",
            height: "25px",
            minWidth: "25px !important",
            minHeight: "25px !important",
            padding: "0px",
        },
        listItem: {
            padding: "0px",
        },
        link: {
            "&:hover *": {
                color: `${theme.palette.secondary.main} !important`,
            },
        },
    };
}

function RaidChart({
    data,
    characterClass,
    raidName,
    classes,
    theme,
    variant = "dps",
}) {
    const { classColors } = theme.palette;
    const { raids, specs, characterClassNames } = useSelector(
        (state) => ({
            raids: environmentRaidsSelector(state),
            specs: environmentCharacterSpecsSelector(state),
            characterClassNames: environmentCharacterClassNamesSelector(state),
        }),
        shallowEqual
    );

    const [spec, setSpec] = useState("all");

    const raidBosses = raids.reduce((acc, curr) => {
        if (curr.name === raidName) {
            acc = curr.bosses;
        }
        return acc;
    }, []);

    let iconSpecs = [];

    for (let charSpec of characterClassSpecs[characterClass]) {
        if (
            specs[charSpec] &&
            specs[charSpec][`is${variant === "dps" ? "Dps" : "Healer"}`]
        ) {
            iconSpecs.push(specs[charSpec]);
        }
    }

    return (
        <PerfChartContainer className={classes.container}>
            <PerfChartTitle>
                <Grid container wrap="nowrap" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">
                            {variant === "dps" ? "Damage" : "Heal"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Tabs
                            value={spec}
                            onChange={(e, spec) => setSpec(spec)}
                            variant="fullWidth"
                            className={classes.iconTabContainer}
                        >
                            <Tab
                                className={classes.iconTab}
                                value="all"
                                icon={
                                    <Tooltip title="All specs">
                                        <SelectAll
                                            className={classes.specIcon}
                                            alt=""
                                        />
                                    </Tooltip>
                                }
                            />

                            <Tab
                                className={classes.iconTab}
                                value="class"
                                icon={
                                    <Tooltip
                                        title={
                                            characterClassNames[characterClass]
                                        }
                                    >
                                        <img
                                            className={classes.specIcon}
                                            src={classImg(characterClass)}
                                            alt=""
                                        />
                                    </Tooltip>
                                }
                            />

                            {iconSpecs.map((specInfo) => (
                                <Tab
                                    key={specInfo.id}
                                    value={specInfo.id}
                                    className={classes.iconTab}
                                    icon={
                                        <Tooltip title={specInfo.label}>
                                            <img
                                                className={classes.specIcon}
                                                src={getSpecImg(specInfo.image)}
                                                alt=""
                                            />
                                        </Tooltip>
                                    }
                                />
                            ))}
                        </Tabs>
                    </Grid>
                </Grid>
            </PerfChartTitle>

            {data.total[spec] && data.total[spec][variant] ? (
                <PerfChartRow
                    Icon={<IconTotal />}
                    iconTitle={`Total ${variant} devided by the number of bosses`}
                    title={`${capitalize(variant)} Score`}
                    perfValue={Math.round(data.total[spec][variant])}
                    perfPercent={(data.total[spec][variant] / 6969) * 100}
                    displayPercent={false}
                    color={"#48698c"}
                />
            ) : (
                <PerfChartRow
                    Icon={<IconMissing />}
                    iconTitle={"no spec"}
                    title={`${capitalize(variant)} Score`}
                    perfValue={shortNumber(0)}
                    displayPercent={false}
                    color={"#48698c"}
                />
            )}

            {raidBosses.map((boss) => {
                const currentBoss = data[boss.name][spec];
                const characterData = currentBoss[variant];

                let rank;

                if (characterData.rank) {
                    switch (spec) {
                        case "all":
                            rank = characterData.rank;
                            break;
                        case "class":
                            rank = characterData.cRank;
                            break;
                        default:
                            rank = characterData.sRank;
                    }
                }

                return (
                    <React.Fragment key={boss.name}>
                        {characterData[variant] ? (
                            <LogLink
                                logId={characterData.logId}
                                realm={characterData.realm}
                                className={classes.link}
                            >
                                <PerfChartRow
                                    Icon={
                                        <img
                                            src={getSpecImg(
                                                specs[characterData.spec].image
                                            )}
                                            alt=""
                                        />
                                    }
                                    rank={rank}
                                    iconTitle={specs[characterData.spec].label}
                                    title={boss.name}
                                    perfValue={shortNumber(
                                        characterData[variant]
                                    )}
                                    perfPercent={characterData.performance}
                                    color={
                                        classColors[characterData.class]
                                            .background
                                    }
                                />
                            </LogLink>
                        ) : (
                            <PerfChartRow
                                Icon={
                                    <img src={getSpecImg("undefined")} alt="" />
                                }
                                iconTitle={"No spec"}
                                title={boss.name}
                                perfValue={shortNumber(0)}
                                perfPercent={0}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </PerfChartContainer>
    );
}

export default withStyles(styles)(withTheme(RaidChart));
