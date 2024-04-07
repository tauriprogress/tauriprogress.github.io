import React from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import WithRealm from "../WithRealm";
import LogLink from "../LogLink";
import Link from "../Link";

import { applyFilter } from "./helpers";

import {
    convertFightLength,
    dateToString,
    shortNumber,
    capitalize,
} from "../../helpers";

import { styled } from "@mui/material";
import CharacterName from "../CharacterName";

const Container = styled("div")(({ theme }) => ({
    width: "280px",
    margin: theme.spacing(2),
    padding: theme.spacing(1),
}));

const List = styled("ul")(({ theme }) => ({
    listStyle: "none",
    padding: 0,
    "& li": {
        marginBottom: "5px",
    },
}));

const ListText = styled("p")(({ theme, guild }) => ({
    margin: 0,
    color: guild
        ? theme.palette.factionColors[guild.f ? "horde" : "alliance"]
        : "inherit",
}));

const ListTextOverflow = styled(ListText)(({ theme }) => ({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const Uppercase = styled(Typography)(({ theme }) => ({
    textTransform: "uppercase",
}));

const GridItem = styled(Grid)(({ theme }) => ({
    maxWidth: "50% !important",
}));

function BossSummary({ bossInfo, data, filter, specs }) {
    const boss = applyFilter(data, filter, specs);

    return (
        <Container>
            <Typography variant="h5" align="center">
                {bossInfo.name}
            </Typography>
            <Divider />

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <FastestKills kills={boss && boss.fastestKills} />
                <FirstKills kills={boss && boss.firstKills} />
            </Grid>
            <Divider />

            <Grid container direction="row" justifyContent="center">
                {["dps", "hps"].map((combatMetric) =>
                    boss && boss[`best${capitalize(combatMetric)}`].length ? (
                        <GridItem key={combatMetric} item xs>
                            <Uppercase variant="subtitle2" align="center">
                                {combatMetric}
                            </Uppercase>
                            <List>
                                {boss[`best${capitalize(combatMetric)}`].map(
                                    (character) => (
                                        <li
                                            key={`${character._id} ${character.f}`}
                                        >
                                            <ListTextOverflow>
                                                <LogLink
                                                    logId={character.logId}
                                                    realm={character.realm}
                                                >
                                                    {shortNumber(
                                                        character[combatMetric]
                                                    )}
                                                </LogLink>{" "}
                                                <CharacterName
                                                    noRaceImage={true}
                                                    character={character}
                                                    realmName={character.realm}
                                                >
                                                    {character.name}
                                                </CharacterName>
                                            </ListTextOverflow>
                                        </li>
                                    )
                                )}
                            </List>
                        </GridItem>
                    ) : null
                )}
            </Grid>
            <Divider />
        </Container>
    );
}

const FastestKills = React.memo(({ kills }) => {
    return (
        <GridItem item xs>
            <Typography variant="subtitle2" align="center">
                Fastest kills
            </Typography>
            <List>
                {kills &&
                    kills.map((log) => (
                        <li key={log.id}>
                            <WithRealm realmName={log.realm}>
                                <ListText guild={log.guild}>
                                    {log.guild.name !== "Random" ? (
                                        <Link
                                            style={{
                                                color: "inherit",
                                            }}
                                            to={`/guild/${log.guild.name}?realm=${log.realm}`}
                                        >
                                            {log.guild.name}
                                        </Link>
                                    ) : (
                                        "Random"
                                    )}
                                </ListText>
                            </WithRealm>

                            <ListText>
                                <LogLink logId={log.id} realm={log.realm}>
                                    {convertFightLength(log.fightLength)}
                                </LogLink>
                            </ListText>
                        </li>
                    ))}
            </List>
        </GridItem>
    );
}, compareKills);

const FirstKills = React.memo(({ kills }) => {
    return (
        <GridItem item xs>
            <Typography variant="subtitle2" align="center">
                First kills
            </Typography>
            <List>
                {kills &&
                    kills.map((log) => (
                        <li key={log.id}>
                            <WithRealm realmName={log.realm}>
                                <ListText guild={log.guild}>
                                    {log.guild ? (
                                        <Link
                                            style={{
                                                color: "inherit",
                                            }}
                                            to={`/guild/${log.guild.name}?realm=${log.realm}`}
                                        >
                                            {log.guild.name}
                                        </Link>
                                    ) : (
                                        "Random"
                                    )}
                                </ListText>
                            </WithRealm>

                            <ListText>
                                <LogLink logId={log.id} realm={log.realm}>
                                    {dateToString(new Date(log.date * 1000))}
                                </LogLink>
                            </ListText>
                        </li>
                    ))}
            </List>
        </GridItem>
    );
}, compareKills);

function compareKills(prevProps, nextProps) {
    if (prevProps.kills === nextProps.kills) {
        return true;
    } else if (
        prevProps.kills &&
        nextProps.kills &&
        prevProps.kills.length === nextProps.kills.length
    ) {
        let counter = 0;
        for (let i = 0; i < prevProps.kills.length; i++) {
            if (
                prevProps.kills[i].id === nextProps.kills[i].id &&
                prevProps.kills[i].realm === nextProps.kills[i].realm
            ) {
                counter++;
            }
        }

        if (counter === prevProps.kills.length) {
            return true;
        }
    }

    return false;
}
export default BossSummary;
