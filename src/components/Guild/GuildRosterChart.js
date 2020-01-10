import { characterClasses } from "tauriprogress-constants";
import React from "react";

import { withStyles, withTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import SpecImg from "../SpecImg";
import SideCard from "../SideCard";

import { classImg } from "../../helpers";

function styles(theme) {
    return {
        container: {
            marginTop: theme.spacing(6),
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                marginTop: theme.spacing(1)
            },
            height: "480px"
        },
        charContainer: {
            margin: `0 ${theme.spacing(1)}px`,
            padding: theme.spacing(1)
        },
        barContainer: {
            flex: 1
        },
        bar: {
            height: "38px",
            position: "relative",
            borderBottom: `1px solid ${theme.palette.background.accent}`,
            display: "flex",
            alignItems: "center",
            "& > p": {
                paddingLeft: theme.spacing(1),
                fontWeight: "bold",
                color: theme.baseColors.light,
                textShadow:
                    "0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000"
            },
            "&:before": {
                position: "absolute",
                top: "0",
                left: "0",
                display: "block",
                height: "100%",
                width: "100%",
                content: "''",
                background:
                    "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(100, 100, 100, 0.2) 100%)"
            }
        },
        classImg: {
            marginRight: theme.spacing(0.5),
            height: "24px",
            width: "24px",
            transform: "translate(0, 7px)"
        }
    };
}

function GuildRosterChart({
    classes,
    theme,
    totalChars,
    classInfo,
    maxClassCount
}) {
    return (
        <SideCard title={"Class Distribution"} className={classes.container}>
            <div className={classes.charContainer}>
                <Grid
                    container
                    wrap="nowrap"
                    justify="space-between"
                    direction="column"
                >
                    {classInfo.map(charClass => (
                        <Grid item key={charClass.classId}>
                            <Grid container wrap="nowrap">
                                <Grid item>
                                    <SpecImg
                                        className={classes.classImg}
                                        src={classImg(charClass.classId)}
                                        title={
                                            characterClasses[charClass.classId]
                                        }
                                    />
                                </Grid>
                                <Grid item className={classes.barContainer}>
                                    <Tooltip
                                        placement={"left"}
                                        title={
                                            <span>{`${charClass.count} ${
                                                characterClasses[
                                                    charClass.classId
                                                ]
                                            }`}</span>
                                        }
                                    >
                                        <Grid
                                            item
                                            className={classes.bar}
                                            style={{
                                                width: `${(charClass.count /
                                                    maxClassCount) *
                                                    100}%`,
                                                backgroundColor:
                                                    theme.palette.classColors[
                                                        charClass.classId
                                                    ].background
                                            }}
                                        >
                                            <Typography>
                                                {Math.floor(
                                                    (charClass.count /
                                                        totalChars) *
                                                        100
                                                )}
                                                %
                                            </Typography>
                                        </Grid>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </SideCard>
    );
}

export default withStyles(styles)(withTheme(GuildRosterChart));
