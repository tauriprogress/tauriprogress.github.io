import React from "react";
import { useSelector } from "react-redux";

import { withStyles, withTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import Avatar from "../Avatar";
import TitledContainer from "../TitledContainer";

import { classImg } from "../../helpers";

function styles(theme) {
    return {
        container: {
            height: "480px",
            display: "flex",
            flexDirection: "column"
        },
        charContainer: {
            margin: `0 ${theme.spacing(1)}px`,
            padding: theme.spacing(1),
            flex: 1,
            display: "flex",
            alignItems: "center"
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
                    "0 0 2px #000,0 0 2px #000,0 0 2px #000,0 0 2px #000",
                zIndex: 2
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
            height: "30px",
            width: "30px",
            transform: "translate(0, 3px)"
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
    const characterClassNames = useSelector(
        state => state.environment.characterClassNames
    );
    return (
        <TitledContainer
            title={"Class Distribution"}
            className={classes.container}
        >
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
                                    <Avatar
                                        className={classes.classImg}
                                        src={classImg(charClass.classId)}
                                        title={
                                            characterClassNames[
                                                charClass.classId
                                            ] || ""
                                        }
                                    />
                                </Grid>
                                <Grid item className={classes.barContainer}>
                                    <Tooltip
                                        placement={"left"}
                                        title={
                                            <span>{`${charClass.count} ${
                                                characterClassNames[
                                                    charClass.classId
                                                ]
                                            }`}</span>
                                        }
                                    >
                                        <Grid
                                            item
                                            className={classes.bar}
                                            style={{
                                                width: `${
                                                    (charClass.count /
                                                        maxClassCount) *
                                                    100
                                                }%`,
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
        </TitledContainer>
    );
}

export default withStyles(styles)(withTheme(GuildRosterChart));
