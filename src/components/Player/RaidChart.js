import { specs, classToSpec, characterClasses } from "tauriprogress-constants";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";
import { withTheme, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import SelectAll from "@material-ui/icons/SelectAll";
import IconMissing from "@material-ui/icons/NotInterested";
import IconTotal from "@material-ui/icons/BarChart";

import { PerfChartContainer, PerfChartTitle, PerfChartRow } from "../PerfChart";

import { getSpecImg, classImg, shortNumber } from "../../helpers";

function styles(theme) {
    return {
        container: {
            marginTop: "3px",
            width: "280px"
        },
        specIcon: {
            width: "100%",
            height: "100%"
        },
        iconTabContainer: {
            minHeight: "25px !important"
        },
        iconTab: {
            width: "25px",
            height: "25px",
            minWidth: "25px !important",
            minHeight: "25px !important",
            padding: "0px"
        },
        listItem: {
            padding: "0px"
        },
        link: {
            "&:hover *": {
                color: `${theme.palette.secondary.main} !important`
            }
        }
    };
}

function RaidChart({
    data,
    characterClass,
    raidName,
    classes,
    theme,
    variant = "dps"
}) {
    const { classColors } = theme.palette;
    const raids = useSelector(state => state.raidInfo.raids);

    const [spec, setSpec] = useState("noSpec");

    const raidBosses = raids[raidName].encounters;

    let iconSpecs = [];

    for (let charSpec of classToSpec[characterClass]) {
        if (specs[charSpec][`is${variant === "dps" ? "Dps" : "Healer"}`]) {
            iconSpecs.push(specs[charSpec]);
        }
    }

    return (
        <PerfChartContainer className={classes.container}>
            <PerfChartTitle>
                <Grid container wrap="nowrap" justify="space-between">
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
                                value="noSpec"
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
                                        title={characterClasses[characterClass]}
                                    >
                                        <img
                                            className={classes.specIcon}
                                            src={classImg(characterClass)}
                                            alt=""
                                        />
                                    </Tooltip>
                                }
                            />

                            {iconSpecs.map(specInfo => (
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
                    rank={""}
                    title={"Total"}
                    perfValue={shortNumber(data.total[spec][variant][variant])}
                    perfPercent={data.total[spec][variant].topPercent || 0}
                    color={"#48698c"}
                />
            ) : (
                <PerfChartRow
                    Icon={<IconMissing />}
                    iconTitle={"no spec"}
                    rank={""}
                    title={"Total"}
                    perfValue={shortNumber(0)}
                    perfPercent={0}
                    color={"#48698c"}
                />
            )}

            {raidBosses.map(boss => {
                const currentBoss = data[boss.encounter_name][spec];
                const playerData = currentBoss[variant];

                return (
                    <React.Fragment key={boss.encounter_name}>
                        {playerData[variant] ? (
                            <Link
                                to={`/log/${playerData.logId}?realm=${playerData.realm}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                component={RouterLink}
                                className={classes.link}
                            >
                                <PerfChartRow
                                    Icon={
                                        <img
                                            src={getSpecImg(
                                                specs[playerData.spec].image
                                            )}
                                            alt=""
                                        />
                                    }
                                    iconTitle={specs[playerData.spec].label}
                                    rank={playerData.rank}
                                    title={boss.encounter_name}
                                    perfValue={shortNumber(playerData[variant])}
                                    perfPercent={playerData.topPercent}
                                    color={
                                        classColors[playerData.class].background
                                    }
                                />
                            </Link>
                        ) : (
                            <PerfChartRow
                                Icon={<IconMissing />}
                                iconTitle={"no spec"}
                                rank={""}
                                title={boss.encounter_name}
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
