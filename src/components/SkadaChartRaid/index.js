import { specs } from "tauriprogress-constants";
import React from "react";
import { connect } from "react-redux";

import { withTheme, withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconMissing from "@material-ui/icons/NotInterested";

import LogLink from "../LogLink";

import { getSpecImg } from "../DisplayRaid/helpers";
import { shortNumber } from "./helpers";
import { Typography, Tooltip } from "@material-ui/core";

function styles() {
    return {
        listItem: {
            padding: "0px"
        }
    };
}

function SkadaChartRaid({
    data,
    raidName,
    classes,
    theme,
    raids,
    variant = "dps"
}) {
    const { defaultClassColors } = theme.palette;
    const raidBosses = raids[raidName].encounters;
    return (
        <List disablePadding className="skadaChart">
            {raidBosses.map(boss => {
                const currentBoss = data[boss.encounter_name];
                const playerData = currentBoss[variant];
                return (
                    <ListItem
                        component="li"
                        key={boss.encounter_name}
                        className={classes.listItem}
                    >
                        <Typography className="skadaChartBoss">
                            {playerData[variant] ? (
                                <Tooltip title={specs[playerData.spec].label}>
                                    <img
                                        src={getSpecImg(
                                            specs[playerData.spec].image
                                        )}
                                        alt=""
                                        className="skadaChartSpecIcon"
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip title="No data">
                                    <IconMissing className="skadaChartSpecIcon" />
                                </Tooltip>
                            )}

                            <span
                                className="skadaChartValues"
                                style={{
                                    background:
                                        playerData[variant] &&
                                        `linear-gradient(to right, ${
                                            defaultClassColors[playerData.class]
                                        } ${playerData.topPercentage}%, #222 ${
                                            playerData.topPercentage
                                        }%)`
                                }}
                            >
                                <span className="skadaChartRank">
                                    {playerData.rank && `${playerData.rank}.`}{" "}
                                    <span className="skadaChartBossName">
                                        {boss.encounter_name}
                                    </span>
                                </span>
                                <span className="skadaChartPerformanceValue">
                                    {playerData[variant] && (
                                        <React.Fragment>
                                            <span className="direct">
                                                {`${shortNumber(
                                                    playerData[variant]
                                                )}`}
                                            </span>
                                            {` (${playerData.topPercentage.toFixed(
                                                1
                                            )}%)`}
                                        </React.Fragment>
                                    )}
                                </span>
                            </span>

                            <span className="skadaChartLogContainer">
                                {playerData[variant] && (
                                    <React.Fragment>
                                        <span className="textBold ">
                                            {playerData.ilvl}
                                        </span>
                                        <LogLink
                                            logId={playerData.logId}
                                            realm={playerData.realm}
                                        />
                                    </React.Fragment>
                                )}
                            </span>
                        </Typography>
                    </ListItem>
                );
            })}
        </List>
    );
}

function mapStateToProps(state) {
    return {
        raids: state.raidInfo.raids
    };
}

export default connect(mapStateToProps)(
    withTheme()(withStyles(styles)(SkadaChartRaid))
);
