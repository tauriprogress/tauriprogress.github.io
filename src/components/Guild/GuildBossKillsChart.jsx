import React from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

import Help from "@mui/icons-material/Help";

import {
    days as dayLabels,
    hours as hourLabels,
    shiftDays,
    colorWeight,
} from "../../helpers";
import { useTheme } from "@mui/material";
import { styled } from "@mui/material";

const hours = new Array(12).fill(0).map((value, index) => index * 2);
const days = [2, 3, 4, 5, 6, 0, 1];

const Container = styled(Card)(({ theme }) => ({
    width: "280px",
    padding: theme.spacing(1),
    margin: `${theme.spacing(1)} 0`,
    backgroundColor: theme.palette.background.darker,
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: `${16 / 16}rem`,
    margin: `${theme.spacing(1)} 0`,
    paddingLeft: theme.spacing(1),
}));

const HelpIcon = styled(Help)(({ theme }) => ({
    transform: "translate(0, 2px)",
}));

const LabelColumn = styled(Grid)(({ theme }) => ({
    width: "40px",
}));

const LabelTile = styled(Grid)(({ theme }) => ({
    height: "28px",
    margin: "2px 0",
}));

const HoursLabel = styled(Typography)(({ theme }) => ({
    lineHeight: 1,
    textAlign: "right",
    paddingRight: "2px",
    fontSize: `${12 / 16}rem`,
}));

const Column = styled(Grid)(({ theme }) => ({
    flex: 1,
}));

const Tile = styled(Grid)(({ theme }) => ({
    height: "14px",
    margin: "1px",
}));

const Day = styled(Typography)(({ theme }) => ({
    margin: `0 0 ${theme.spacing(1)}`,
    lineHeight: 1,
    textAlign: "center",
}));

function GuildBossKillsChart({ data, title }) {
    const theme = useTheme();

    const max = data.reduce((max, hours) => {
        max = hours.reduce((max, value) => (max > value ? max : value), max);
        return max;
    }, 0);

    return (
        <Container>
            <Title>
                {title} boss kills{" "}
                {title === "Recent" && (
                    <Tooltip title={"Bosses killed in the last 2 weeks"}>
                        <HelpIcon color="disabled" fontSize="small" />
                    </Tooltip>
                )}
            </Title>
            <Grid container wrap="nowrap" justifyContent="center">
                <LabelColumn item>
                    <Grid container direction="column">
                        {hours.map((hour) => (
                            <LabelTile item key={hour}>
                                <HoursLabel>{hourLabels[hour]}</HoursLabel>
                            </LabelTile>
                        ))}
                    </Grid>
                </LabelColumn>
                {days.map((day) => (
                    <Column item key={day}>
                        <Grid container direction="column">
                            {data[day].map((killCount, index) => (
                                <Tooltip
                                    title={`${killCount} boss kills ${
                                        hourLabels[index]
                                    }, ${dayLabels[shiftDays(day)]}`}
                                    key={index}
                                >
                                    <Tile
                                        item
                                        style={{
                                            backgroundColor:
                                                theme.palette.weightColors[
                                                    colorWeight(killCount, max)
                                                ],
                                        }}
                                    />
                                </Tooltip>
                            ))}
                        </Grid>
                        <Day>{dayLabels[shiftDays(day)].slice(0, 3)}</Day>
                    </Column>
                ))}
            </Grid>
        </Container>
    );
}

export default GuildBossKillsChart;
