import React from "react";

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";

import { styled } from "@mui/material";

const GridContainer = styled(Grid)(({ theme }) => ({
    height: "30px",
    minWidth: "260px",
    maxWidth: "100%",
}));

const GridItem = styled(Grid)(({ theme }) => ({
    overflow: "hidden",
}));

const GridBar = styled(GridItem)(({ theme }) => ({
    flex: 1,
    position: "relative",
    zIndex: "-1",
    "&:before": {
        position: "absolute",
        top: "0",
        left: "0",
        display: "block",
        height: "100%",
        width: "100%",
        content: "''",
        background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(100, 100, 100, 0.2) 100%)",
        borderTop: `1px solid ${getBorderTopColor(theme)}`,
        zIndex: "-2",
    },
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
    lineHeight: "30px",
    padding: `0 ${theme.spacing(1)}`,
    textShadow: "0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000",
    color: getTextColor(theme),
    fontWeight: "bold",
}));

const PerformanceName = styled(CustomTypography)(({ theme }) => ({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const PerformanceValue = styled(CustomTypography)(({ theme }) => ({
    textAlign: "right",
}));

function getBorderTopColor(theme) {
    return theme.palette.mode === "dark" ? "black" : "white";
}

function getTextColor(theme) {
    return theme.palette.mode === "dark"
        ? theme.palette.text.primary
        : theme.palette.primary.contrastText;
}

function PerfChartRow({
    Icon,
    iconTitle,
    title,
    perfValue,
    perfPercent,
    color,
    rank = "",
    displayPercent = true,
}) {
    const theme = useTheme();

    return (
        <GridContainer container wrap="nowrap">
            <GridItem
                item
                style={{
                    minWidth: "30px",
                }}
            >
                <Tooltip title={iconTitle}>
                    {React.cloneElement(Icon, {
                        style: {
                            width: "30px",
                            height: "30px",
                        },
                        alt: iconTitle,
                    })}
                </Tooltip>
            </GridItem>

            <GridBar
                item
                style={{
                    background: `linear-gradient(to right, ${color} ${
                        perfPercent || 0
                    }%, ${theme.palette.background.accent} ${
                        perfPercent || 0
                    }%)`,
                }}
            >
                <Grid container wrap="nowrap" justifyContent="space-between">
                    <GridItem item>
                        <PerformanceName>
                            {rank && `${rank}.`} {title}
                        </PerformanceName>
                    </GridItem>
                    <Grid
                        item
                        style={{
                            width: "125px",
                            minWidth: "125px",
                        }}
                    >
                        <PerformanceValue>
                            {perfValue}{" "}
                            {displayPercent && (
                                <span>({perfPercent.toFixed(1)} %)</span>
                            )}
                        </PerformanceValue>
                    </Grid>
                </Grid>
            </GridBar>
        </GridContainer>
    );
}

export default PerfChartRow;
