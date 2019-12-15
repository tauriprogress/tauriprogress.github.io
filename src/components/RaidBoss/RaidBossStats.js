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
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { PerfChartContainer, PerfChartTitle, PerfChartRow } from "../PerfChart";

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
        <Container>
            {["dps", "hps"].map(variant => (
                <Grid
                    container
                    key={variant}
                    style={{ marginBottom: theme.spacing(2) }}
                >
                    <Grid
                        item
                        style={{
                            flex: 1,
                            minWidth: "260px"
                        }}
                    >
                        <PerfChartContainer>
                            <PerfChartTitle>
                                <Typography variant="h6">
                                    Average{" "}
                                    {variant === "dps" ? "Damage" : "Healing"}
                                </Typography>
                            </PerfChartTitle>

                            {/* This is the total <PerfChartRow
                                iconImage={}
                                iconTitle={}
                                rank={}
                                title={}
                                perfValue={}
                                perfPercent={}
                            />*/}

                            {specData[variant].specs.map(spec => (
                                <PerfChartRow
                                    key={specs[spec.specId].label}
                                    Icon={
                                        <img
                                            src={getSpecImg(
                                                specs[spec.specId].image
                                            )}
                                            alt=""
                                        />
                                    }
                                    iconTitle={specs[spec.specId].label}
                                    rank={spec.avgIlvl}
                                    title={specs[spec.specId].label}
                                    perfValue={shortNumber(spec[variant])}
                                    perfPercent={
                                        (spec[variant] /
                                            specData[variant].best) *
                                        100
                                    }
                                    color={
                                        defaultClassColors[
                                            specToClass[spec.specId]
                                        ]
                                    }
                                />
                            ))}
                        </PerfChartContainer>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" align="center">
                            {variant === "dps" ? "Damage" : "Healing"} class
                            distribution
                        </Typography>
                        <svg width="270px" height="270px">
                            {svgData[variant].arcs}
                            {svgData[variant].texts}
                        </svg>
                    </Grid>
                </Grid>
            ))}
        </Container>
    );
}

export default withTheme(RaidBossStats);
