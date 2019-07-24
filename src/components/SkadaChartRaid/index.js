import { specs, classToSpec } from "tauriprogress-constants";
import React from "react";
import { connect } from "react-redux";

import { withTheme, withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconMissing from "@material-ui/icons/NotInterested";
import IconTotal from "@material-ui/icons/BarChart";
import SelectAll from "@material-ui/icons/SelectAll";

import LogLink from "../LogLink";

import { getSpecImg, shortNumber } from "../../helpers";
import { Typography, Tooltip } from "@material-ui/core";

function styles() {
    return {
        listItem: {
            padding: "0px"
        }
    };
}

class SkadaChartRaid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spec: "noSpec"
        };
        this.changeSpec = this.changeSpec.bind(this);
    }

    changeSpec(spec) {
        this.setState({ ...this.state, spec: spec });
    }

    render() {
        const {
            data,
            characterClass,
            raidName,
            classes,
            theme,
            raids,
            variant = "dps"
        } = this.props;
        const { spec } = this.state;

        const { defaultClassColors } = theme.palette;
        const raidBosses = raids[raidName].encounters;

        let iconSpecs = [];

        for (let charSpec of classToSpec[characterClass]) {
            if (specs[charSpec][`is${variant === "dps" ? "Dps" : "Healer"}`]) {
                iconSpecs.push(specs[charSpec]);
            }
        }

        return (
            <div className="skadaChart">
                <Typography variant="h5" className="skadaChartTitle">
                    <span>{variant === "dps" ? "Damage" : "Heal"}</span>
                    <span className="skadaChartTitleIcons">
                        <Tooltip title="All specs">
                            <SelectAll
                                className={`skadaChartTitleIcon ${spec ===
                                    "noSpec" && "selected"}`}
                                alt=""
                                onClick={() => this.changeSpec("noSpec")}
                            />
                        </Tooltip>
                        {iconSpecs.map(specInfo => (
                            <Tooltip title={specInfo.label} key={specInfo.id}>
                                <img
                                    src={getSpecImg(specInfo.image)}
                                    className={`skadaChartTitleIcon ${spec ===
                                        specInfo.id && "selected"}`}
                                    alt=""
                                    onClick={() => this.changeSpec(specInfo.id)}
                                />
                            </Tooltip>
                        ))}
                    </span>
                </Typography>
                <List disablePadding>
                    <ListItem component="li" className={classes.listItem}>
                        <Typography className="skadaChartBoss">
                            <Tooltip
                                title={`Total ${variant} divided by the number of bosses in the raid`}
                            >
                                <IconTotal className="skadaChartSpecIcon" />
                            </Tooltip>
                            {data.total[spec] ? (
                                <span
                                    className="skadaChartValues skadaChartTotal"
                                    style={{
                                        background: `linear-gradient(to right, #48698c ${data
                                            .total[spec][variant].topPercent ||
                                            0}%, #222 ${data.total[spec][
                                            variant
                                        ].topPercent || 0}%)`
                                    }}
                                >
                                    <span className="skadaChartRank">
                                        <span className="skadaChartBossName">
                                            Total
                                        </span>
                                    </span>
                                    <span className="skadaChartPerformanceValue">
                                        <React.Fragment>
                                            <span className="direct">
                                                {`${shortNumber(
                                                    data.total[spec][variant][
                                                        variant
                                                    ]
                                                )}`}
                                            </span>
                                            {` (${data.total[spec][
                                                variant
                                            ].topPercent.toFixed(1)}%)`}
                                        </React.Fragment>
                                    </span>
                                </span>
                            ) : (
                                <span
                                    className="skadaChartValues skadaChartTotal"
                                    style={{
                                        background: "#222"
                                    }}
                                >
                                    <span className="skadaChartRank">
                                        <span className="skadaChartBossName">
                                            Total
                                        </span>
                                    </span>
                                </span>
                            )}
                        </Typography>
                    </ListItem>

                    {raidBosses.map(boss => {
                        const currentBoss = data[boss.encounter_name][spec];
                        const playerData = currentBoss[variant];

                        return (
                            <ListItem
                                component="li"
                                key={boss.encounter_name}
                                className={classes.listItem}
                            >
                                <Typography className="skadaChartBoss">
                                    {playerData[variant] ? (
                                        <Tooltip
                                            title={specs[playerData.spec].label}
                                        >
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
                                            <IconMissing className="skadaChartSpecIcon SkadaChartIconMissing" />
                                        </Tooltip>
                                    )}

                                    <span
                                        className="skadaChartValues"
                                        style={{
                                            background: playerData[variant]
                                                ? `linear-gradient(to right, ${
                                                      defaultClassColors[
                                                          playerData.class
                                                      ]
                                                  } ${
                                                      playerData.topPercent
                                                  }%, rgba(0, 0, 0, 0) ${
                                                      playerData.topPercent
                                                  }%)`
                                                : "rgba(0, 0, 0, 0)"
                                        }}
                                    >
                                        <span className="skadaChartRank">
                                            {playerData.rank &&
                                                `${playerData.rank}.`}{" "}
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
                                                    {` (${playerData.topPercent.toFixed(
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        raids: state.raidInfo.raids
    };
}

export default connect(mapStateToProps)(
    withTheme()(withStyles(styles)(SkadaChartRaid))
);
