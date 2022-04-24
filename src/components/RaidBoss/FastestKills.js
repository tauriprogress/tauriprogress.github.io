import React, { useEffect } from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";

import withTheme from '@mui/styles/withTheme';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

import LogLink from "../LogLink";
import OverflowScroll from "../OverflowScroll";
import WithRealm from "../WithRealm";
import InfoIcon from "../InfoIcon";
import Link from "../Link";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import DisplayDate from "../DisplayDate";

import { convertFightLength, dateTextHours, days } from "../../helpers";

import {
    raidBossFastestKillsFetch,
    raidBossKillCountFetch
} from "../../redux/actions";

import {
    environmentIsSeasonalSelector,
    raidBossFastestKillsEntireSelector
} from "../../redux/selectors";

function FastestKills({ theme, raidId, bossName, difficulty }) {
    const {
        palette: {
            factionColors: { alliance, horde }
        }
    } = theme;

    const dispatch = useDispatch();

    const { loading, error, data, isSeasonal } = useSelector(state => {
        return {
            ...raidBossFastestKillsEntireSelector(state),
            isSeasonal: environmentIsSeasonalSelector(state)
        };
    }, shallowEqual);

    useEffect(() => {
        dispatch(raidBossFastestKillsFetch({ raidId, bossName, difficulty }));
    }, [raidId, bossName, difficulty, isSeasonal, dispatch]);

    return (
        <OverflowScroll>
            {loading && <Loading />}
            {error && (
                <ErrorMessage
                    message={error}
                    refresh={() =>
                        dispatch(
                            raidBossFastestKillsFetch({
                                raidId,
                                bossName,
                                difficulty
                            })
                        ) &&
                        dispatch(
                            raidBossKillCountFetch({
                                raidId,
                                bossName,
                                difficulty: difficulty
                            })
                        )
                    }
                />
            )}
            {!loading && !error && data && (
                <Table>
                    <TableHead className="tableHead">
                        <TableRow>
                            <TableCell>Guild</TableCell>
                            <TableCell>Fight length</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((log, index) => {
                                const date = new Date(log.date * 1000);
                                return (
                                    <TableRow
                                        key={`${log.id} ${log.realm}`}
                                        hover
                                    >
                                        <TableCell>
                                            <Grid
                                                container
                                                wrap="nowrap"
                                                alignItems="center"
                                            >
                                                <Grid
                                                    item
                                                    style={{
                                                        marginRight: "8px"
                                                    }}
                                                >
                                                    <Typography
                                                        style={{
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        {index + 1}.
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    {log.guild ? (
                                                        <WithRealm
                                                            realmName={
                                                                log.realm
                                                            }
                                                        >
                                                            <Typography>
                                                                <Link
                                                                    style={{
                                                                        color: log
                                                                            .guild
                                                                            .f
                                                                            ? horde
                                                                            : alliance
                                                                    }}
                                                                    to={`/guild/${log.guild.name}?realm=${log.realm}`}
                                                                >
                                                                    {
                                                                        log
                                                                            .guild
                                                                            .name
                                                                    }
                                                                </Link>
                                                            </Typography>
                                                        </WithRealm>
                                                    ) : (
                                                        <WithRealm
                                                            realmName={
                                                                log.realm
                                                            }
                                                        >
                                                            <Typography>
                                                                Random
                                                            </Typography>
                                                        </WithRealm>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </TableCell>

                                        <TableCell
                                            style={{ fontWeight: "bold" }}
                                        >
                                            <LogLink
                                                logId={log.id}
                                                realm={log.realm}
                                            >
                                                <InfoIcon />
                                                {convertFightLength(
                                                    log.fightLength
                                                )}
                                            </LogLink>
                                        </TableCell>

                                        <TableCell>
                                            <Tooltip
                                                title={days[date.getDay()]}
                                            >
                                                <span>
                                                    <DisplayDate
                                                        date={date}
                                                        align="right"
                                                    />
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            {dateTextHours(date)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            )}
        </OverflowScroll>
    );
}

export default withTheme(FastestKills);
