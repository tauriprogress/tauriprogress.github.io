import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withTheme, withStyles } from "@material-ui/core/styles";

import { guildLeaderboardFetch } from "../../redux/actions";
import { Link as RouterLink } from "react-router-dom";

import Page from "../Page";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import GuildLeaderboardFilter from "./GuildLeaderboardFilter";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import WithRealm from "../WithRealm";

import { filterGuilds } from "./helpers";
import { convertFightLength } from "./../../helpers";

function styles(theme) {
    return {
        cell: {
            padding: theme.spacing(1)
        },
        rank: {
            minWidth: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            padding: `0 ${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
            "& p": {
                fontSize: `${18 / 16}rem`
            }
        },
        name: {
            fontSize: `${18 / 16}rem`,
            lineHeight: `${20 / 16}rem`
        },
        tableHead: {
            paddingLeft: theme.spacing(10)
        }
    };
}
function GuildLeaderboard({ theme, classes }) {
    const { factionColors } = theme.palette;

    const { data, loading, error, realmGroup, filter } = useSelector(state => ({
        ...state.guildLeaderboard,
        realmGroup: state.environment.realmGroup
    }));
    const dispatch = useDispatch();

    const [tab, setTab] = useState("fullClear");

    useEffect(() => {
        dispatch(guildLeaderboardFetch(realmGroup));
    }, [realmGroup]);

    return (
        <Page title={"Guild Leaderboard | Tauri Progress"}>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && data && (
                <section>
                    <GuildLeaderboardFilter />
                    <Tabs value={tab} onChange={(e, value) => setTab(value)}>
                        <Tab label="FULL CLEAR" value={"fullClear"} />
                        <Tab label="BEST KILLS" value={"fastestKills"} />
                    </Tabs>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHead}>
                                    Guild
                                </TableCell>
                                <TableCell>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterGuilds(filter, tab, data).map(
                                (guild, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Grid container wrap="nowrap">
                                                <Grid
                                                    item
                                                    className={`${classes.rank} rank`}
                                                >
                                                    <Typography color="inherit">
                                                        {index + 1}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <WithRealm
                                                        realmName={guild.realm}
                                                    >
                                                        <Typography
                                                            className={
                                                                classes.name
                                                            }
                                                        >
                                                            <Link
                                                                component={
                                                                    RouterLink
                                                                }
                                                                style={{
                                                                    color: guild.f
                                                                        ? factionColors.horde
                                                                        : factionColors.alliance
                                                                }}
                                                                to={`/guild/${guild.name}?realm=${guild.realm}`}
                                                            >
                                                                {guild.name}
                                                            </Link>
                                                        </Typography>
                                                    </WithRealm>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell>
                                            {convertFightLength(
                                                guild.ranking[filter.raid][
                                                    filter.difficulty
                                                ][tab].time
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </section>
            )}
        </Page>
    );
}

export default withStyles(styles)(withTheme(GuildLeaderboard));
