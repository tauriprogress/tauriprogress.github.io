import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { characterClassSpecs } from "tauriprogress-constants";

import IconTotal from "@mui/icons-material/BarChart";
import IconMissing from "@mui/icons-material/NotInterested";
import SelectAll from "@mui/icons-material/SelectAll";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import LogLink from "../LogLink";
import { PerfChartContainer, PerfChartRow, PerfChartTitle } from "../PerfChart";

import {
    environmentCharacterSpecsSelector,
    environmentDifficultyNamesSelector,
    environmentRaidsSelector,
} from "../../redux/selectors";

import {
    capitalize,
    getClassImg,
    getSpecImg,
    shortNumber,
} from "../../helpers";

import { styled, useTheme } from "@mui/material";

const Container = styled(PerfChartContainer)(({ theme }) => ({
    marginTop: theme.spacing(3),
    maxWidth: "300px",
    minWidth: "260px",
    width: "100%",
}));

const CustomSelectAll = styled(SelectAll)(({ theme }) => ({
    maxWidth: "100%",
    maxHeight: "100%",
}));
const IconTabContainer = styled(Tabs)(({ theme }) => ({
    minHeight: "35px !important",
    "& .MuiTabs-flexContainer": {
        justifyContent: "space-around",
    },
}));
const IconTab = styled(Tab)(({ theme }) => ({
    maxWidth: "40px !important",
    minWidth: "25px !important",
    minHeight: "35px !important",
    padding: "0px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}));
const Link = styled(LogLink)(({ theme }) => ({
    "&:hover *": {
        color: `${theme.palette.secondary.main} !important`,
    },
}));

function RaidChart({
    data,
    difficulty,
    characterClass,
    raidName,
    variant = "dps",
}) {
    const theme = useTheme();
    const { classColors } = theme.palette;
    const { raids, specs, difficultyNames } = useSelector(
        (state) => ({
            raids: environmentRaidsSelector(state),
            specs: environmentCharacterSpecsSelector(state),
            difficultyNames: environmentDifficultyNamesSelector(state),
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
        <Container>
            <PerfChartTitle>
                <Grid container direction={"column"}>
                    <Grid item>
                        <Typography variant="h5">
                            {difficultyNames[difficulty]}{" "}
                            {variant === "dps" ? "Damage" : "Heal"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconTabContainer
                            value={spec}
                            onChange={(e, spec) => setSpec(spec)}
                            variant="fullWidth"
                            indicatorColor="secondary"
                        >
                            <IconTab
                                value="all"
                                icon={
                                    <Tooltip title="All specs">
                                        <CustomSelectAll alt="" />
                                    </Tooltip>
                                }
                            />

                            <IconTab
                                value="class"
                                style={{
                                    backgroundImage: `url(${getClassImg(
                                        characterClass
                                    )})`,
                                }}
                            />

                            {iconSpecs.map((specInfo) => (
                                <IconTab
                                    key={specInfo.id}
                                    value={specInfo.id}
                                    style={{
                                        backgroundImage: `url(${getSpecImg(
                                            specInfo.image
                                        )})`,
                                    }}
                                />
                            ))}
                        </IconTabContainer>
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
                            <Link
                                logId={characterData.logId}
                                realm={characterData.realm}
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
                            </Link>
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
        </Container>
    );
}

export default RaidChart;
