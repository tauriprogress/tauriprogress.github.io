import {
    characterClasses,
    classToSpec,
    specs,
    specToClass
} from "tauriprogress-constants";
import React from "react";
import { withTheme } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import { describeArc } from "./helpers";
import { getSpecImg, shortNumber } from "../../helpers";

function RaidBossStats({ data, theme }) {
    if (!data) return <div />;

    let {
        palette: { defaultClassColors }
    } = theme;

    let charClasses = [];

    for (let charClass in characterClasses) {
        charClasses.push(charClass);
    }

    let svgData = {};
    for (let variant of ["dps", "hps"]) {
        let startAngle = 0;
        svgData[variant] = {};
        svgData[variant].arcs = charClasses.map(charClass => {
            let currentAngle =
                (360 * data[variant].classes[charClass].total) /
                data[variant].total;

            startAngle += currentAngle;

            let radius = 120;

            let arc = describeArc(
                135,
                135,
                radius,
                startAngle - currentAngle,
                startAngle
            );

            let tooltip = (
                <span>
                    <span>Total: {data[variant].classes[charClass].total}</span>
                    <br />
                    {classToSpec[charClass].map(specId => (
                        <React.Fragment key={specId}>
                            <span>
                                {specs[specId].label}:{" "}
                                {
                                    data[variant].classes[charClass].specs[
                                        specId
                                    ].total
                                }
                            </span>
                            <br />
                        </React.Fragment>
                    ))}
                </span>
            );

            return (
                <Tooltip title={tooltip} key={charClass}>
                    <path
                        fill={defaultClassColors[charClass]}
                        stroke="none"
                        d={`${arc} L 135 135`}
                    />
                </Tooltip>
            );
        });

        startAngle = 0;

        svgData[variant].texts = charClasses.reduce((acc, charClass) => {
            let currentAngle =
                (360 * data[variant].classes[charClass].total) /
                data[variant].total;

            if (!currentAngle) return acc;

            startAngle += currentAngle;

            let radius = 120;
            let textArc = describeArc(
                135,
                135,
                radius / 1.3,
                startAngle - currentAngle / 2,
                startAngle
            ).split(" ");
            let textX = textArc[textArc.length - 2] - 13;
            let textY = textArc[textArc.length - 1] + 5;

            return acc.concat(
                <text
                    style={{
                        transform: `translate(${textX}px, ${textY}px)`
                    }}
                    key={charClass}
                >
                    {Math.round((currentAngle / 360) * 1000) / 10}%
                </text>
            );
        }, []);
    }

    let damageSpecs = charClasses
        .reduce(
            (acc, charClass) =>
                acc.concat(
                    classToSpec[charClass]
                        .filter(spec => specs[spec].isDps)
                        .map(spec => ({
                            ...data.dps.classes[charClass].specs[spec],
                            specId: spec
                        }))
                ),
            []
        )
        .sort((a, b) => a.dps < b.dps);

    let healingSpecs = charClasses
        .reduce(
            (acc, charClass) =>
                acc.concat(
                    classToSpec[charClass]
                        .filter(spec => specs[spec].isHealer)
                        .map(spec => ({
                            ...data.hps.classes[charClass].specs[spec],
                            specId: spec
                        }))
                ),
            []
        )
        .sort((a, b) => a.hps < b.hps);

    let specData = {
        dps: {
            specs: damageSpecs,
            best: damageSpecs[0].dps
        },
        hps: {
            specs: healingSpecs,
            best: healingSpecs[0].hps
        }
    };

    return (
        <div className="displayRaidBossStats">
            {["dps", "hps"].map(variant => (
                <div className="displayRaidBossStatsContainer" key={variant}>
                    <div className="displayRaidBossStatsClassDistribution">
                        <Typography variant="h6">
                            {variant === "dps" ? "Damage" : "Healing"} class
                            distribution
                        </Typography>
                        <svg>
                            {svgData[variant].arcs}
                            {svgData[variant].texts}
                        </svg>
                    </div>
                    <div className="displayRaidBossStatsSpecData">
                        <Typography variant="h6">
                            Average {variant === "dps" ? "Damage" : "Healing"}
                        </Typography>
                        {specData[variant].specs.map(spec => (
                            <Typography
                                className="skadaChartBoss"
                                key={spec.specId}
                            >
                                <Tooltip title={specs[spec.specId].label}>
                                    <img
                                        src={getSpecImg(
                                            specs[spec.specId].image
                                        )}
                                        alt=""
                                        className="skadaChartSpecIcon"
                                    />
                                </Tooltip>
                                <Tooltip title={`${spec.total} characters`}>
                                    <span
                                        className="skadaChartValues"
                                        style={{
                                            background: `linear-gradient(to right, ${
                                                defaultClassColors[
                                                    specToClass[spec.specId]
                                                ]
                                            } ${Math.floor(
                                                (spec[variant] /
                                                    specData[variant].best) *
                                                    100
                                            )}%, rgba(0, 0, 0, 0) ${Math.floor(
                                                (spec[variant] /
                                                    specData[variant].best) *
                                                    100
                                            )}%)`
                                        }}
                                    >
                                        <span className="skadaChartPerformanceRank">
                                            {spec.avgIlvl}{" "}
                                            {specs[spec.specId].label}
                                        </span>
                                        <span className="skadaChartPerformanceValue">
                                            <React.Fragment>
                                                <span className="direct">
                                                    {`${shortNumber(
                                                        spec[variant]
                                                    )}`}
                                                </span>
                                                {` (${(
                                                    (spec[variant] /
                                                        specData[variant]
                                                            .best) *
                                                    100
                                                ).toFixed(1)}%)`}
                                            </React.Fragment>
                                        </span>
                                    </span>
                                </Tooltip>
                            </Typography>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default withTheme(RaidBossStats);
