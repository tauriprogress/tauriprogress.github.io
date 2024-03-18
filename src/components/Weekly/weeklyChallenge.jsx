import React, { useState } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    environmentCharacterSpecsSelector,
    environmentDifficultiesSelector,
    environmentDifficultyNamesSelector,
    weeklyChallengeEntireSelector,
} from "../../redux/selectors";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { weeklyChallengeFetch } from "../../redux/actions";
import { useEffect } from "react";
import {
    Avatar,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import WeeklyDataContainer from "./DataContainer";
import styled from "@emotion/styled";
import {
    convertFightLength,
    getFactionImg,
    getSpecImg,
    shortNumber,
} from "../../helpers";
import Link from "../Link";
import { useTheme } from "@emotion/react";
import BoldLogLink from "../LogLink";
import { filterWeeklyCharacters } from "./helper";
import { PerfChartRow } from "../PerfChart";
import WeeklyCharacterFilter from "./weeklyCharacterFilter";
import WeeklyChallengeExplanation from "./WeeklyChallengeExplanation";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const SecondaryText = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    paddingTop: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

const Subtitle = styled(Link)(({ theme }) => ({
    fontSize: `${12 / 16}rem`,
    padding: 0,
    marginBottom: theme.spacing(3),
    color: theme.palette.text.secondary,
    textAlign: "center",
    width: "100%",
    display: "inline-block",
    "&:hover": {
        cursor: "pointer",
        color: theme.palette.secondary.main,
    },
}));

const NoborderTableCell = styled(TableCell)({
    borderBottom: "none",
});

const CharactersContainer = styled(Container)({
    marginTop: "20px",
});

function getChallengeName(challenge, difficulties) {
    return (
        (challenge &&
            challenge[difficulties[0]] &&
            challenge[difficulties[0]].bossName) ||
        undefined
    );
}

function WeeklyChallenge() {
    const { loading, challenge, error, difficulties } = useSelector(
        (state) => ({
            ...weeklyChallengeEntireSelector(state),
            difficulties: environmentDifficultiesSelector(state),
        }),
        shallowEqual
    );

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(weeklyChallengeFetch());
    }, [location, dispatch]);

    const challengeName = getChallengeName(challenge, difficulties);

    function isChallengeCompleted(challenge) {
        return (
            !!challenge &&
            !!Object.keys(challenge).length &&
            Object.values(challenge).reduce((acc, curr) => {
                if (!!curr.killCount) {
                    return true;
                }
                return acc;
            }, false)
        );
    }

    return (
        <React.Fragment>
            <Typography variant="h4" align="center">
                Weekly Challenge: {challengeName || "Loading..."}
            </Typography>

            <Subtitle align="center" to="/weeklychallengevote">
                (vote for next week...)
            </Subtitle>

            {loading && <Loading />}
            {isChallengeCompleted(challenge) ? (
                <DisplayRaidBosses
                    challenge={challenge}
                    difficulties={difficulties}
                />
            ) : (
                challengeName && (
                    <WeeklyChallengeExplanation challengeName={challengeName} />
                )
            )}
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() => dispatch(weeklyChallengeFetch())}
                />
            )}
        </React.Fragment>
    );
}

function DisplayRaidBosses({ challenge, difficulties }) {
    const difficultyNames = useSelector(environmentDifficultyNamesSelector);
    const xs = Math.floor(12 / difficulties.length);
    return (
        <Grid container>
            {difficulties.map((diff) => {
                return (
                    <RaidBoss
                        key={diff}
                        data={challenge[diff]}
                        difficultyName={difficultyNames[diff]}
                        xs={xs}
                    />
                );
            })}
        </Grid>
    );
}

function RaidBoss({ data, difficultyName, xs }) {
    return (
        <WeeklyDataContainer xs={xs} difficultyName={difficultyName}>
            {data && !!data.killCount ? (
                <>
                    <FastestKills kills={data.fastestKills} />
                    <WeeklyCharacters data={data} />
                </>
            ) : (
                <SecondaryText>No data yet</SecondaryText>
            )}
        </WeeklyDataContainer>
    );
}

function FastestKills({ kills }) {
    const {
        palette: { factionColors },
    } = useTheme();
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell align="right" padding="checkbox">
                        Rank
                    </TableCell>
                    <TableCell>Guild</TableCell>
                    <TableCell>Time</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {kills.map((kill, index) => (
                    <TableRow key={index}>
                        <NoborderTableCell align="right" padding="checkbox">
                            <Typography>{index + 1}.</Typography>
                        </NoborderTableCell>
                        <NoborderTableCell>
                            <Typography
                                style={{
                                    color: kill.guild.f
                                        ? factionColors.horde
                                        : factionColors.alliance,
                                }}
                            >
                                {kill.guild.name === "Random" ? (
                                    <React.Fragment>
                                        <Avatar
                                            src={getFactionImg(kill.guild.f)}
                                            component="span"
                                        />

                                        {kill.guild.name}
                                    </React.Fragment>
                                ) : (
                                    <Link
                                        to={`/guild/${kill.guild.name}?realm=${kill.realm}`}
                                    >
                                        <Avatar
                                            src={getFactionImg(kill.guild.f)}
                                            component="span"
                                        />

                                        {kill.guild.name}
                                    </Link>
                                )}
                            </Typography>
                        </NoborderTableCell>
                        <NoborderTableCell>
                            <BoldLogLink logId={kill.id} realm={kill.realm}>
                                {convertFightLength(kill.fightLength)}
                            </BoldLogLink>
                        </NoborderTableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function WeeklyCharacters({ data }) {
    const theme = useTheme();

    const [combatMetric, setCombatMetric] = useState("dps");
    const [selectedClass, setSelectedClass] = useState("");
    const { classColors } = theme.palette;
    const specs = useSelector(environmentCharacterSpecsSelector);
    const chars = filterWeeklyCharacters(
        data[combatMetric],
        combatMetric,
        selectedClass
    );

    const best = chars.length ? chars[0][combatMetric] : 0;

    return (
        <CharactersContainer>
            <WeeklyCharacterFilter
                selectedCombatMetric={combatMetric}
                setCombatMetric={setCombatMetric}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
            />

            {chars.map((char, index) => (
                <PerfChartRow
                    key={index}
                    Icon={
                        <img src={getSpecImg(specs[char.spec].image)} alt="" />
                    }
                    rank={index + 1}
                    iconTitle={specs[char.spec].label}
                    title={char.name}
                    perfValue={shortNumber(char[combatMetric])}
                    perfPercent={(char[combatMetric] / best) * 100}
                    color={classColors[char.class].background}
                />
            ))}
        </CharactersContainer>
    );
}

export default React.memo(WeeklyChallenge);
