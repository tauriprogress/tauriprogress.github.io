import { characterClasses } from "tauriprogress-constants";
import React from "react";

import { withStyles, withTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import SpecImg from "../SpecImg";

import { classImg } from "../../helpers";

function styles(theme) {
    return {
        container: {
            textAlign: "center",
            margin: theme.spacing(1),
            maxWidth: "180px",
            borderRadius: "3px",
            backgroundColor: theme.palette.background.accent,
            boxShadow: theme.shadows[1]
        },
        charContainer: {
            margin: "0 10px",
            padding: "10px 10px"
        },
        bar: {
            height: "30px",
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
            marginRight: "5px",
            height: "25px",
            width: "25px",
            transform: "translate(0, 4px)"
        }
    };
}

function GuildRosterChart({ classes, theme, classInfo, maxClassCount }) {
    const maxWidth = 160;

    return (
        <div className={classes.container}>
            <div className={classes.charContainer}>
                <Typography variant="h6">Class Distribution</Typography>

                <Grid
                    container
                    wrap="nowrap"
                    style={{ width: `${maxWidth}px` }}
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
                                <Grid item>
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
                                                    (maxWidth - 50)}px`,
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
        </div>
    );
}

export default withStyles(styles)(withTheme(GuildRosterChart));
