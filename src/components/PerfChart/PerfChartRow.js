import React from "react";
import { withStyles, withTheme } from "@material-ui/styles";

import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

function styles(theme) {
    return {
        container: {
            height: "30px",
            minWidth: "260px",
            maxWidth: "100%"
        },
        icon: {
            width: "30px",
            height: "30px"
        },
        typography: {
            lineHeight: "30px",
            padding: `0 ${theme.spacing(1)}px`,
            textShadow: "0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000",
            color: theme.baseColors.light,
            fontWeight: "bold"
        },
        item: {
            overflow: "hidden"
        },
        perfName: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        perfValue: {
            textAlign: "right"
        },
        bar: {
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
                borderTop: "1px solid white",
                zIndex: "-2"
            }
        }
    };
}

function PerfChartRow({
    classes,
    Icon,
    iconTitle,
    title,
    perfValue,
    perfPercent,
    color,
    theme,
    rank = ""
}) {
    return (
        <Grid container className={classes.container} wrap="nowrap">
            <Grid
                item
                className={classes.item}
                style={{
                    minWidth: "30px"
                }}
            >
                <Tooltip title={iconTitle}>
                    {React.cloneElement(Icon, {
                        className: classes.icon,
                        alt: iconTitle
                    })}
                </Tooltip>
            </Grid>

            <Grid
                item
                className={`${classes.item} ${classes.bar}`}
                style={{
                    background: `linear-gradient(to right, ${color} ${
                        perfPercent || 0
                    }%, ${theme.palette.background.accent} ${
                        perfPercent || 0
                    }%)`
                }}
            >
                <Grid container wrap="nowrap" justify="space-between">
                    <Grid item className={classes.item}>
                        <Typography
                            className={`${classes.typography} ${classes.perfName}`}
                        >
                            {rank && `${rank}.`} {title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        style={{
                            width: "125px",
                            minWidth: "125px"
                        }}
                    >
                        <Typography
                            className={`${classes.typography} ${classes.perfValue}`}
                        >
                            {perfValue} ({perfPercent.toFixed(1)} %)
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withStyles(styles)(withTheme(PerfChartRow));
