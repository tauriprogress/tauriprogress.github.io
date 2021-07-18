import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { withTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

import LogLink from "../LogLink";
import WithRealm from "../WithRealm";
import InfoIcon from "../InfoIcon";
import Link from "../Link";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

import { convertFightLength, dateTextHours, days } from "../../helpers";
import DisplayDate from "../DisplayDate";

import { fetchRaidBossRecentKills } from "../../redux/actions";

function RecentKills({ theme, raidId, bossName, difficulty }) {
    const {
        palette: {
            factionColors: { alliance, horde }
        }
    } = theme;
    const dispatch = useDispatch();
    const { loading, error, data } = useSelector(
        state => state.raidBoss.recentKills
    );

    useEffect(() => {
        dispatch(fetchRaidBossRecentKills({ raidId, bossName, difficulty }));
    }, [raidId, bossName, difficulty, dispatch]);

    return (
        <div className="overflowScroll">
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
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
                                    <TableRow key={`${log.id} ${log.realm}`}>
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
        </div>
    );
}

export default withTheme(RecentKills);
