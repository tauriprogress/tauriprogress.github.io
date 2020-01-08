import { characterClasses } from "tauriprogress-constants";
import React from "react";

import { withStyles, withTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import SpecImg from "../SpecImg";

import { classImg } from "../../helpers";

function styles(theme) {
    return {
        container: {
            textAlign: "center",
            margin: theme.spacing(1),
            marginTop: theme.spacing(6),
            borderRadius: "4px",
            minWidth: "200px",
            maxWidth: "260px",
            boxShadow: theme.shadows[1],
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
                marginTop: theme.spacing(1)
            }
        },
        charContainer: {
            margin: `0 ${theme.spacing(1)}px`,
            padding: theme.spacing(1)
        },
        barContainer: {
            flex: 1
        },
        bar: {
            height: "35px",
            margin: "1px 0",
            position: "relative",
            borderLeft: "1px solid rgba(0, 0, 0, 0.4)",
            "&:before": {
                position: "absolute",
                top: "0",
                left: "0",
                display: "block",
                height: "100%",
                width: "100%",
                content: "''",
                background:
                    "linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(100, 100, 100, 0.2) 100%)"
            }
        },
        classImg: {
            marginRight: theme.spacing(0.5),
            height: "24px",
            width: "24px",
            transform: "translate(0, 6px)"
        }
    };
}

function GuildRosterChart({ classes, theme, classInfo, maxClassCount }) {
    return (
        <Card className={classes.container}>
            <div className={classes.charContainer}>
                <Typography variant="h6">Class Distribution</Typography>

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
                                        ></Grid>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Card>
    );
}

export default withStyles(styles)(withTheme(GuildRosterChart));
